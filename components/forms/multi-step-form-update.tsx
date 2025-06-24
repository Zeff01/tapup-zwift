"use client";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ImageLoaded from "@/components/ImageLoaded";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { formHeaderItems } from "@/constants";
import {
  addCustomUrl,
  updateCardById,
} from "@/lib/firebase/actions/card.action";
import { editCardSchema } from "@/lib/zod-schema";
import { useUserContext } from "@/providers/user-provider";
import { Card, ExtendedUserInterface, Photo } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { z } from "zod";
import Cropper from "../Cropper";
import CropperMultiple from "../CropperMultiple";
import TapupLogo from "../svgs/TapupLogo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MultiStepProgress from "./MultiStepProgress";
import SelectedTemplate from "./SelectedTemplate";
import SocialLinksSelector from "./SocialLink";

export type ChosenTemplateType =
  | "template1"
  | "template2"
  | "template3"
  | "template4"
  | "template5"
  | "template6"
  | "template7"
  | "template8"
  | "template9"
  | "template10"
  | "template11"
  | "template12";

export type ChosenPhysicalCardType =
  | "card1"
  | "card2"
  | "card3"
  | "card4"
  | "card5"
  | "card6"
  | "card7"
  | "card8"
  | "card9"
  | "card10"
  | "card11";

type CardSpecificFields = {
  owner: string;
  transferCode: string;
  expiryDate?: number;
  disabled?: boolean;
};

interface SelectedLink {
  label: string;
  key: string;
  value: string;
}

interface MultiStepFormUpdateProps {
  userData: Card | ExtendedUserInterface;
  isCurrentUser?: boolean;
  isCard?: boolean;
  isOnboarding?: boolean;
}

