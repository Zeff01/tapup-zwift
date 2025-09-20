import PreviewCreateForm from "../../../components/forms/preview-create-form";

interface PreviewCreatePageProps {
    searchParams: { template?: string };
}

export default function PreviewCreatePage({ searchParams }: PreviewCreatePageProps) {
    // Map template index to template ID
    const getTemplateId = (templateIndex?: string) => {
        if (!templateIndex) return "template1";
        const index = parseInt(templateIndex, 10);
        if (isNaN(index) || index < 0 || index > 17) return "template1";
        
        // Map index to template ID (some templates are missing in ChosenTemplateType, so we need to map correctly)
        const templateMap: { [key: number]: string } = {
            0: "template1",
            1: "template2", 
            2: "template3",
            3: "template5", // Template4 doesn't exist in ChosenTemplateType, use template5
            4: "template5",
            5: "template7", // Template6 doesn't exist in ChosenTemplateType, use template7  
            6: "template7",
            7: "template8",
            8: "template9",
            9: "template10",
            10: "template11",
            11: "template12",
            12: "template13",
            13: "template14",
            14: "template15",
            15: "template16",
            16: "template17",
            17: "template18",
        };
        
        return templateMap[index] || "template1";
    };

    const dummyUserData = {
        id: "preview",
        profilePictureUrl: "",
        coverPhotoUrl: "",
        position: "",
        companies: [],
        company: "",
        companyBackground: "",
        serviceDescription: "",
        servicePhotos: [],
        chosenTemplate: getTemplateId(searchParams.template),
        chosenPhysicalCard: "eclipse",
        customUrl: "",
        cardName: "",
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        prefix: "",
        suffix: "",
        middleName: "",
        facebookUrl: "",
        youtubeUrl: "",
        instagramUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        whatsappNumber: "",
        websiteUrl: "",
        viberUrl: "",
        tiktokUrl: "",
    };

    return <PreviewCreateForm userData={dummyUserData} isPreview={true} />;
}
