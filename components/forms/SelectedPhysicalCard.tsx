import PhysicalCard1 from "@/components/physicalCard/physicalCard1";
import PhysicalCard2 from "@/components/physicalCard/physicalCard2";
import PhysicalCard3 from "@/components/physicalCard/physicalCard3";
import PhysicalCard4 from "@/components/physicalCard/physicalCard4";

import { Card } from "@/types/types";

const SelectedPhysicalCard = ({
  cardId,
  formData,
}: {
  cardId: keyof typeof renderPhysicalCard; // Restrict cardId to valid keys
  formData: Partial<Card>;
}) => {
  const renderPhysicalCard = {
    card1: <PhysicalCard1 {...(formData as Card)} />,
    card2: <PhysicalCard2 {...(formData as Card)} />,
    card3: <PhysicalCard3 {...(formData as Card)} />,
    card4: <PhysicalCard4 {...(formData as Card)} />,
  };

  return cardId in renderPhysicalCard ? (
    renderPhysicalCard[cardId]
  ) : (
    <div>Invalid card</div>
  );
};

export default SelectedPhysicalCard;
