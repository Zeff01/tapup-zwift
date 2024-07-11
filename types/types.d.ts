export type UserProfile = {
  coverPhotoUrl?: string;
  profilePictureUrl: string;
  position: string;
  company: string;
  companyBackground?: string;
  serviceDescription?: string;
  servicePhotos?: string[];
  chosenTemplate: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
  skypeNumber?: string;
  websiteUrl?: string;
};

export type Template = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  route: string;
};