const MultiStepFormUpdate = ({
  userData,
  isCurrentUser,
  isCard,
  isOnboarding,
}: MultiStepFormUpdateProps) => {
  const queryClient = useQueryClient();
  const { user, updateUser } = useUserContext();
  const router = useRouter();

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    userData.profilePictureUrl || null
  );

  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(
    userData.coverPhotoUrl || null
  );

  const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>(
    userData.servicePhotos || []
  );

  const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const steps: Array<(keyof z.infer<typeof editCardSchema>)[]> = isOnboarding
    ? [
        ["coverPhotoUrl", "company", "position"],
        ["firstName", "lastName", "email", "number", "profilePictureUrl"],
        ["customUrl", "chosenTemplate"],
      ]
    : [
        [],
        [
          "firstName",
          "lastName",
          "email",
          "number",
          ...(selectedLinks.map((link) => link.key) as Array<
            keyof z.infer<typeof editCardSchema>
          >),
        ],
        ["chosenTemplate"],
      ];

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ChosenTemplateType>(
      (userData.chosenTemplate as ChosenTemplateType) ?? "template1"
    );

  const [selectedPhysicalCardId, setSelectedPhysicalCardId] =
    useState<ChosenPhysicalCardType>(
      (userData.chosenPhysicalCard as ChosenPhysicalCardType) ?? "card1"
    );

  // NO LONGER NEEDED FOR MULTIPLE FILE UPLOAD
  // const addServicePhoto = (photo: Photo) => {
  //   setServicePhotos([...servicePhotos, photo]);
  // };

  // const addServiceImageUrl = (imageUrl: string) => {
  //   setServiceImageUrls([...serviceImageUrls, imageUrl]);
  //   console.log(serviceImageUrls);
  // };

  const methods = useForm<z.infer<typeof editCardSchema>>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      coverPhotoUrl: userData.coverPhotoUrl || "",
      profilePictureUrl: userData.profilePictureUrl || "",
      position: userData.position || "",
      company: userData.company || "",
      companyBackground: userData.companyBackground || "",
      serviceDescription: userData.serviceDescription || "",
      servicePhotos: userData.servicePhotos || [],
      chosenTemplate:
        (userData.chosenTemplate as ChosenTemplateType) ?? "template1",
      chosenPhysicalCard:
        typeof userData.chosenPhysicalCard === "object"
          ? ((userData.chosenPhysicalCard?.id as ChosenPhysicalCardType) ??
            "card1")
          : ((userData.chosenPhysicalCard as ChosenPhysicalCardType) ??
            "card1"),
      customUrl: userData.customUrl || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      number: userData.number || "",
      facebookUrl: userData.facebookUrl || "",
      youtubeUrl: userData.youtubeUrl || "",
      instagramUrl: userData.instagramUrl || "",
      twitterUrl: userData.twitterUrl || "",
      linkedinUrl: userData.linkedinUrl || "",
      whatsappNumber: userData.whatsappNumber || "",
      skypeInviteUrl: userData.skypeInviteUrl || "",
      websiteUrl: userData.websiteUrl || "",
      viberUrl: userData.viberUrl || "",
      tiktokUrl: userData.tiktokUrl || "",
    },
  });

  useEffect(() => {
    methods.setValue("coverPhotoUrl", coverPhotoUrl || "");
  }, [coverPhotoUrl, methods.setValue]);

  useEffect(() => {
    methods.setValue("profilePictureUrl", imageUrl || "");
  }, [imageUrl, methods.setValue]);

  useEffect(() => {
    methods.setValue("servicePhotos", serviceImageUrls);
  }, [serviceImageUrls, methods.setValue]);

  useEffect(() => {
    methods.setValue("chosenTemplate", selectedTemplateId);
  }, [selectedTemplateId, methods.setValue]);

  const [customUrlError, setCustomUrlError] = useState<string | null>(null);
  const prevCustomUrl = userData.customUrl;

  const {
    mutateAsync: mutateCustomUrl,
    isPending: isCustomUrlLoading,
    error: customUrlMutationError,
  } = useMutation({
    mutationFn: ({
      customUrl,
      cardId,
    }: {
      customUrl: string;
      cardId: string;
    }) => addCustomUrl(customUrl, cardId),
  });

  const { mutate: updateCardMutation, isPending: isLoadingUpdateMutation } =
    useMutation({
      mutationFn: updateCardById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      },
    });

  const formSubmit = async (data: z.infer<typeof editCardSchema>) => {
    try {
      console.log("formSubmit");
      if (isOnboarding) {
        console.log("Inside onboarding block");

        if (!coverPhotoUrl || !imageUrl) {
          toast.error("Please upload both cover photo and profile picture");
          return;
        }

        const onboardingData = {
          ...data,
          coverPhotoUrl,
          profilePictureUrl: imageUrl,
          servicePhotos: serviceImageUrls,
        };

        console.log("Saving to localStorage:", onboardingData);
        localStorage.setItem("onboardingData", JSON.stringify(onboardingData));
        toast.success("Onboarding data saved successfully!");
        router.push("/login");
        return;
      }

      if (isCard) {
        const { customUrl, ...remainingData } = data;

        if (customUrl !== undefined && customUrl !== prevCustomUrl) {
          const result = await mutateCustomUrl({
            customUrl,
            cardId: userData.id!,
          });

          if (!result.success) {
            toast.error(result.message);
            setCustomUrlError(result.message);
            return;
          }
        }

        await updateCardMutation({
          cardId: userData.id!,
          data: {
            ...remainingData,
            portfolioStatus: true,
            chosenPhysicalCard: data.chosenPhysicalCard
              ? { id: data.chosenPhysicalCard }
              : undefined,
          },
        });

        router.push("/cards");
        return;
      }

      const id = isCurrentUser
        ? (userData as ExtendedUserInterface).uid
        : userData.id;

      if (!id) return;
      await updateUser(id, data as ExtendedUserInterface);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "Failed to save data. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    }
  };

  const isLoading = isOnboarding
    ? isLoadingUpdateMutation
    : isLoadingUpdateMutation;

  const handleNextStep = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleNextStep");
    try {
      // Validate current step fields
      const fieldsToValidate = steps[currentStep - 1];
      const isValid = await methods.trigger(fieldsToValidate);

      // On final step, validate entire form
      const isFinalStep = currentStep === steps.length;
      if (isFinalStep) {
        const fullIsValid = await methods.trigger();
        if (!fullIsValid) return;
      }
      const hasImageErrors =
        (currentStep === 1 && !coverPhotoUrl) ||
        (currentStep === 2 && !imageUrl);

      if (!isValid || hasImageErrors) {
        // Handle image validation errors first

        if (hasImageErrors) {
          if (!coverPhotoUrl) toast.error("Cover photo is required");
          if (!imageUrl && currentStep === 2)
            toast.error("Profile picture is required");
          return;
        }

        // Handle Zod validation errors
        const errorKeys = Object.keys(methods.formState.errors);
        if (errorKeys.length > 0) {
          toast.error("Please fill in all required fields correctly");
        }
        return;
      }

      console.log("Next step");
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error("Error in handleNextStep:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddLink = (link: {
    label: string;
    key: string;
    value: string;
  }) => {
    setSelectedLinks((prev) => [
      ...prev,
      { label: link.label, key: link.key, value: link.value },
    ]);
    // Initialize form value for new link
    methods.setValue(
      link.key as keyof z.infer<typeof editCardSchema>,
      link.value
    );
  };

  const handleInputChange = (key: string, value: string) => {
    setSelectedLinks((prev) =>
      prev.map((link) => (link.key === key ? { ...link, value } : link))
    );
    // Update corresponding form field
    methods.setValue(key as keyof z.infer<typeof editCardSchema>, value);
  };
  return (
    <main className="h-full">
      <Form {...methods}>
        <form
          className="space-y-6 h-full"
          onSubmit={methods.handleSubmit(formSubmit)}
        >
          <div className="flex flex-col overflow-auto py-8 px-6 sm:px-0 bg-background h-full">
            <div className="aspect-[130/48] w-80 mx-auto mb-10">
              <TapupLogo />
            </div>
            <div className="w-full mx-auto max-w-sm">
              {formHeaderItems.map((item) => (
                <div key={item.id} className="mb-4">
                  <h2 className="text-2xl">
                    {currentStep === item.id ? item.title : ""}
                  </h2>
                </div>
              ))}
              <MultiStepProgress currentStep={currentStep} />

              {/* Step 1 - Cover Photo and Profile Pic */}
              {currentStep === 1 && (
                <div className="">
                  <p className="text-lg font-semibold mb-6">Cover Photo</p>
                  <div className="flex aspect-[16/9] w-full flex-col items-center relative mb-20">
                    <div className="rounded-lg animate-pulse absolute w-full h-full" />
                    <div className="flex flex-col items-center relative w-full">
                      <div className="w-full">
                        <Cropper
                          imageUrl={coverPhotoUrl}
                          setImageUrl={setCoverPhotoUrl}
                          photo={coverPhoto}
                          aspect={16 / 9}
                          setPhoto={setCoverPhoto}
                          className="w-full aspect-[16/9] rounded-2xl overflow-hidden border-none "
                          imageClassName="rounded-2xl"
                          fallback={
                            <div className="w-full aspect-[16/9] flex flex-col items-center gap-y-2 rounded-2xl border-dashed border-2 border-gray-500">
                              <Image
                                src={"/assets/image-plus.svg"}
                                width={50}
                                height={50}
                                alt="plus"
                                className="size-10 lg:size-auto mt-8 border p-2 rounded-md cursor-pointer"
                              />
                              <p className="text-[#767676] text-xl">
                                Drop your image here or{" "}
                                <span className="text-green-500">browse</span>
                              </p>
                              <p className="text-[#767676] text-xs">
                                We support PNG, JPEG, and GIF files under 25MB
                              </p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <CompanyInfoForm
                      control={methods.control}
                      isAllFieldsRequired={false}
                    />
                    <div className="">
                      <h1 className="text-lg font-semibold mt-2">Photos</h1>
                      <div className="w-full mt-2">
                        <CropperMultiple
                          previewImageUrl={null}
                          imageUrls={serviceImageUrls}
                          setImageUrls={setServiceImageUrls}
                          previewPhoto={null}
                          aspect={1}
                          photos={servicePhotos}
                          setPhotos={setServicePhotos}
                          className="w-full aspect-[16/9] rounded-2xl overflow-hidden border-dashed border-2"
                          imageClassName="rounded-2xl"
                          disableUpload={serviceImageUrls.length >= 5}
                          fallback={
                            <div className="w-full aspect-[16/9] flex flex-col items-center gap-y-2">
                              <Image
                                src={"/assets/image-plus.svg"}
                                width={50}
                                height={50}
                                alt="plus"
                                className="size-10 lg:size-auto mt-8 border p-2 rounded-md cursor-pointer"
                              />
                              <p className="text-[#767676] text-xl">
                                Drop your image here or{" "}
                                <span className="text-green-500">browse</span>
                              </p>
                              <p className="text-[#767676] text-xs">
                                We support PNG, JPEG, and GIF files under 25MB
                              </p>
                            </div>
                          }
                        />

                        <div className="flex gap-2 mt-4 flex-wrap">
                          {serviceImageUrls.map((url, index) => (
                            <div
                              key={`service-image-${index}`}
                              className="relative flex items-center justify-center h-[77px] w-[77px] overflow-hidden rounded-md bg-[#222224] border border-[#2c2c2c]"
                            >
                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setServiceImageUrls((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                  setServicePhotos((prev) =>
                                    prev.filter((_, i) => i !== index)
                                  );
                                }}
                                className="absolute top-1 right-1 flex items-center justify-center h-4 w-4 rounded-full bg-gray-900 z-10 hover:bg-gray-700"
                              >
                                <IoMdClose className="size-2 text-white" />
                              </button>

                              <Loader2 className="animate-spin" />
                              <ImageLoaded
                                url={url}
                                className="absolute top-0 left-0 h-full w-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 - Company Info and Personal Info */}
              {currentStep === 2 && (
                <div className="">
                  <h2>Profile Photo</h2>
                  <div className="w-full flex justify-center items-center flex-col my-4">
                    <Cropper
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      photo={photo}
                      aspect={1}
                      setPhoto={setPhoto}
                      circularCrop
                      className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full "
                      fallback={
                        <div className="relative w-full h-full rounded-full flex items-center justify-center border-2  border-dashed">
                          <Image
                            src={"/assets/image-plus.svg"}
                            width={50}
                            height={50}
                            className="size-8 lg:size-auto p-2 border rounded-md border-gray-500"
                            alt="gallery"
                          />
                        </div>
                      }
                    />

                    <div className="flex flex-col items-center justify-center mt-2">
                      <p className="text-[#767676] text-base">
                        Drop your image here or{" "}
                        <span className="text-green-500">browse</span>
                      </p>
                      <p className="text-[#767676] text-xs">
                        We support PNG, JPEG, and GIF files under 25MB
                      </p>
                    </div>

                    <span className="text-sm text-red-500 pt-4">
                      {methods.formState.errors.profilePictureUrl?.message ??
                        ""}
                    </span>
                  </div>
                  <PersonalInfoForm control={methods.control} isCard />
                  <SocialLinksSelector onAddLink={handleAddLink} />
                  <div className="">
                    {selectedLinks.map((link) => (
                      <div key={link.key} className="flex flex-col gap-3 py-2">
                        <span className="font-medium text-primary">
                          {link.label}
                        </span>
                        <Input
                          placeholder={`Enter ${link.label} URL`}
                          value={link.value}
                          onChange={(e) =>
                            handleInputChange(link.key, e.target.value)
                          }
                          className="flex-1 text-primary bg-secondary"
                        />
                        <span className="text-xs text-red-500">
                          {methods.formState.errors?.[
                            link.key as keyof typeof methods.formState.errors
                          ]?.message ?? ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 - Template and Physical Card */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      Custom URL <sup className="font-normal">(optional)</sup>
                    </h2>

                    <FormField
                      control={methods.control}
                      name={"customUrl"}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <div className="flex w-full flex-col">
                            <small className="text-muted-foreground text-xs italic pl-2 mb-0.5">
                              {(() => {
                                const customUrl =
                                  methods.getValues("customUrl");
                                const baseUrl = `www.tapup.tech/site/`;
                                return customUrl
                                  ? `${baseUrl}${customUrl}`
                                  : `${baseUrl}${userData.id}`;
                              })()}
                            </small>
                            <FormControl>
                              <>
                                {" "}
                                <Input
                                  placeholder={"Enter custom URL..."}
                                  className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-secondary border border-border-input rounded-md"
                                  {...field}
                                />
                                <p className="text-[11px] text-red-600 text-muted-foreground mt-1 px-1">
                                  Note: This custom URL cannot be changed for
                                  the next 30 days.
                                </p>
                              </>
                            </FormControl>
                            <FormMessage className="text-12 text-red-500 mt-2">
                              {methods.formState.errors.customUrl?.message ||
                                customUrlError ||
                                customUrlMutationError?.message ||
                                ""}
                            </FormMessage>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      Choose Template
                    </h2>
                    {selectedTemplateId ? (
                      <div className="w-full border rounded-lg mb-4 max-h-[340px] overflow-y-auto">
                        <SelectedTemplate
                          templateId={selectedTemplateId}
                          formData={{
                            ...methods.watch(),
                            chosenPhysicalCard: {
                              id: methods.watch().chosenPhysicalCard || "",
                            },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center border rounded-lg mb-4 bg-gray-100 h-40">
                        <p className="text-gray-500">No template selected</p>
                      </div>
                    )}
                    <TemplateCarousel
                      selectedTemplateId={selectedTemplateId}
                      setSelectedTemplateId={(id: ChosenTemplateType) =>
                        setSelectedTemplateId(id)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-5 mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-8 py-2 bg-gray-400 text-white rounded-full hover:bg-slate-700"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-500"
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-500"
                    disabled={isLoading || isCustomUrlLoading}
                  >
                    {isLoading || isCustomUrlLoading ? (
                      <>
                        <LoaderCircle className="animate-spin size-5" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default MultiStepFormUpdate;
