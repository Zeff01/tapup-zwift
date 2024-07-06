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
import { Form, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/utils";
import CustomTextArea from "@/components/CustomTextarea";
import { TemplateCarousel } from "@/components/TemplateCarousel";

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

  const templates = [
    {
      id: 1,
      name: "Default",
      description: "Basic Style",
      imageUrl: "/path/to/default-template.jpg",
    },
    {
      id: 2,
      name: "Minimalist",
      description: "Minimalist Style",
      imageUrl: "/path/to/minimalist-template.jpg",
    },
    {
      id: 3,
      name: "Modern",
      description: "Modern Style",
      imageUrl: "/path/to/modern-template.jpg",
    },
  ];

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
          <div className="text-center mb-6 ">
            <Image
              src="/assets/zwift-logo.png"
              alt="Company Logo"
              width={150}
              height={150}
              priority
              className="mx-auto mb-8"
            />
            <h2 className="text-lg font-semibold mt-2">Company Profile</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Cover Photo Upload Section */}
            <div className="flex flex-col items-center relative">
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
            {/* Profile Picture Upload Section */}
            <div className="flex flex-col items-center"></div>

            {/* Company Information Inputs */}
            <div className="space-y-6">
              <CustomInput
                control={methods.control}
                name="position"
                label="Position"
                placeholder="Enter your position"
                required={true}
              />
              <CustomInput
                control={methods.control}
                name="company"
                label="Company"
                placeholder="Enter your company name"
                required={true}
              />
              <CustomTextArea
                control={methods.control}
                name="companyBackground"
                label="Company Background"
                placeholder="Describe your company background"
                required={true}
              />
              <CustomTextArea
                control={methods.control}
                name="serviceDescription"
                label="Service Description"
                placeholder="Describe the services you offer"
              />

              {/* TODO: Add photo for services */}

              <h1>Add Photo For Services: (Optional)</h1>
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

              {/* TODO: Choose Templates */}
              <h1>Choose Templates</h1>
              <TemplateCarousel />

              {/* Personal Information Inputs */}
              <h1>Personal Information</h1>
              <CustomInput
                control={methods.control}
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                required={true}
              />
              <CustomInput
                control={methods.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                required={true}
              />
              <CustomInput
                control={methods.control}
                name="email"
                label="Email Address"
                placeholder="Enter your email address"
                required={true}
              />
              <CustomInput
                control={methods.control}
                name="number"
                label="Phone Number"
                placeholder="Enter your phone number"
                required={true}
              />

              {/* Social Links Inputs */}
              <h1>Social Links</h1>
              <CustomInput
                control={methods.control}
                name="facebookUrl"
                label="Facebook URL"
                placeholder="Enter your Facebook URL"
              />
              <CustomInput
                control={methods.control}
                name="youtubeUrl"
                label="YouTube URL"
                placeholder="Enter your YouTube URL"
              />
              <CustomInput
                control={methods.control}
                name="instagramUrl"
                label="Instagram URL"
                placeholder="Enter your Instagram URL"
              />
              <CustomInput
                control={methods.control}
                name="twitterUrl"
                label="Twitter URL"
                placeholder="Enter your Twitter URL"
              />
              <CustomInput
                control={methods.control}
                name="linkedinUrl"
                label="LinkedIn URL"
                placeholder="Enter your LinkedIn URL"
              />
              <CustomInput
                control={methods.control}
                name="whatsappUrl"
                label="WhatsApp URL"
                placeholder="Enter your WhatsApp URL"
              />
              <CustomInput
                control={methods.control}
                name="websiteUrl"
                label="Website URL"
                placeholder="Enter your website URL"
              />
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
