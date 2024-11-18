import { carouselCards } from "@/constants";
import { Users } from "@/src/lib/firebase/store/users.type";

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
  skypeInviteUrl?: string;
  websiteUrl?: string;
};

export interface Card extends Users {
  owner: string;
}

export type Template = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  route: string;
};

export interface CardItem {
  image: string;
  title: string;
  description: string;
  price: number;
}

export type CarouselCardKey = keyof typeof carouselCards;
export type CarouselCard = (typeof carouselCards)[CarouselCardKey];
