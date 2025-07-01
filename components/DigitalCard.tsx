"use client";

import { carouselCards } from "@/constants";
import {
  addCustomUrl,
  deleteCardById,
  duplicateCard,
  toggleCardDisabled,
  transferCardOwnership,
} from "@/lib/firebase/actions/card.action";
import {
  createCustomerAndRecurringPlan,
  getSubscriptionPlans,
  getUserById,
} from "@/lib/firebase/actions/user.action";
import { getLoggedInUser } from "@/lib/session";
import {
  Card,
  CustomerType,
  SubscriptionPlan,
  Users,
  UserState,
} from "@/types/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowRightLeft,
  CheckCircle2,
  Edit2,
  EyeIcon,
  GripVertical,
  Loader2Icon,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import QRCodeModalV2 from "./qrcode/QRCodeModalV2";
import { Button } from "./ui/button";

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
  const [showHint, setShowHint] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [expiredDialogOpen, setExpiredDialogOpen] = useState(false);
  const [confirmTransferCardDialog, setConfirmTransferCardDialog] =
    useState(false);

  const [openQRCode, setOpenQRCode] = useState(false);

  const domain =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
      : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id as UniqueIdentifier });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const { mutate: toggleCardMutation, isPending: isPendingToggleCard } =
    useMutation({
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
    const cardItem =
      Object.values(carouselCards).find((item) => item.id === cardId) ??
      carouselCards[cardId as keyof typeof carouselCards];

    return cardItem ? cardItem.image : undefined;
  };

  const cardImage = getCardImage(card.chosenPhysicalCard?.id);

  const { data: plans, isLoading: isLoadingPlans } = useQuery<
    SubscriptionPlan[]
  >({
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
    setConfirmTransferCardDialog(false);
  };

  const handleToggleCard = async () => {
    if (!card.id) return;
    const ok = await confirm(
      undefined,
      <>
        {!card.disabled && (
          <p className="mb-4 text-sm text-muted-foreground">
            Disabling this card will make it inaccessible to others and remove
            it from public view.
          </p>
        )}
        <p>
          Are you sure you want to{" "}
          <span className="font-bold ">
            {card.disabled ? "enable" : "disable"}
          </span>{" "}
          this card?
        </p>
      </>
    );

    if (!ok) return;
    toggleCardMutation(card.id);
  };

  const formattedExpiryDate = card.expiryDate
    ? format(new Date(card.expiryDate), "MMMM d, yyyy")
    : "N/A";

  const isCardDisabled = card.disabled ?? false;

  const iconAndFunctionMap = [
    { icon: Edit2, fn: handleUpdate, tooltip: "Edit Card" },
    {
      icon: isCardDisabled ? CheckCircle2 : IoCloseCircleOutline,
      fn: handleToggleCard,
      tooltip: isCardDisabled ? "Enable Card" : "Disable Card",
    },
    {
      icon: ArrowRightLeft,
      fn: () => setTransferOpen(true),
      tooltip: "Transfer Ownership",
    },
    {
      icon: QrCode,
      fn: () => setOpenQRCode(true),
      tooltip: "Share Card",
    },
  ];

  const isLoading = isPendingToggleCard || isLoadingPlans;

  return (
    <div
      data-id={card.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full relative"
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col justify-center  items-center space-y-1 ">
          <Tooltip>
            <TooltipTrigger asChild>
              {card.portfolioStatus && !isCardDisabled ? (
                <Link
                  href={`/site/${card.customUrl ? card.customUrl : card.id}`}
                  className="px-2 py-2 2xl:py-2 hover:opacity-50 cursor-pointer border dark:border-accent border-gray-300 rounded-md"
                  prefetch
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EyeIcon className="size-4 dark:text-white drop-shadow-md" />
                </Link>
              ) : (
                <span className="p-3 2xl:py-2 opacity-30 cursor-not-allowed">
                  <EyeIcon className="size-4 dark:text-white drop-shadow-md" />
                </span>
              )}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                className="bg-black text-white text-xs px-2 py-1 rounded z-50"
                side="left"
              >
                {!card.portfolioStatus && !isCardDisabled
                  ? "Setup this card first"
                  : isCardDisabled
                    ? "Enable this card first"
                    : "Preview"}
                <TooltipArrow className="fill-black" />
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          {/* <Tooltip>
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
          </Tooltip> */}

          {iconAndFunctionMap.map((item, index) => {
            const isToggleButton = item.fn === handleToggleCard;

            const isDisabledState =
              (isCardDisabled && !isToggleButton) ||
              (item.tooltip === "Share Card" && !card.portfolioStatus);

            const tooltipText =
              item.tooltip === "Share Card" && !card.portfolioStatus
                ? "Setup this card first"
                : isCardDisabled && !isToggleButton
                  ? "Enable this card first"
                  : item.tooltip;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span
                    className={`px-2 py-2 2xl:py-2 border dark:border-accent border-gray-300 rounded-md ${isDisabledState
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:opacity-50 cursor-pointer"
                      }`}
                    onClick={!isDisabledState ? item.fn : undefined}
                  >
                    <item.icon className="size-4 dark:text-white drop-shadow-md" />
                  </span>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent
                    className="bg-black text-white text-xs px-2 py-1 rounded z-50"
                    side="left"
                  >
                    {tooltipText}
                    <TooltipArrow className="fill-black" />
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            );
          })}
        </div>

        <div
          className={`flex-1 w-full aspect-[340/208] transition-transform duration-200 flex justify-between text-secondary bg-transparent rounded-xl overflow-hidden relative [background-size:contain] md:[background_size:cover]
            ${isCardExpired(card.expiryDate) || isCardDisabled || isLoading ? "opacity-50" : ""}
            ${open ? "blur-sm pointer-events-none" : ""}
          `}
          style={{
            backgroundImage: cardImage ? `url(${cardImage})` : "none",
            // backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="absolute w-full top-1/2 right-0 -translate-y-1/2 flex items-center justify-end z-30">
            <div className="relative flex items-center justify-end group">
              {/* Tooltip - centered above the grip */}
              <div className="absolute w-max -left-40 mb-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100 peer-hover:opacity-100">
                <span className="text-white bg-black/60 px-2 py-1 rounded">
                  Hold to drag
                </span>
              </div>

              {/* Grip */}
              <GripVertical
                {...listeners}
                className="z-30 mr-1.5 md:mr-3.5 peer size-6 sm:size-12 lg:size-8 cursor-grab text-white opacity-80 hover:opacity-100 transition-opacity duration-150 bg-black/20 rounded-md p-1"
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>

          {isLoading && (
            <div className="absolute left-0 top-0 w-[100%] h-full flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
              <Loader2Icon className="shrink-0 animate-spin size-8" />
            </div>
          )}

          {(isCardExpired(card.expiryDate) || isCardDisabled) && !isLoading && (
            <div className="absolute left-0 top-0 w-[100%] h-full flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
              {isCardDisabled ? "Disabled" : "Expired"}
            </div>
          )}

          {!isCardExpired(card.expiryDate) && hovered && !isLoading && (
            <div className="absolute bottom-5 right-5 bg-black text-white text-xs px-2 py-1 rounded-lg shadow-lg">
              Expires: {formattedExpiryDate}
            </div>
          )}

          <Link
            href={isCardExpired(card.expiryDate) ? "#" : `/cards/${card.id}`}
            prefetch
            className="flex-1 border-r border-accent/40 py-3 px-4 relative"
            onClick={(e) => {
              e.preventDefault();
              if (isCardExpired(card.expiryDate)) {
                setExpiredDialogOpen(true);
              }
            }}
          >
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-[clamp(1rem,1.4vw,1.1rem)] mt-3 sm:mt-0 font-semibold capitalize text-white">
                  {(card.firstName || "") + " " + (card.lastName || "")}
                </p>
                <p className="text-xs capitalize text-white">
                  {card.position || ""}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* <Dialog.Root open={expiredDialogOpen} onOpenChange={setExpiredDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold text-red-600">
                {isCardDisabled ? "Card Disabled" : "Card Expired"}
              </Dialog.Title>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {isCardDisabled
                  ? "This card has been disabled and can no longer be accessed."
                  : "This card has expired and can no longer be accessed."}
              </p>

              {!isCardDisabled && (
                <>
                  <h3 className="text-md font-semibold mt-4">
                    Upgrade to a plan:
                  </h3>
                  {isLoading ? (
                    <p>Loading plans...</p>
                  ) : (
                    <ul className="mt-2 space-y-3">
                      {plans?.map((plan) => (
                        <li
                          key={plan.id}
                          className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          onClick={() => handleUpgrade(plan)}
                        >
                          <p className="font-semibold text-lg">{plan.name}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Php {plan.price} / {plan.durationDays} days
                          </p>
                          <ul className="text-xs list-disc ml-5 mt-2 text-gray-600 dark:text-gray-400">
                            {plan.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold">
                Enter Custom URL
              </Dialog.Title>
              <input
                type="text"
                className="w-full p-2 border rounded mt-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleAddCustomUrl}
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={transferOpen} onOpenChange={setTransferOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold">
                Transfer Card Ownership
              </Dialog.Title>

              <input
                type="email"
                className="w-full p-2 border rounded mt-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={newOwnerEmail}
                onChange={(e) => setNewOwnerEmail(e.target.value)}
                placeholder="Enter new owner's email"
              />

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                or transfer ownership using transfer code
              </p>

              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded border dark:border-gray-700">
                <span className="text-sm truncate">{card.transferCode}</span>
                <button
                  className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded"
                  onClick={() => {
                    if (card.transferCode) {
                      navigator.clipboard.writeText(card.transferCode);
                      toast.success("Transfer code copied!");
                    } else {
                      toast.error("No transfer code available");
                    }
                  }}
                >
                  Copy
                </button>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close asChild>
                  <Button variant={"secondary"} size={"sm"}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  className="bg-buttonColor hover:bg-hoverColor"
                  variant={"ghost"}
                  size={"sm"}
                  disabled={!newOwnerEmail}
                  onClick={() => {
                    setConfirmTransferCardDialog(true);
                    setTransferOpen(false);
                  }}
                >
                  Transfer
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root
        open={confirmTransferCardDialog}
        onOpenChange={setConfirmTransferCardDialog}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-2xl font-bold ">
                Confirm Card Transfer
              </Dialog.Title>

              <p className="text-md text-gray-800 dark:text-gray-400 mt-2">
                You are about to transfer this card to{" "}
                <span className="text-xl dark:text-white text-black">
                  {newOwnerEmail}
                </span>
                .<br />
                Please confirm to proceed with the transfer.
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close asChild>
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                </Dialog.Close>
                <button
                  onClick={handleTransferOwnership}
                  className="ml-2 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root open={expiredDialogOpen} onOpenChange={setExpiredDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <Dialog.Title className="text-lg font-bold text-red-600">
                Card Expired
              </Dialog.Title>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                This card has expired and can no longer be accessed.
              </p>

              <h3 className="text-md font-semibold mt-4">Upgrade to a plan:</h3>
              {isLoading ? (
                <p>Loading plans...</p>
              ) : (
                <ul className="mt-2 space-y-3">
                  {plans?.map((plan) => (
                    <li
                      key={plan.id}
                      className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      onClick={() => handleUpgrade(plan)}
                    >
                      <p className="font-semibold text-lg">{plan.name}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Php {plan.price} / {plan.durationDays} days
                      </p>
                      <ul className="text-xs list-disc ml-5 mt-2 text-gray-600 dark:text-gray-400">
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <QRCodeModalV2
        //avoid unnecessary re-renders of passing card
        userProfile={openQRCode ? card : undefined}
        open={openQRCode}
        onClose={() => setOpenQRCode(false)}
      />
    </div>
  );
};

export default DigitalCard;
