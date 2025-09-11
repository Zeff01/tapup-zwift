import PhysicalCard from "../physicalCard/PhysicalCard";

import frontImageEclipse from "@/public/assets/cards/Eclipse-front.png";
import frontImageAurora from "@/public/assets/cards/Aurora-front.png";
import frontImageViper from "@/public/assets/cards/Viper-Front.png";
import frontImageVortex from "@/public/assets/cards/Vortex-front.png";
import frontImageBloom from "@/public/assets/cards/Bloom-front.png";

import backImageEclipse from "@/public/assets/cards/Eclipse-back.png";
import backImageAurora from "@/public/assets/cards/Aurora-back.png";
import backImageViper from "@/public/assets/cards/Viper-back.png";
import backImageVortex from "@/public/assets/cards/Vortex-back.png";
import backImageBloom from "@/public/assets/cards/Bloom-back.png";

import { PhysicalCardProps } from "@/types/types";

// Define the valid cardIds
const SelectedPhysicalCard = ({
  cardId,
  formData,
}: {
  cardId: keyof typeof renderPhysicalCard; // Restrict cardId to valid keys
  formData: Partial<PhysicalCardProps>;
}) => {
  const renderPhysicalCard = {
    eclipse: { front: frontImageEclipse, back: backImageEclipse },
    aurora: { front: frontImageAurora, back: backImageAurora },
    viper: { front: frontImageViper, back: backImageViper },
    vortex: { front: frontImageVortex, back: backImageVortex },
    bloom: { front: frontImageBloom, back: backImageBloom },
  };

  // Check if cardId is valid
  if (!(cardId in renderPhysicalCard)) {
    return <div>Invalid card</div>;
  }

  // Get the background images for the selected card
  const { front: frontBackgroundImage, back: backBackgroundImage } =
    renderPhysicalCard[cardId];

  return (
    <PhysicalCard
      {...(formData as PhysicalCardProps)}
      frontBackgroundImage={frontBackgroundImage}
      backBackgroundImage={backBackgroundImage}
    />
  );
};

export default SelectedPhysicalCard;
