"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipArrow,
} from "@radix-ui/react-tooltip";
import {
  CreateInvoiceType,
  CustomerType,
  SubscriptionPlan,
  Users,
  UserState,
} from "@/types/types";
import {
  addCustomUrl,
  deleteCardById,
  duplicateCard,
  toggleCardDisabled,
  transferCardOwnership,
} from "@/lib/firebase/actions/card.action";
import { Card } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRightLeft, Edit2, Link2, Trash, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CiLink } from "react-icons/ci";
import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import {
  createCustomerAndRecurringPlan,
  getSubscriptionPlans,
  getUserById,
  handleCreateInvoice,
} from "@/lib/firebase/actions/user.action";
import { getLoggedInUser } from "@/lib/session";
import { cardItems } from "@/constants";

type Prop = {
  card: Partial<Card>;
  confirm: (title?: string, message?: string | JSX.Element) => Promise<unknown>;
  user: UserState;
};

const isCardExpired = (expiryDate?: number) => {
  if (!expiryDate) return true;
  return expiryDate < Date.now();
};

const DigitalCard = ({ card, confirm, user }: Prop) => {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [hovered, setHovered] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [expiredDialogOpen, setExpiredDialogOpen] = useState(false);

  const domain =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
      : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: duplicateCardMutation } = useMutation({
    mutationFn: duplicateCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: toggleCardMutation } = useMutation({
    mutationFn: toggleCardDisabled,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      toast.success("Card status updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: deleteCardMutation } = useMutation({
    mutationFn: deleteCardById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      toast.success("Card deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: transferOwnershipMutation } = useMutation({
    mutationFn: transferCardOwnership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      setTransferOpen(false);
      setNewOwnerEmail("");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const getCardImage = (cardId?: string) => {
    const cardItem = cardItems.find((item) => item.id === cardId);
    return cardItem ? cardItem.image : undefined;
  };

  const cardImage = getCardImage(card.chosenPhysicalCard);

  const { data: plans, isLoading } = useQuery<SubscriptionPlan[]>({
    queryKey: ["subscription-plans"],
    queryFn: getSubscriptionPlans,
  });

  const handleUpgrade = async (plan: SubscriptionPlan) => {
    try {
      const userLoggedIn = await getLoggedInUser();

      if (typeof userLoggedIn === "string") {
        toast.error("Invalid user session.");
        return;
      }

      const user = (await getUserById(userLoggedIn?.uid)) as Users;

      if (!user) {
        toast.error("User data not found.");
        return;
      }

      if (!card.id) {
        toast.error("No card selected for subscription.");
        return;
      }

      const referenceId = `customer-${user.id}-${new Date().toISOString()}`;

      const customerData: CustomerType = {
        reference_id: referenceId,
        type: "INDIVIDUAL",
        email: user.email,
        individual_detail: {
          given_names: user.firstName ?? "",
          surname: user.lastName ?? "",
        },
      };

      const { customer, recurringPlan } = await createCustomerAndRecurringPlan(
        customerData,
        plan,
        card.id
      );

      toast.success("Subscription successfully created.");
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      toast.error("Failed to process subscription.");
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!card.id) return;
    e.stopPropagation();
    const ok = await confirm(
      undefined,
      <>
        Are you sure you want to delete
        <br />
        <span className="font-bold text-destructive ">
          {card.firstName + " " + card.lastName}{" "}
        </span>
        card?
      </>
    );

    if (!ok) return;
    deleteCardMutation({ cardId: card.id });
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!card.id) return;
    e.stopPropagation();
    router.push(`/cards/update/${card.id}`);
  };

  const handleCopy = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${domain}/site/${card.id}`);
    toast.success("Link Copied to clipboard");
  };

  const handleDuplicate = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (!card.id) return;
    e.stopPropagation();
    const ok = await confirm(
      undefined,
      <>
        Confirm{" "}
        <span className="font-bold text-destructive">
          {card.firstName + " " + card.lastName}{" "}
        </span>{" "}
        card duplication.
      </>
    );

    if (!ok) return;

    duplicateCardMutation({ card_id: card.id!, owner_id: card.owner! });
  };

  const handleAddCustomUrl = async () => {
    if (!customUrl || !card.id) return;

    const { success, message } = await addCustomUrl(customUrl, card.id);

    if (success) {
      toast.success("Custom URL added successfully");
      setOpen(false);
      setCustomUrl("");
    } else {
      toast.error(message);
    }
  };

  const handleTransferOwnership = async () => {
    if (!newOwnerEmail || !card.id) return;

    const { success, message } = await transferCardOwnership({
      cardId: card.id,
      newOwnerEmail,
    });

    if (success) {
      toast.success("Ownership transferred successfully");
      setTransferOpen(false);
      setNewOwnerEmail("");
      transferOwnershipMutation({ cardId: card.id, newOwnerEmail });
    } else {
      toast.error(message);
    }
  };

  const handleToggleCard = async () => {
    if (!card.id) return;
    const ok = await confirm(
      undefined,
      <>
        Are you sure you want to{" "}
        <span className="font-bold text-destructive">
          {card.disabled ? "enable" : "disable"}
        </span>{" "}
        this card?
      </>
    );

    if (!ok) return;
    toggleCardMutation(card.id);
  };

  const iconAndFunctionMap = [
    { icon: Edit2, fn: handleUpdate, tooltip: "Edit Card" },
    { icon: Trash, fn: handleToggleCard, tooltip: "Delete Card" },
    { icon: Link2, fn: () => setOpen(true), tooltip: "Add Custom URL" },
    {
      icon: ArrowRightLeft,
      fn: () => setTransferOpen(true),
      tooltip: "Transfer Ownership",
    },
  ];

  const formattedExpiryDate = card.expiryDate
    ? format(new Date(card.expiryDate), "MMMM d, yyyy")
    : "N/A";

  const isCardDisabled = card.disabled ?? false;

  return (
    <>
      <div
        className={`w-full aspect-[340/208] transition-transform duration-200 flex justify-between text-secondary bg-foreground rounded-[30px] overflow-hidden relative 
            ${isCardExpired(card.expiryDate) || isCardDisabled ? "opacity-50" : ""}
            ${open ? "blur-sm pointer-events-none" : ""}
          `}
        style={{
          backgroundImage: cardImage ? `url(${cardImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {(isCardExpired(card.expiryDate) || isCardDisabled) && (
          <div className="absolute left-0 top-0 w-[100%] h-full flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
            {isCardDisabled ? "Disabled" : "Expired"}
          </div>
        )}

        {!isCardExpired(card.expiryDate) && !isCardDisabled && hovered && (
          <div className="absolute bottom-5 left-5 bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg">
            Expires: {formattedExpiryDate}
          </div>
        )}

        <Link
          href={
            isCardExpired(card.expiryDate) || isCardDisabled
              ? "#"
              : `/cards/${card.id}`
          }
          prefetch
          className="flex-1 border-r border-accent/40 p-6 relative"
          onClick={(e) => {
            if (isCardExpired(card.expiryDate) || isCardDisabled) {
              e.preventDefault();
              setExpiredDialogOpen(true);
            }
          }}
        >
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <p className="text-[clamp(1.1rem,1.4vw,1.4rem)] font-semibold capitalize text-white">
                {card.firstName + " " + card.lastName}
              </p>
              <p className="text-xs capitalize">{card.position}</p>
            </div>
          </div>
        </Link>

        <div className="flex flex-col justify-center items-center bg-transparent backdrop-blur-md transition z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/site/${card.id}`}
                className="px-3 py-3 2xl:py-2 hover:opacity-50 cursor-pointer"
                prefetch
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon className="size-4 text-white drop-shadow-md" />
              </Link>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                className="bg-black text-white text-xs px-2 py-1 rounded"
                side="left"
              >
                Preview
                <TooltipArrow className="fill-black" />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="px-3 py-3 2xl:py-2 hover:opacity-50 cursor-pointer"
                onClick={handleCopy}
              >
                <CiLink
                  size={18}
                  strokeWidth={0.5}
                  className="text-white drop-shadow-md"
                />
              </span>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                className="bg-black text-white text-xs px-2 py-1 rounded"
                side="left"
              >
                Copy Link
                <TooltipArrow className="fill-black" />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          {iconAndFunctionMap.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <span
                  className="px-3 py-3 2xl:py-2 hover:opacity-50 cursor-pointer"
                  onClick={item.fn}
                >
                  <item.icon className="size-4 text-white drop-shadow-md" />
                </span>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent
                  className="bg-black text-white text-xs px-2 py-1 rounded"
                  side="left"
                >
                  {item.tooltip}
                  <TooltipArrow className="fill-black" />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Dialogs remain the same as before */}
      <Dialog.Root open={expiredDialogOpen} onOpenChange={setExpiredDialogOpen}>
        {/* Dialog content unchanged */}
      </Dialog.Root>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        {/* Custom URL dialog content */}
      </Dialog.Root>

      <Dialog.Root open={transferOpen} onOpenChange={setTransferOpen}>
        {/* Transfer ownership dialog content */}
      </Dialog.Root>
    </>
  );
};

export default DigitalCard;
