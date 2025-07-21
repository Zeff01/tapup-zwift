"use client";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import SocialLinksForm from "@/components/forms/SocialLinkForm";
import ImageLoaded from "@/components/ImageLoaded";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import { Form } from "@/components/ui/form";
import { createCard } from "@/lib/firebase/actions/card.action";
import { updateUserById } from "@/lib/firebase/actions/user.action";
import { createPortfolioSchema } from "@/lib/zod-schema";
import { useUserContext } from "@/providers/user-provider";
import { Photo } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { z } from "zod";
import Cropper from "../Cropper";
import TapupLogo from "../svgs/TapupLogo";

export type ChosenTemplateType = z.infer<
  typeof createPortfolioSchema
>["chosenTemplate"];
export type ChosenPhysicalCardType = z.infer<
  typeof createPortfolioSchema
>["chosenPhysicalCard"];

export default function CardsAndUsersCreateFields({
  card,
  isCard,
}: {
  card?: boolean;
  isCard?: boolean;
}) {
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ChosenTemplateType>("template1");

  const [selectedPhysicalCardId, setSelectedPhysicalCardId] =
    useState<ChosenPhysicalCardType>("card1");

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
      coverPhotoUrl: "",
      profilePictureUrl: "",
      position: "",
      company: "",
      companyBackground: "",
      serviceDescription: "",
      servicePhotos: [],
      chosenTemplate: "template1",
      chosenPhysicalCard: "card1",
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
      skypeInviteUrl: "",
      websiteUrl: "",
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
    methods.setValue("chosenPhysicalCard", selectedPhysicalCardId);

    methods.setValue("email", user?.email || "");
  }, [
    coverPhotoUrl,
    imageUrl,
    serviceImageUrls,
    selectedTemplateId,
    selectedPhysicalCardId,
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
        },
      },
    });
  };

  const isLoading = isLoadingCreateCard || isLoadingOnBoarding;

  return (
    <main className="flex flex-col overflow-auto py-8 px-6 sm:px-0 bg-background h-full">
      <div className="w-full mx-auto max-w-sm">
        <TapupLogo className="mx-auto mb-4" />
        <Form {...methods}>
          <form
            className="space-y-6"
            onSubmit={methods.handleSubmit(formSubmit)}
          >
            <div className="">
              <p className="text-lg font-semibold mb-6">
                Cover Photo and Profile Pic Upload Section
              </p>
              <div className="flex aspect-[16/9] w-full flex-col items-center relative mb-20">
                <div className="rounded-lg animate-pulse bg-[#222224] absolute w-full h-full" />
                <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full bg-[#222224] absolute bottom-[-35%] left-1/2 transform -translate-x-1/2" />
                <div className="flex flex-col items-center relative w-full">
                  <div className="w-full">
                    <Cropper
                      imageUrl={coverPhotoUrl}
                      setImageUrl={setCoverPhotoUrl}
                      photo={coverPhoto}
                      aspect={16 / 9}
                      setPhoto={setCoverPhoto}
                      className="w-full aspect-[16/9] rounded-2xl overflow-hidden"
                      imageClassName="rounded-2xl"
                      fallback={
                        <div className="w-full aspect-[16/9] flex flex-col items-center gap-y-2 bg-[#222224]">
                          <Image
                            unoptimized={true}
                            src={"/assets/plus.svg"}
                            width={50}
                            height={50}
                            alt="plus"
                            className="size-10 lg:size-auto mt-8"
                          />
                          <p className="text-[#767676] text-sm">
                            Upload a Cover Photo
                          </p>
                        </div>
                      }
                    />

                    <div className="absolute bottom-[-35%] left-1/2 transform -translate-x-1/2  ">
                      <Cropper
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                        photo={photo}
                        aspect={1}
                        setPhoto={setPhoto}
                        circularCrop
                        className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full"
                        fallback={
                          <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[#222224]">
                            <Image
                              unoptimized={true}
                              src={"/assets/gallery.svg"}
                              width={50}
                              height={50}
                              className="size-8 lg:size-auto"
                              alt="gallery"
                            />
                            <div className="absolute bottom-0 right-0 bg-[#222224] rounded-full">
                              <Image
                                unoptimized={true}
                                src={"/assets/plus-dark.svg"}
                                width={50}
                                height={50}
                                alt="plus-dark"
                                className="size-10 lg:size-auto"
                              />
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-sm text-red-500">
              {methods.formState.errors.profilePictureUrl?.message ?? ""}
            </span>
            {/* Company Information Inputs */}
            <div className="space-y-6">
              <CompanyInfoForm control={methods.control} />
              <div className="">
                <h1 className="text-lg font-semibold mt-2">
                  Add Photo For Services: (Optional)
                </h1>
                <div className="flex flex-col p-4 items-center justify-center overflow-hidden rounded-2xl bg-[#222224] mt-4 border border-[#2c2c2c]">
                  <div
                    className="flex image-preview text-[#767676] rounded-2xl w-full min-h-48 p-2 gap-2 flex-wrap"
                    style={{
                      alignItems:
                        serviceImageUrls.length > 0 ? "flex-start" : "center",
                    }}
                  >
                    <div
                      className="flex justify-center text-[#767676] rounded-2xl w-full min-h-48 p-2 gap-2 flex-wrap"
                      style={{
                        alignItems:
                          serviceImageUrls.length > 0 ? "flex-start" : "center",
                      }}
                    >
                      <div
                        className="gap-1 grid-cols-3 lg:grid-cols-4"
                        style={{
                          display:
                            serviceImageUrls.length > 0 ? "grid" : "flex",
                        }}
                      >
                        {serviceImageUrls.length === 0 ? (
                          <div className="w-full flex items-center justify-center">
                            <Cropper
                              imageUrl={null}
                              photo={null}
                              aspect={1}
                              setImageUrl={addServiceImageUrl}
                              setPhoto={addServicePhoto}
                              className="w-[128px] h-[128px] rounded-md"
                              disablePreview // only shows the fallback
                              fallback={
                                <div className="relative w-full h-full flex items-center justify-center bg-[#222224] rounded-md">
                                  <Image
                                    unoptimized={true}
                                    src={"/assets/gallery.svg"}
                                    width={50}
                                    height={50}
                                    alt="gallery"
                                  />
                                  <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/4 bg-[#222224] rounded-full">
                                    <Image
                                      unoptimized={true}
                                      src={"/assets/plus-dark.svg"}
                                      width={50}
                                      height={50}
                                      alt="plus-dark"
                                    />
                                  </div>
                                </div>
                              }
                            />
                          </div>
                        ) : (
                          <>
                            {serviceImageUrls.map((url, key) => {
                              return (
                                <div
                                  key={`index-${key}`}
                                  className="flex items-center justify-center rounded-md h-[77px] w-[77px] overflow-hidden relative bg-[#222224] border border-[#2c2c2c]"
                                >
                                  <div
                                    className="absolute flex items-center justify-center top-1 right-1 h-4 rounded-full w-4 bg-gray-900 z-[100] cursor-pointer"
                                    onClick={() =>
                                      setServiceImageUrls((prev) =>
                                        prev.filter((_, index) => index !== key)
                                      )
                                    }
                                  >
                                    <IoMdClose className="size-2" />
                                  </div>
                                  <Loader2 className="animate-spin" />
                                  <ImageLoaded
                                    className="rounded-md absolute top-0 left-0"
                                    url={url}
                                  />
                                </div>
                              );
                            })}
                            <div className="flex items-center justify-center">
                              <Cropper
                                imageUrl={null}
                                photo={null}
                                aspect={1}
                                setImageUrl={addServiceImageUrl}
                                setPhoto={addServicePhoto}
                                className="w-[77px] h-[77px] rounded-md"
                                disablePreview // only shows the fallback
                                fallback={
                                  <div className="relative w-full h-full flex items-center justify-center bg-[#222224] rounded-md">
                                    <Image
                                      unoptimized={true}
                                      src={"/assets/gallery.svg"}
                                      width={20}
                                      height={20}
                                      alt="gallery"
                                    />
                                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/4 bg-[#222224] rounded-full">
                                      <Image
                                        unoptimized={true}
                                        src={"/assets/plus-dark.svg"}
                                        width={30}
                                        height={30}
                                        alt="plus-dark"
                                      />
                                    </div>
                                  </div>
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TemplateCarousel
                selectedTemplateId={selectedTemplateId}
                setSelectedTemplateId={setSelectedTemplateId}
              />{" "}
              <PersonalInfoForm control={methods.control} isCard={isCard} />
              <SocialLinksForm control={methods.control} />
            </div>

            {/* Physical Cards Section */}
            {/* <div className="flex-grow flex flex-col"> */}
            {/* Title */}
            {/* <h1 className="text-2xl font-medium text-center my-8 mx-auto">
    Pick your physical card
  </h1> */}

            {/* Cards Grid */}

            {/* <div className="flex-grow flex flex-col space-y-6">
    <div className="flex-grow flex items-center justify-center mx-6 md:mx-0">
      {selectedPhysicalCardId ? (
        <SelectedPhysicalCard
          cardId={selectedPhysicalCardId}
          formData={methods.watch()}
        />
      ) : (
        <h1 className="text-black">Select a card</h1>
      )}
    </div>
    <div className="h-20 md:h-24 ">
      <PhysicalCardCarousel
        selectedCardId={selectedPhysicalCardId}
        setSelectedCardId={setSelectedPhysicalCardId}
      />
    </div>
  </div> */}
            {/* </div> */}
            <button
              type="submit"
              className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed text-offWhiteTemplate"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="w-full flex items-center justify-center">
                  <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </Form>
      </div>
    </main>
  );
}
