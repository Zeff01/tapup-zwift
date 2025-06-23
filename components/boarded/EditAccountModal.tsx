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
import { ExtendedUserInterface } from "@/types/types";

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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const validateImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Check if image is square and at least 200x200 pixels
        const isValidSize = img.width >= 200 && img.height >= 200;
        const isSquare = img.width === img.height;

        if (!isValidSize) {
          toast.error("Image must be at least 200x200 pixels");
          resolve(false);
        } else if (!isSquare) {
          toast.error("Image must be square (same width and height)");
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast.error("Invalid image file");
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate image dimensions
    const isValidImage = await validateImageDimensions(file);
    if (!isValidImage) return;

    setIsUploadingImage(true);
    try {
      const imageUrl = URL.createObjectURL(file);

      const url = await uploadImage({
        preview: imageUrl,
        raw: file,
      });

      setAvatarUrl(url);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
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
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="bg-muted">
                    <UserIcon className="h-10 w-10 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                {avatarUrl && (
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                    <Camera className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploadingImage ? "Uploading..." : "Change Avatar"}
                </Button>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Square image required • Min 200x200px • Max 5MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported: JPG, PNG, GIF
                  </p>
                </div>
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
  );
};

export default EditAccountModal;
