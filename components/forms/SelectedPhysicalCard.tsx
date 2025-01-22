import PhysicalCard from "../physicalCard/PhysicalCard";

import frontImageCard1 from "@/public/assets/cards/front/card1.png";
import frontImageCard2 from "@/public/assets/cards/front/card2.png";
import frontImageCard3 from "@/public/assets/cards/front/card3.png";
import frontImageCard4 from "@/public/assets/cards/front/card4.png";

import backImageCard1 from "@/public/assets/cards/back/card1.png";
import backImageCard2 from "@/public/assets/cards/back/card2.png";
import backImageCard3 from "@/public/assets/cards/back/card3.png";
import backImageCard4 from "@/public/assets/cards/back/card4.png";

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
    card1: { front: frontImageCard1, back: backImageCard1 },
    card2: { front: frontImageCard2, back: backImageCard2 },
    card3: { front: frontImageCard3, back: backImageCard3 },
    card4: { front: frontImageCard4, back: backImageCard4 },
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
