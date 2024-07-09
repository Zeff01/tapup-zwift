"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addUser, uploadImage } from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import { LoaderCircle } from "lucide-react";
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

export default function Create() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState("template1");
  console.log("selectedTemplateId:", selectedTemplateId);

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
      whatsappUrl: "",
      skypeUrl: "",
      websiteUrl: "",
    },
  });

  useEffect(() => {
    if (imageUrl) {
      methods.setValue("profilePictureUrl", imageUrl || "");
    }
    if (coverPhotoUrl) {
      methods.setValue("coverPhotoUrl", coverPhotoUrl || "");
    }
    if (serviceImageUrls.length > 0) {
      methods.setValue("servicePhotos", serviceImageUrls || []);
    }
    methods.setValue("chosenTemplate", `${selectedTemplateId}`);
  }, [coverPhotoUrl, imageUrl, serviceImageUrls, selectedTemplateId, methods]);

  // console.log(methods.getValues());
  console.log(methods.formState.errors);

  const formSubmit = async (data: z.infer<typeof createPortfolioSchema>) => {
    console.log("data", data);
    console.log("Form submit called", data);
    setLoading(true); // load start

    console.log("About to call addUser with data:", data);
    const userInfo = await addUser({
      ...data,
      printStatus: false,
    });
    console.log("addUser response:", userInfo);
    setLoading(false); // load ends
    methods.reset();
    if (userInfo) {
      localStorage.setItem("userLink", userInfo.user_link);
      localStorage.setItem("userCode", userInfo.userCode);
      router.push(`/action?userCode=${userInfo.userCode}`);
    } else {
      console.error("userLink is undefined or not valid.");
    }
  };

  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhoto({
        preview: URL.createObjectURL(file),
        raw: file,
      });

      const dl_url = await uploadImage({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      if (dl_url) setImageUrl(dl_url);
    }
  };

  const handleCoverPhotoChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverPhoto({
        preview: URL.createObjectURL(file),
        raw: file,
      });

      const downloadUrl = await uploadImage({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      if (downloadUrl) setCoverPhotoUrl(downloadUrl);
    }
  };

  return (
    <Form {...methods}>
      <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6  overflow-x-hidden">
        <Navbar />
        <div className="w-full max-w-sm ">
          {/* HEADER */}
          <div className="text-center mb-6 ">
            <Image
              src="/assets/zwift-logo.png"
              alt="Company Logo"
              width={150}
              height={150}
              priority
              className="mx-auto mb-8"
            />
          </div>

          <form
            className="space-y-6"
            onSubmit={methods.handleSubmit(formSubmit)}
          >
            Cover Photo and Profile Pic Upload Section
            <div className="flex flex-col items-center relative mb-16">
              <div className="w-full h-64">
                <Cropper
                  imageUrl={coverPhotoUrl}
                  setImageUrl={setCoverPhotoUrl}
                  photo={coverPhoto}
                  aspect={16 / 9}
                  setPhoto={setCoverPhoto}
                  changeImage={(img) => console.log("New Cover Image:", img)}
                  className="w-full aspect-[16/9] rounded-2xl"
                  imageClassName="rounded-2xl"
                  fallback={
                    <div className="w-full aspect-[16/9] flex flex-col items-center justify-center pb-4 gap-y-4 bg-[#222224]">
                      <Image
                        src={"/assets/plus.svg"}
                        width={50}
                        height={50}
                        alt="plus"
                      />
                      <p className="text-[#767676]">Upload a Cover Photo</p>
                    </div>
                  }
                />

                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2  ">
                  <Cropper
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    photo={photo}
                    aspect={1}
                    setPhoto={setPhoto}
                    changeImage={(img) =>
                      console.log("New Profile Image:", img)
                    }
                    circularCrop
                    className="w-[150px] h-[150px] rounded-full"
                    fallback={
                      <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[#222224]">
                        <Image
                          src={"/assets/gallery.svg"}
                          width={50}
                          height={50}
                          alt="gallery"
                        />
                        <div className="absolute bottom-0 right-0 bg-[#222224] rounded-full">
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
              </div>
            </div>
            <span className="text-sm text-red-500">
              {imageUrl
                ? methods.formState.errors.profilePictureUrl?.message ?? ""
                : "Profile Image Required"}
            </span>
            {/* Company Information Inputs */}
            <div className="space-y-6 ">
              <CompanyInfoForm control={methods.control} />

              {/* //TODO: Add photo for services */}
              <div className="border-2 border-yellow-500">
                <h1 className="text-lg font-semibold mt-2">
                  Add Photo For Services: (Optional)
                </h1>
                <div className="flex flex-col items-center gap-y-6">
                  <p className="text-[#767676]">Upload an image</p>
                  <Cropper
                    imageUrl={null}
                    photo={null}
                    aspect={1}
                    setImageUrl={addServiceImageUrl}
                    setPhoto={addServicePhoto}
                    changeImage={(img) => console.log("New Cover Image:", img)}
                    className="w-[128px] h-[128px] rounded-[10px]"
                    disablePreview // only shows the fallback
                    fallback={
                      <div className="relative w-full h-full flex items-center justify-center bg-[#222224]">
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
                  <p className="text-[#767676]">
                    Please select at least 2 images
                  </p>
                  <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                    {serviceImageUrls.map((url) => (
                      <Image
                        key={url}
                        src={url}
                        width={80}
                        height={80}
                        alt="service"
                        className="rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* //TODO: Choose Templates */}
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
