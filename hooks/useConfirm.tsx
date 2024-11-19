import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useConfirm = (
  defaultTitle: string,
  defaultMessage: string
): [
  () => JSX.Element,
  (title?: string, message?: string | JSX.Element) => Promise<unknown>,
] => {
  const [title, setTitle] = useState(defaultTitle);
  const [message, setMessage] = useState<string | JSX.Element>(defaultMessage);
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (title?: string, message?: string | JSX.Element) => {
    if (title) setTitle(title);
    if (message) setMessage(message);
    return new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  };
  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-sm p-0 gap-0">
        <DialogHeader>
          <DialogTitle className="text-xl px-4 py-2">{title}</DialogTitle>
          <DialogDescription className="border-t border-b py-6 px-4">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="py-2 px-4">
          <Button onClick={handleCancel} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="w-20">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

// Sample Usage

//   const [ConfirmDialog, confirm] = useConfirm(
//     "Are you sure",
//     "You are about to delete this account"
//   );

// ConfirmDialog is the react component to be rendered, so it needs to be declared inside the component where you want to use it.

//   const handleDelete = async () => {
//     const ok = await confirm();
//     if (!ok) return;
//     mutation.mutate();
//   };
