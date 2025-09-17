"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editCardSchema } from "@/lib/zod-schema";
import { TemplateGrid } from "@/components/TemplateGrid";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm";
import ImageLoaded from "@/components/ImageLoaded";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "@/providers/user-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MultiStepProgress from "./MultiStepProgress";
import TapupLogo from "../svgs/TapupLogo";
import { formHeaderItems } from "@/constants";
import SocialLinksSelector from "./SocialLink";
import { Input } from "../ui/input";
import SelectedTemplate from "./SelectedTemplate";
import SelectedPhysicalCard from "./SelectedPhysicalCard";
import { ArrowLeft, ArrowRight, Save, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhysicalCardCarousel } from "../PhysicalCardCarousel";
import { LoaderCircle } from "lucide-react";
import { Photo } from "@/types/types";
import Cropper from "../Cropper";
import { toast } from "sonner";
import LivePreviewSidebar from "./LivePreviewSidebar";
import { FormField, FormLabel, FormControl } from "@/components/ui/form";
import { useRouter } from "next/navigation";

export type ChosenTemplateType =
    | "template1"
    | "template2"
    | "template3"
    | "template5"
    | "template7"
    | "template8"
    | "template9"
    | "template10"
    | "template11"
    | "template12"
    | "template13"
    | "template14"
    | "template15"
    | "template16"
    | "template17"
    | "template18";

export type ChosenPhysicalCardType =
    | "eclipse"
    | "aurora"
    | "viper"
    | "vortex"
    | "bloom";

interface SelectedLink {
    label: string;
    key: keyof z.infer<typeof editCardSchema>;
    value: string;
}

interface PreviewCreateFormProps {
    userData: any;
    isPreview?: boolean;
}

