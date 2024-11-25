"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { updateUserById } from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import { Loader2, LoaderCircle, X } from "lucide-react";
import Cropper from "../Cropper";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/utils";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import ImageLoaded from "@/components/ImageLoaded";
import { IoMdClose } from "react-icons/io";
import {
  ExtendedUserInterface,
  useUserContext,
} from "@/providers/user-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard, updateCardById } from "@/src/lib/firebase/store/card.action";
import MultiStepProgress from "./MultiStepProgress";
import TapupLogo from "../svgs/TapupLogo";
import { formHeaderItems } from "@/constants";
import SocialLinksSelector from "./SocialLink";
import { Input } from "../ui/input";
import SelectedTemplate from "./SelectedTemplate";


export type ChosenTemplateType = z.infer<
  typeof createPortfolioSchema
>["chosenTemplate"];

interface SelectedLink {
  label: string;
  key: string;
  value: string; // Input value for the link
}


const MultiStepFormUpdate = ({
  userData,
  isCurrentUser,
  isCard,
}: {
  userData: ExtendedUserInterface;
  isCurrentUser?: boolean;
  isCard?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { user, updateUser, isLoading: userContextLoading } = useUserContext();

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

  const steps: Array<(keyof z.infer<typeof createPortfolioSchema>)[]> = [
    ["company", "companyBackground", "serviceDescription"], // Step 1 fields
    ["firstName", "lastName", "email", "number"], // Step 2 fields
    ["chosenTemplate"], // Step 3 fields
  ];


  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ChosenTemplateType>(userData.chosenTemplate as ChosenTemplateType);

  const addServicePhoto = (photo: Photo) => {
    setServicePhotos([...servicePhotos, photo]);
  };

  const addServiceImageUrl = (imageUrl: string) => {
    setServiceImageUrls([...serviceImageUrls, imageUrl]);
    };
    


  // 1. Define your form.
  const methods = useForm<z.infer<typeof createPortfolioSchema>>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      coverPhotoUrl: userData.coverPhotoUrl || "",
      profilePictureUrl: userData.profilePictureUrl || "",
      position: userData.position || "",
      company: userData.company || "",
      companyBackground: userData.companyBackground || "",
      serviceDescription: userData.serviceDescription || "",
      servicePhotos: userData.servicePhotos || [],
      chosenTemplate:
        (userData.chosenTemplate as ChosenTemplateType) || "template1",
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
    },
  });

  useEffect(() => {
    if (imageUrl) {
      methods.setValue("profilePictureUrl", imageUrl || "");
      if (methods.formState.errors.profilePictureUrl) {
        methods.clearErrors("profilePictureUrl");
      }
    }
    if (coverPhotoUrl) {
      methods.setValue("coverPhotoUrl", coverPhotoUrl || "");
    }
    if (serviceImageUrls.length > 0) {
      methods.setValue("servicePhotos", serviceImageUrls || []);
    }
    methods.setValue("chosenTemplate", selectedTemplateId);
  }, [coverPhotoUrl, imageUrl, serviceImageUrls, selectedTemplateId, methods]);

  const { mutate: updateCardMutation, isPending: isLoadingUpdateMutation } =
    useMutation({
      mutationFn: updateCardById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
      },
    });

  const formSubmit = async (data: z.infer<typeof createPortfolioSchema>) => {
    if (!userData) return;
    if (isCard) {
      updateCardMutation({ cardId: userData.id!, data });
      return;
    }
    const id = isCurrentUser ? userData.uid : userData.id || userData.uid;
    if (!id) return;
    await updateUser(id as string, data as ExtendedUserInterface);
  };

    const isLoading = userContextLoading || isLoadingUpdateMutation;
    

    const handleNextStep = async (event: any) => {
    event.preventDefault();

    const fieldsToValidate = steps[currentStep - 1];

    // Trigger validation only for the current step
    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      // Clear errors for other steps to avoid showing irrelevant errors
      const nonCurrentFields = steps
        .flat()
        .filter((field) => !fieldsToValidate.includes(field));
      methods.clearErrors(nonCurrentFields);

      // Proceed to the next step
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      console.log("Validation errors", methods.formState.errors);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddLink = (link: { label: string; key: string }) => {
    setSelectedLinks((prev) => [
      ...prev,
      { label: link.label, key: link.key, value: "" },
    ]);
  };

  const handleInputChange = (key: string, value: string) => {
    setSelectedLinks((prev) =>
      prev.map((link) => (link.key === key ? { ...link, value } : link))
    );
  };


  return (
    <main className="flex flex-col overflow-auto py-8 px-6 sm:px-0 bg-background h-full">
      <TapupLogo className="mx-auto mb-5" />
      <div className="w-full mx-auto max-w-sm">
        {formHeaderItems.map((item) => (
          <div key={item.id} className="mb-4">
            <h2 className="text-2xl">
              {currentStep === item.id ? item.title : ""}
            </h2>
          </div>
        ))}
        <MultiStepProgress currentStep={currentStep} />
        <Form {...methods}>
          <form
            className="space-y-6"
            onSubmit={methods.handleSubmit(formSubmit)}
          >
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
                <span className="text-sm text-red-500">
                  {methods.formState.errors.profilePictureUrl?.message ?? ""}
                </span>

                <div className="space-y-6">
                  <CompanyInfoForm control={methods.control} />
                  <div className="">
                    <h1 className="text-lg font-semibold mt-2">Photos</h1>
                    <div className="w-full mt-2">
                      <Cropper
                        imageUrl={null}
                        setImageUrl={addServiceImageUrl}
                        photo={null}
                        aspect={1}
                        setPhoto={addServicePhoto}
                        className="w-full aspect-[16/9] rounded-2xl overflow-hidden border-dashed border-2"
                        imageClassName="rounded-2xl"
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
                        {serviceImageUrls.map((url, key) => {
                          return (
                            <div
                              key={`index-${key}`}
                              className="flex items-center justify-center rounded-md h-[77px] w-[77px] z-auto overflow-hidden relative bg-[#222224] border border-[#2c2c2c]"
                            >
                              <div
                                className="absolute flex items-center justify-center top-1 right-1 h-4 rounded-full w-4 bg-gray-900 z-[100] cursor-pointer"
                                onClick={() =>
                                  setServiceImageUrls((prev) =>
                                    prev.filter((_, index) => index !== key)
                                  )
                                }
                              >
                                <IoMdClose className="size-2 text-white" />
                              </div>
                              <Loader2 className="animate-spin" />
                              <ImageLoaded
                                className="rounded-md absolute top-0 left-0"
                                url={url}
                              />
                            </div>
                          );
                        })}
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
                </div>
                <PersonalInfoForm control={methods.control} />
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 - Template and Social Links */}
            {currentStep === 3 && (
              <div>
                <h2>Template Preview</h2>
                {selectedTemplateId ? (
                  <div className="w-full overflow-y-scroll border max-h-[340px] rounded-lg mb-4 ">
                    <SelectedTemplate
                      templateId={selectedTemplateId}
                      formData={methods.watch()}
                    />
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center border rounded-lg mb-4 bg-gray-100">
                    <p className="text-gray-500">No template selected</p>
                  </div>
                )}
                <TemplateCarousel
                  selectedTemplateId={selectedTemplateId}
                  setSelectedTemplateId={setSelectedTemplateId}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-5">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="px-8 py-2 bg-gray-400 text-white rounded-full hover:bg-slate-700"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default MultiStepFormUpdate;
