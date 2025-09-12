import PreviewCreateForm from "../../../components/forms/preview-create-form";

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
    chosenTemplate: "template1",
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

export default function PreviewCreatePage() {
    return <PreviewCreateForm userData={dummyUserData} isPreview={true} />;
}