const PreviewCreateForm = ({
    userData,
    isPreview = false,
}: PreviewCreateFormProps) => {
    const queryClient = useQueryClient();
    const { user } = useUserContext();

    const [photo, setPhoto] = useState<Photo | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(
        userData.profilePictureUrl || null
    );

    const [coverPhoto, setCoverPhoto] = useState<Photo | null>(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(
        userData.coverPhotoUrl || null
    );

    // State for multiple companies with all schema fields
    const [companies, setCompanies] = useState<
        Array<{
            company: string;
            position?: string;
            companyBackground?: string;
            serviceDescription?: string;
            servicePhotos?: string[];
        }>
    >(() => {
        if (
            userData &&
            Array.isArray((userData as any).companies) &&
            (userData as any).companies.length > 0
        ) {
            return (userData as any).companies.map((company: any) => ({
                company: company.company || "",
                position: company.position || "",
                companyBackground: company.companyBackground || "",
                serviceDescription: company.serviceDescription || "",
                servicePhotos: company.servicePhotos || [],
            }));
        } else {
            return [];
        }
    });

    const [servicePhotoPreviews, setServicePhotoPreviews] = useState<string[][]>(
        []
    );
    const [servicePhotoFiles, setServicePhotoFiles] = useState<any[][]>([]);

    useEffect(() => {
        if (servicePhotoPreviews.length !== companies.length) {
            setServicePhotoPreviews(Array(companies.length).fill([]));
        }
        if (servicePhotoFiles.length !== companies.length) {
            setServicePhotoFiles(Array(companies.length).fill([]));
        }
    }, [companies.length]);

    useEffect(() => {
        methods.setValue("companies", companies);
    }, [companies]);

    const [servicePhotos, setServicePhotos] = useState<Photo[]>([]);
    const [serviceImageUrls, setServiceImageUrls] = useState<string[]>(
        userData.servicePhotos || []
    );

    const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>(() => {
        const existingSocialLinks: SelectedLink[] = [];

        const socialFields: {
            key: keyof z.infer<typeof editCardSchema>;
            label: string;
        }[] = [
                { key: "facebookUrl", label: "Facebook" },
                { key: "youtubeUrl", label: "YouTube" },
                { key: "instagramUrl", label: "Instagram" },
                { key: "twitterUrl", label: "X (Twitter)" },
                { key: "linkedinUrl", label: "LinkedIn" },
                { key: "tiktokUrl", label: "TikTok" },
                { key: "viberUrl", label: "Viber" },
                { key: "whatsappNumber", label: "WhatsApp" },
                { key: "websiteUrl", label: "Website" },
            ];

        socialFields.forEach((field) => {
            const value = userData[field.key as keyof typeof userData] as string;
            if (value && value !== "") {
                existingSocialLinks.push({
                    label: field.label,
                    key: field.key,
                    value: value,
                });
            }
        });

        return existingSocialLinks;
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [previewMinimized, setPreviewMinimized] = useState(false);

    // Steps definition based on current form arrangement:
    // Step 1: Profile Photo, Cover Photo, Company Info
    // Step 2: Company Info (multiple with service photos), Personal Info, Social Links
    // Step 3: Custom URL, Card Name, Template Selection

    const steps: Array<Array<keyof z.infer<typeof editCardSchema>>> = [
        [
            // Step 1: Profile Photo, Cover Photo
            "profilePictureUrl",
            "coverPhotoUrl",
        ],
        [
            // Step 2: Companies, Personal Info, Social Links
            "companies",
            "firstName",
            "lastName",
            "email",
            "number",
            ...selectedLinks.map((link) => link.key),
        ],
        [
            // Step 3: Custom URL, Card Name, Template Selection
            "customUrl",
            "cardName",
            "chosenTemplate",
            "chosenPhysicalCard",
        ],
    ];

    const [selectedTemplateId, setSelectedTemplateId] =
        useState<ChosenTemplateType>(
            (userData.chosenTemplate as ChosenTemplateType) ?? "template1"
        );

    const [selectedPhysicalCardId, setSelectedPhysicalCardId] =
        useState<ChosenPhysicalCardType>(
            (userData.chosenPhysicalCard as ChosenPhysicalCardType) ?? "eclipse"
        );

    const router = useRouter();
    const methods = useForm<z.infer<typeof editCardSchema>>({
        resolver: isPreview ? undefined : zodResolver(editCardSchema),
        defaultValues: {
            coverPhotoUrl: userData.coverPhotoUrl || "",
            profilePictureUrl: userData.profilePictureUrl || "",
            position: userData.position || "",
            companies: userData.companies || [],
            company: userData.company || "",
            companyBackground: userData.companyBackground || "",
            serviceDescription: userData.serviceDescription || "",
            servicePhotos: userData.servicePhotos || [],
            chosenTemplate:
                (userData.chosenTemplate as ChosenTemplateType) ?? "template1",
            chosenPhysicalCard:
                typeof userData.chosenPhysicalCard === "object"
                    ? ((userData.chosenPhysicalCard?.id as ChosenPhysicalCardType) ??
                        "eclipse")
                    : ((userData.chosenPhysicalCard as ChosenPhysicalCardType) ??
                        "eclipse"),
            customUrl: userData.customUrl || "",
            cardName: userData.cardName || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            number: userData.number || "",
            prefix: userData.prefix || "",
            suffix: userData.suffix || "",
            middleName: userData.middleName || "",
            facebookUrl: userData.facebookUrl || "",
            youtubeUrl: userData.youtubeUrl || "",
            instagramUrl: userData.instagramUrl || "",
            twitterUrl: userData.twitterUrl || "",
            linkedinUrl: userData.linkedinUrl || "",
            whatsappNumber: userData.whatsappNumber || "",
            websiteUrl: userData.websiteUrl || "",
            viberUrl: userData.viberUrl || "",
            tiktokUrl: userData.tiktokUrl || "",
        },
    });

    // Sync companies state with form value "companies"
    useEffect(() => {
        methods.setValue("companies", companies);
    }, [companies, methods]);

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

    const formSubmit = async (data: z.infer<typeof editCardSchema>) => {
        if (isPreview) {
            // For preview, save the form data to localStorage and redirect
            console.log("Preview data:", data);
            
            // Prepare the preview data with all form values
            const previewData = {
                ...data,
                profilePictureUrl: imageUrl || "",
                coverPhotoUrl: coverPhotoUrl || "",
                companies: companies,
                selectedLinks: selectedLinks,
                createdAt: new Date().toISOString()
            };
            
            // Store in localStorage
            localStorage.setItem('tapup-preview-data', JSON.stringify(previewData));
            
            const templateMap: { [key: string]: number } = {
                "template1": 0, "template2": 1, "template3": 2, "template5": 4,
                "template7": 6, "template8": 7, "template9": 8, "template10": 9,
                "template11": 10, "template12": 11, "template13": 12, "template14": 13,
                "template15": 14, "template16": 15, "template17": 16, "template18": 17
            };
            const templateIndex = templateMap[selectedTemplateId] ?? 0;
            router.push(`/how-to-get-started?template=${templateIndex}`);
            return;
        }
        // Original save logic would go here, but since it's preview, we skip
    };

    const isLoading = false; // No loading for preview

    const handleNextStep = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("handleNextStep");

        // Mark current step as completed
        setCompletedSteps((prev) => [
            ...prev.filter((s) => s !== currentStep),
            currentStep,
        ]);

        // Move to next step without validation
        setCurrentStep((prev) => prev + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleStepNavigation = (step: number) => {
        // Allow navigation to any step
        setCurrentStep(step);
    };

    const handleAddLink = (link: {
        label: string;
        key: keyof z.infer<typeof editCardSchema>;
        value: string;
    }) => {
        setSelectedLinks((prev) => [
            ...prev,
            { label: link.label, key: link.key, value: link.value },
        ]);
        // Initialize form value for new link
        methods.setValue(link.key, link.value);
    };

    const handleRemoveLink = (linkKey: keyof z.infer<typeof editCardSchema>) => {
        setSelectedLinks((prev) => prev.filter((link) => link.key !== linkKey));
        methods.setValue(linkKey, "");

        methods.clearErrors(linkKey);
    };

    const handleInputChange = (key: string, value: string) => {
        setSelectedLinks((prev) =>
            prev.map((link) => (link.key === key ? { ...link, value } : link))
        );
        // Update corresponding form field
        methods.setValue(key as keyof z.infer<typeof editCardSchema>, value);
    };

    const selectedLinkKeys = selectedLinks.map((link) => link.key);

    return (
        <main
            className="h-full transition-all duration-300 ease-in-out flex flex-col items-center"
        >
            {/* Preview Mode Banner */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200 w-full" role="alert">
                <p className="font-bold">Preview Mode</p>
                <p>This is just a preview. Changes are not saved.</p>
            </div>
            <Form {...methods}>
                <form
                    className="space-y-6 h-full w-full max-w-6xl"
                    onSubmit={methods.handleSubmit(formSubmit)}
                >
                    <div className="flex flex-col py-8 px-4 sm:px-0 bg-background h-full">
                        <div className="aspect-[130/48] w-80 mx-auto mb-10">
                            <TapupLogo />
                        </div>
                        <div
                            className={`w-full mx-auto transition-all duration-300 ${previewMinimized ? "lg:max-w-4xl" : "lg:max-w-2xl"
                                } max-w-4xl`}
                        >
                            {formHeaderItems.map((item) => (
                                <div key={item.id} className="mb-6">
                                    {currentStep === item.id && (
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {item.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {currentStep === 1 &&
                                                    "Upload your profile and cover photos, and add company information"}
                                                {currentStep === 2 &&
                                                    "Add your personal details and social profiles"}
                                                {currentStep === 3 &&
                                                    "Choose your design and finalize your digital business card"}
                                            </p>
                                            {/* Save Progress Indicator */}
                                            <div className="flex items-center gap-2 text-sm text-green-600">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                Preview mode - changes are not saved
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <MultiStepProgress
                                currentStep={currentStep}
                                completedSteps={completedSteps}
                                onStepClick={handleStepNavigation}
                                allowNavigation={true}
                            />

                            {/* Step 1 - Profile Pic and Cover Photo */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    {/* Profile and Cover Photos - Vertically Aligned */}
                                    <div className="space-y-6">
                                        {/* Profile Photo Section */}
                                        <div>
                                            <h2 className="text-lg font-semibold mb-2">Profile Photo</h2>
                                            <div className="w-full flex justify-center items-center flex-col">
                                                <Cropper
                                                    imageUrl={imageUrl}
                                                    setImageUrl={setImageUrl}
                                                    photo={photo}
                                                    aspect={1}
                                                    setPhoto={setPhoto}
                                                    circularCrop
                                                    className="w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] rounded-full"
                                                    fallback={
                                                        <div className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-dashed">
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
                                        </div>

                                        {/* Cover Photo Section */}
                                        <div>
                                            <h2 className="text-lg font-semibold mb-2">Cover Photo</h2>
                                            <div className="w-full">
                                                <Cropper
                                                    imageUrl={coverPhotoUrl}
                                                    setImageUrl={setCoverPhotoUrl}
                                                    photo={coverPhoto}
                                                    aspect={16 / 9}
                                                    setPhoto={setCoverPhoto}
                                                    className="w-full aspect-[3/1] rounded-xl overflow-hidden border-none "
                                                    imageClassName="rounded-2xl"
                                                    fallback={
                                                        <div className="w-full aspect-[3/1] flex flex-col items-center gap-y-2 rounded-xl border-dashed border-2 border-gray-500">
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

                                    {/* Multiple Companies Section */}
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-semibold mb-2">Companies</h2>
                                        {companies.map((company, idx) => (
                                            <div
                                                key={idx}
                                                className="border rounded-lg p-4 mb-4 bg-secondary"
                                            >
                                                <Input
                                                    placeholder="Company Name"
                                                    value={company.company ?? ""}
                                                    onChange={(e) => {
                                                        const newCompanies = [...companies];
                                                        newCompanies[idx].company = e.target.value;
                                                        setCompanies(newCompanies);
                                                    }}
                                                    className="flex-1 mb-2"
                                                />
                                                <Input
                                                    placeholder="Position"
                                                    value={company.position ?? ""}
                                                    onChange={(e) => {
                                                        const newCompanies = [...companies];
                                                        newCompanies[idx].position = e.target.value;
                                                        setCompanies(newCompanies);
                                                    }}
                                                    className="flex-1 mb-2"
                                                />
                                                <textarea
                                                    placeholder="Company Background"
                                                    value={company.companyBackground ?? ""}
                                                    onChange={(e) => {
                                                        const newCompanies = [...companies];
                                                        newCompanies[idx].companyBackground = e.target.value;
                                                        setCompanies(newCompanies);
                                                    }}
                                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-2 resize-none h-[120px]"
                                                />
                                                <textarea
                                                    placeholder="Service Description"
                                                    value={company.serviceDescription ?? ""}
                                                    onChange={(e) => {
                                                        const newCompanies = [...companies];
                                                        newCompanies[idx].serviceDescription = e.target.value;
                                                        setCompanies(newCompanies);
                                                    }}
                                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-2 resize-none h-[120px]"
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            variant="outline"
                                            type="button"
                                            className="mt-4"
                                            onClick={() => {
                                                setCompanies([
                                                    ...companies,
                                                    {
                                                        company: "",
                                                        position: "",
                                                        companyBackground: "",
                                                        serviceDescription: "",
                                                        servicePhotos: [],
                                                    },
                                                ]);
                                                setServicePhotoPreviews((prev) => [...prev, []]);
                                                setServicePhotoFiles((prev) => [...prev, []]);
                                            }}
                                        >
                                            Add Company
                                        </Button>
                                        <span className="text-xs text-red-500">
                                            {methods.formState.errors.companies?.message ?? ""}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 - Personal Info & Social Links */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <PersonalInfoForm control={methods.control} isCard />

                                    <SocialLinksSelector
                                        onAddLink={handleAddLink}
                                        existingValues={methods.watch()}
                                        selectedLinkKeys={selectedLinkKeys}
                                    />
                                    <div className="mt-2">
                                        {selectedLinks.map((link) => (
                                            <div key={link.key} className="flex flex-col gap-3">
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

                            {/* Step 3 - Template and Physical Card */}
                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-2">
                                            Custom URL (optional)
                                        </h2>

                                        <FormField
                                            control={methods.control}
                                            name={"customUrl"}
                                            render={({ field }) => (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex w-full flex-col">
                                                        <FormControl>
                                                            <Input
                                                                placeholder={"yourname"}
                                                                className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-secondary border border-border-input rounded-md"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Your card will be available at tapup.com/yourname
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={methods.control}
                                        name={"cardName"}
                                        render={({ field }) => (
                                            <div className="flex flex-col gap-2">
                                                <FormLabel className="text-lg font-semibold">
                                                    Card Name
                                                </FormLabel>
                                                <div className="flex w-full flex-col">
                                                    <FormControl>
                                                        <Input
                                                            placeholder={"Enter your card name or tag"}
                                                            className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-secondary border border-border-input rounded-md"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        )}
                                    />

                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-lg font-semibold mb-2">
                                                Choose Your Template
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                Select a design that best represents your professional
                                                style. Use the live preview to see how your information
                                                looks in each template.
                                            </p>

                                        </div>

                                        {/* Template Selection */}
                                        <div>
                                            <TemplateGrid
                                                selectedTemplateId={selectedTemplateId}
                                                setSelectedTemplateId={(id: ChosenTemplateType) => {
                                                    setSelectedTemplateId(id);
                                                    // Auto-update form data
                                                    methods.setValue("chosenTemplate", id);
                                                }}
                                            />
                                        </div>

                                        {/* Sign Up Encouragement */}
                                        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6">
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    🚀 Ready to Create Your Professional Digital Business Card?
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                    Join thousands of professionals who have elevated their networking game with TapUp.
                                                    Sign up now and get your custom digital business card in minutes!
                                                </p>
                                                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                                    <span className="text-xs text-green-600 font-medium">
                                                        ✓ Free to sign up • ✓ No credit card required • ✓ Professional templates
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-8 pt-6 border-t">
                                {/* Step Progress Indicator */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <span>
                                        Step {currentStep} of {steps.length}
                                    </span>
                                    {completedSteps.length > 0 && (
                                        <span className="text-green-600">
                                            • {completedSteps.length} completed
                                        </span>
                                    )}
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push('/')}
                                        disabled={isLoading}
                                        className="flex items-center gap-2"
                                    >
                                        Cancel
                                    </Button>
                                    
                                    {currentStep > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={goToPreviousStep}
                                            disabled={isLoading}
                                            className="flex items-center gap-2"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back
                                        </Button>
                                    )}

                                    {currentStep < steps.length ? (
                                        <Button
                                            type="button"
                                            onClick={handleNextStep}
                                            disabled={isLoading}
                                            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-500"
                                        >
                                            Next
                                            <ArrowRight className="h-4 w-4 text-white" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-500"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <LoaderCircle className="animate-spin h-4 w-4" />
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="h-4 w-4 text-white" />
                                                    See How to Get This Card!
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>

            {/* Live Preview Sidebar */}
            <LivePreviewSidebar
                selectedTemplateId={selectedTemplateId}
                formData={{
                    ...methods.watch(),
                    id: "preview",
                    chosenPhysicalCard: {
                        id: methods.watch().chosenPhysicalCard || "",
                    },
                }}
                isMinimized={previewMinimized}
                onToggleMinimize={() => setPreviewMinimized(!previewMinimized)}
                onTemplateChange={(templateId) => setSelectedTemplateId(templateId)}
            />
        </main>
    );
};

export default PreviewCreateForm;
