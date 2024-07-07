"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addUser, uploadImage } from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import { LoaderCircle } from "lucide-react";
import Cropper from "../../components/Cropper";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/ui/Navbar";
import CustomInput from "@/components/CustomInput";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/utils";
import CustomTextArea from "@/components/CustomTextArea";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import SocialLinksForm from "@/components/forms/SocialLinkForm";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";

export default function Create() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imagePickerType, setImagePickerType] = useState<"advanced" | "basic">(
    "advanced"
  );

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
      websiteUrl: "",
    },
  });

  const validateForm = (elements: HTMLFormControlsCollection) => {
    const newErrors: Record<string, string> = {};
    const emailElement = elements.namedItem("email") as HTMLInputElement;
    if (emailElement && !emailElement.value.includes("@")) {
      newErrors.email = 'Email must include an "@" symbol.';
    }
    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("form:", form);
    const errors = validateForm(form.elements);

    setLoading(true); // load start
    const userInfo = await addUser({
      company: form.company.value,
      position: form.position.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phoneNumber: form.number.value,
      image: imageUrl || "",
      printStatus: false,
    });
    console.log(typeof userInfo, userInfo);
    setLoading(false); // load ends
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
    <FormProvider {...methods}>
      <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6  overflow-x-hidden">
        <Navbar />
        <div className="w-full flex flex-row justify-end ">
          <div className="flex flex-col w-[150px] bg-custom-purple p-1 rounded-md">
            <p>Image Picker Type</p>
            <div className="w-full flex flex-row justify-between gap-x-1">
              <p>{imagePickerType}</p>
              <Switch
                checked={Boolean(imagePickerType === "advanced")}
                onCheckedChange={(c) => {
                  if (c) {
                    setImagePickerType("advanced");
                    return;
                  }
                  setImagePickerType("basic");
                }}
              />
            </div>
          </div>
        </div>
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Cover Photo and Profile Pic Upload Section */}
            <div className="flex flex-col items-center relative border-2 border-orange-500 mb-20">
              <div className="w-full h-64">
                <Cropper
                  imageUrl={coverPhotoUrl}
                  setImageUrl={setCoverPhotoUrl}
                  photo={coverPhoto}
                  setPhoto={setCoverPhoto}
                  type="coverPic"
                  changeImage={(img) => console.log("New Cover Image:", img)}
                />
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2  ">
                  <Cropper
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    photo={photo}
                    setPhoto={setPhoto}
                    type="profilePic"
                    changeImage={(img) =>
                      console.log("New Profile Image:", img)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Company Information Inputs */}
            <div className="space-y-6 ">
              <CompanyInfoForm control={methods.control} />

              {/* //TODO: Add photo for services */}
              <div className="border-2 border-yellow-500">
                <h1 className="text-lg font-semibold mt-2">
                  Add Photo For Services: (Optional)
                </h1>
                <div className="flex flex-col items-center">
                  <Cropper
                    imageUrl={coverPhotoUrl}
                    setImageUrl={setCoverPhotoUrl}
                    photo={coverPhoto}
                    setPhoto={setCoverPhoto}
                    type="servicePhoto"
                    changeImage={(img) => console.log("New Cover Image:", img)}
                  />
                </div>
              </div>

              {/* //TODO: Choose Templates */}
              <TemplateCarousel />

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
    </FormProvider>
  );
}
