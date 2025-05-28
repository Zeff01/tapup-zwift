import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { UserState } from "@/types/types";
import { deletePrintCard } from "@/lib/firebase/actions/card.action";
import { toast } from "react-toastify";

const DeleteDialog = ({
  cardId,
  user,
}: {
  cardId: string | undefined;
  user: UserState;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deletePrintCard({
        role: user?.role!,
        cardId: cardId || "",
      });

      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      console.error("Failed to delete card", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 justify-between w-full"
        >
          <span className="text-red-500 hover:text-red-500">Delete</span>
          <Trash2 size={15} className="text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Delete Card
          </AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-900 dark:text-white">
            Are you sure you want to delete this card? This will permanently
            delete the card and it cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="destructive"
            className="hover:bg-red-500"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
