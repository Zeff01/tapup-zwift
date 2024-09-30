"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addUser, uploadImage } from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import { Loader2, LoaderCircle } from "lucide-react";
import Cropper from "../../components/Cropper";
import Navbar from "@/components/ui/Navbar";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/utils";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import SocialLinksForm from "@/components/forms/SocialLinkForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import ImageLoaded from "@/components/ImageLoaded";
import { IoMdClose } from "react-icons/io";

export type ChosenTemplateType = z.infer<typeof createPortfolioSchema>["chosenTemplate"];

export default function Create() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<ChosenTemplateType>("template1");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
  }, [coverPhotoUrl, imageUrl, serviceImageUrls, selectedTemplateId, methods]);
  const formSubmit = async (data: z.infer<typeof createPortfolioSchema>) => {
    setLoading(true); // load start

    const userInfo = await addUser({
      ...data,
      printStatus: false,
    });
    setLoading(false); // load ends
    methods.reset();
    if (userInfo) {
      localStorage.setItem("userLink", userInfo.user_link);
      localStorage.setItem("userCode", userInfo.userCode);
      router.push(`/action?userCode=${userInfo.userCode}`);
    } else {
      console.error("userLink is undefined or not valid.");
    }

    localStorage.removeItem("portfolioFormData");
  };

  return (
    <Form {...methods}>
      <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 overflow-x-hidden">
        <div className="w-full max-w-sm ">
          {/* HEADER */}
          <div className="text-center mt-8 mb-16 ">
            <Image
              src="/assets/zwift-logo.png"
              alt="Company Logo"
              width={140}
              height={41}
              priority
              className="mx-auto mb-8"
            />
          </div>
          <form className="space-y-6" onSubmit={methods.handleSubmit(formSubmit)}>
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
                            src={"/assets/plus.svg"}
                            width={50}
                            height={50}
                            alt="plus"
                            className="size-10 lg:size-auto mt-8"
                          />
                          <p className="text-[#767676] text-sm">Upload a Cover Photo</p>
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
                              src={"/assets/gallery.svg"}
                              width={50}
                              height={50}
                              className="size-8 lg:size-auto"
                              alt="gallery"
                            />
                            <div className="absolute bottom-0 right-0 bg-[#222224] rounded-full">
                              <Image
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
                <h1 className="text-lg font-semibold mt-2">Add Photo For Services: (Optional)</h1>
                <div className="flex flex-col p-4 items-center justify-center overflow-hidden rounded-2xl bg-[#222224] mt-4 border border-[#2c2c2c]">
                  <div
                    className="flex image-preview text-[#767676] rounded-2xl w-full min-h-48 p-2 gap-2 flex-wrap"
                    style={{
                      alignItems: serviceImageUrls.length > 0 ? "flex-start" : "center",
                    }}
                  >
                    <div
                      className="flex justify-center text-[#767676] rounded-2xl w-full min-h-48 p-2 gap-2 flex-wrap"
                      style={{
                        alignItems: serviceImageUrls.length > 0 ? "flex-start" : "center",
                      }}
                    >
                      <div
                        className="gap-1 grid-cols-3 lg:grid-cols-4"
                        style={{
                          display: serviceImageUrls.length > 0 ? "grid" : "flex",
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
                                    src={"/assets/gallery.svg"}
                                    width={50}
                                    height={50}
                                    alt="gallery"
                                  />
                                  <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/4 bg-[#222224] rounded-full">
                                    <Image
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
                                      src={"/assets/gallery.svg"}
                                      width={20}
                                      height={20}
                                      alt="gallery"
                                    />
                                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/4 bg-[#222224] rounded-full">
                                      <Image
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
              />

              {/* Personal Information Inputs */}
              <PersonalInfoForm control={methods.control} />

              {/* Social Links Inputs */}
              <SocialLinksForm control={methods.control} />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="w-full flex items-center justify-center">
                  <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </main>
    </Form>
  );
}
