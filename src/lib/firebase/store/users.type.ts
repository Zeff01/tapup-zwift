export type Users = {
  id?: string;
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
  printStatus: boolean;
  userCode?: string;
  user_link: string;
};

export interface Photo {
  preview: string;
  raw: File;
}
