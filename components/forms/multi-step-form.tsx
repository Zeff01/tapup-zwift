"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { updateUserById } from "@/lib/firebase/actions/user.action";
import { Photo } from "@/types/types";
import { Loader2, LoaderCircle, X } from "lucide-react";
import Cropper from "../Cropper";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/zod-schema";
import { TemplateGrid } from "@/components/TemplateGrid";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import ImageLoaded from "@/components/ImageLoaded";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "@/providers/user-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "@/lib/firebase/actions/card.action";
import { useRouter } from "next/navigation";
import MultiStepProgress from "./MultiStepProgress";
import TapupLogo from "../svgs/TapupLogo";
import { formHeaderItems } from "@/constants";
import SocialLinksSelector from "./SocialLink";
import { Input } from "../ui/input";
import SelectedTemplate from "./SelectedTemplate";
import SelectedPhysicalCard from "./SelectedPhysicalCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhysicalCardCarousel } from "../PhysicalCardCarousel";
import { RefreshCcw } from "lucide-react";

export type ChosenTemplateType = z.infer<
  typeof createPortfolioSchema
>["chosenTemplate"];

export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

interface SelectedLink {
  label: string;
  key: string;
  value: string; // Input value for the link
}

export default function CardsAndUsersCreateFields({
  card,
}: {
  card?: boolean;
}) {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>([]);

  const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ChosenTemplateType>("template1");
  const [selectedPhysicalCard, setSelectedPhysicalCard] =
    useState<ChosenPhysicalCardType>("eclipse");

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
      company: "",
      companyBackground: "",
      serviceDescription: "",
      coverPhotoUrl: "",
      servicePhotos: [],
      profilePictureUrl: "",
      position: "",
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      facebookUrl: "",
      youtubeUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      whatsappNumber: "",
      websiteUrl: "",
      chosenTemplate: "template1",
      chosenPhysicalCard: "eclipse",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioFormData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (!imageUrl) {
        setImageUrl(parsedData?.profilePictureUrl);
      }
      if (!coverPhotoUrl) {
        setCoverPhotoUrl(parsedData?.coverPhotoUrl);
      }
      if (!serviceImageUrls.length) {
        setServiceImageUrls(parsedData?.servicePhotos || []);
      }
      Object.keys(parsedData).forEach((key) => {
        methods.setValue(key as any, parsedData[key]);
      });
    }
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch((data) => {
      localStorage.setItem("portfolioFormData", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [methods]);

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
    methods.setValue("chosenPhysicalCard", selectedPhysicalCard);
  }, [
    coverPhotoUrl,
    imageUrl,
    serviceImageUrls,
    selectedTemplateId,
    selectedPhysicalCard,
    methods,
    user,
  ]);

  const successHandler = () => {
    methods.reset();
    localStorage.removeItem("portfolioFormData");
    window.location.replace("/cards");
  };

  const { mutate: createCardMutation, isPending: isLoadingCreateCard } =
    useMutation({
      mutationFn: createCard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cards", user?.uid] });
        successHandler();
      },
    });

  const { mutate: onBoardUserMutation, isPending: isLoadingOnBoarding } =
    useMutation({
      mutationFn: updateUserById,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["current-active-user", user?.uid],
        });
        successHandler();
      },
    });

  const formSubmit = async (data: z.infer<typeof createPortfolioSchema>) => {
    if (!user) return;
    if (!card) {
      onBoardUserMutation({ user_id: user.uid, user: data });
      return;
    }
    createCardMutation({
      user_id: user.uid,
      data: {
        ...data,
        chosenPhysicalCard: {
          id: data.chosenPhysicalCard,
          name: data.chosenPhysicalCard,
        },
      },
    });
  };

  const isLoading = isLoadingCreateCard || isLoadingOnBoarding;

  // Step state management
  const [currentStep, setCurrentStep] = useState(1);

  const steps: Array<(keyof z.infer<typeof createPortfolioSchema>)[]> = [
    ["coverPhotoUrl", "company", "companyBackground", "serviceDescription"], // Step 1 fields
    ["profilePictureUrl", "firstName", "lastName", "email", "number"], // Step 2 fields
    ["chosenTemplate"], // Step 3 fields
    ["chosenPhysicalCard"], // Step 4 fields
  ];

  const handleNextStep = async (event: any) => {
    event.preventDefault();

    if (currentStep === 3) {
      setCurrentStep(4);
      return;
    }
    const fieldsToValidate = [...steps[currentStep - 1]];

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
    <main className="h-full">
      <Form {...methods}>
        <form
          className="space-y-6 h-full"
          onSubmit={methods.handleSubmit(formSubmit)}
        >
          {/* First 3 Step has the same layout for the heading and title */}
          {currentStep < 4 ? (
            <div className="flex flex-col overflow-auto py-8 px-6 sm:px-0 bg-background h-full">
              <TapupLogo className="mx-auto mb-5" />
              <div className="w-full mx-auto max-w-md">
                {formHeaderItems.map((item) => (
                  <div key={item.id} className="mb-4">
                    <h2 className="text-2xl">
                      {currentStep === item.id ? item.title : ""}
                    </h2>
                  </div>
                ))}
                <MultiStepProgress currentStep={currentStep} />

                {/* Step 1 - Cover Photo & company info*/}
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
                    <span className="text-sm text-red-500 relative bottom-12">
                      {methods.formState.errors.coverPhotoUrl?.message ?? ""}
                      {methods.formState.errors.coverPhotoUrl?.message ?? ""}
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

                {/* Step 2 - Profile Photo & Personal Info */}
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

                    <span className="text-sm text-red-500">
                      {methods.formState.errors.profilePictureUrl?.message ??
                        ""}
                    </span>

                    <PersonalInfoForm control={methods.control} isCard />
                    <SocialLinksSelector onAddLink={handleAddLink} />
                    <div className="">
                      {selectedLinks.map((link) => (
                        <div
                          key={link.key}
                          className="flex flex-col gap-3 py-2"
                        >
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

                {/* Step 3 - Template */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Template Preview
                    </h2>
                    {selectedTemplateId ? (
                      <div className="w-full overflow-y-scroll border max-h-[340px] rounded-lg mb-4 ">
                        <SelectedTemplate
                          templateId={selectedTemplateId}
                          formData={{
                            ...methods.watch(),
                            chosenPhysicalCard: {
                              id: methods.watch().chosenPhysicalCard,
                            },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center border rounded-lg mb-4 bg-gray-100">
                        <p className="text-gray-500">No template selected</p>
                      </div>
                    )}
                    <TemplateGrid
                      selectedTemplateId={selectedTemplateId}
                      setSelectedTemplateId={setSelectedTemplateId}
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => router.push('/cards')}
                    className="px-8 py-2 bg-gray-400 text-white rounded-full hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-5">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="px-8 py-2 bg-gray-400 text-white rounded-full hover:bg-slate-700"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 4 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-2 bg-green-600 text-white rounded-full hover:bg-green-500"
                    >
                      Next
                    </button>
                  )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Top Section with Back Button */}
              <div className="p-4 border">
                <Button
                  variant="outline"
                  className="text-foreground dark:text-secondary-foreground dark:border-white"
                  onClick={goToPreviousStep}
                >
                  <ArrowLeft />
                  Back
                </Button>
              </div>

              {/* Middle Section */}

              <div className="flex-grow flex flex-col">
                {/* Title */}
                <h1 className="text-2xl font-medium text-center my-8 mx-auto">
                  Pick your physical card
                </h1>

                {/* Cards Grid */}

                <div className="flex-grow flex flex-col">
                  <div className="flex-grow flex items-center justify-center mx-6 md:mx-0">
                    {selectedPhysicalCard ? (
                      <SelectedPhysicalCard
                        cardId={selectedPhysicalCard}
                        formData={{
                          ...methods.watch(),
                          chosenPhysicalCard: {
                            id: selectedPhysicalCard,
                          },
                        }}
                      />
                    ) : (
                      <h1 className="text-black">Select a card</h1>
                    )}
                  </div>
                  <div className="h-20 md:h-24 ">
                    <PhysicalCardCarousel
                      selectedCardId={selectedPhysicalCard}
                      setSelectedCardId={setSelectedPhysicalCard}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section with Submit Button */}

              <div className="p-4 md:pr-16">
                <div className="mx-auto flex justify-end">
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
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </main>
  );
}
