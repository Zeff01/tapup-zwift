import { Card } from "@/types/types";
import PhysicalCard1 from "@/components/physicalCard/physicalCard1";
import PhysicalCard2 from "@/components/physicalCard/physicalCard2";
import PhysicalCard3 from "@/components/physicalCard/physicalCard3";
import PhysicalCard4 from "@/components/physicalCard/physicalCard4";

const renderPhysicalCard = {
  card1: PhysicalCard1,
  card2: PhysicalCard2,
  card3: PhysicalCard3,
  card4: PhysicalCard4,
} as const;

const SelectedPhysicalCard = ({
  cardId,
  formData,
  isSelected,
}: {
  cardId: keyof typeof renderPhysicalCard;
  formData: Partial<Card>;
  isSelected: boolean;
}) => {
  const Component = renderPhysicalCard[cardId];
  return (
    <div
      className={`${isSelected ? "border-2 border-greenTitle rounded-lg" : ""}`}
    >
      <Component {...formData} />
    </div>
  );
};

export default SelectedPhysicalCard;
