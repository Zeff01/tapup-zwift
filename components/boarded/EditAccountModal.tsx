"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, Camera, Edit2, Upload } from "lucide-react";
import { useUserContext } from "@/providers/user-provider";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/firebase/actions/user.action";
import { ExtendedUserInterface, Photo } from "@/types/types";
import ImageCropper from "../ImageCropper";

// Form validation schema
const editAccountSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
});

type EditAccountFormData = z.infer<typeof editAccountSchema>;

interface EditAccountModalProps {
  trigger?: React.ReactNode;
}

const EditAccountModal = ({ trigger }: EditAccountModalProps) => {
  const { user, isLoading: isLoadingUser, updateUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.profilePictureUrl || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const form = useForm<EditAccountFormData>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
      setAvatarUrl(user.profilePictureUrl || null);
    }
  }, [user, form]);

  const handlePhotoChange = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };
  
  const handleUrlChange = (url: string | null) => {
    setAvatarUrl(url);
  };

  const handleSubmit = async (data: EditAccountFormData) => {
    setIsLoading(true);
    try {
      console.log("User:", user);
      if (!user?.uid) {
        toast.error("User not found");
        return;
      }

      console.log("Updating user with data:", {
        ...data,
        profilePictureUrl: avatarUrl,
      });

      await updateUser(user.uid, {
        ...user,
        firstName: data.firstName,
        lastName: data.lastName,
        profilePictureUrl: avatarUrl || user.profilePictureUrl || "",
      });

      toast.success("Account updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating account:", error);
      toast.error("Failed to update account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form to original user data
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
      setAvatarUrl(user.profilePictureUrl || null);
    }
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsOpen(open);
    }
  };

  // Don't render if user is loading
  if (isLoadingUser) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {trigger || (
            <span className="ml-auto flex cursor-pointer ">
              <Edit2 className="size-4" />
            </span>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-4">
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update your account information and profile picture.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center space-y-3">
                <ImageCropper
                  imageUrl={avatarUrl}
                  setImageUrl={handleUrlChange}
                  photo={selectedPhoto}
                  setPhoto={handlePhotoChange}
                  aspect={1}
                  circularCrop
                  className="h-20 w-20 rounded-full border-2 border-gray-200"
                  fallback={
                    <div className="flex items-center justify-center h-full w-full bg-muted rounded-full">
                      <UserIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  }
                  showEditButtons={true}
                  cropperTitle="Crop Profile Photo"
                />
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Click to upload • Min 200x200px • Max 5MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported: JPG, PNG, GIF
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="green" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default EditAccountModal;
