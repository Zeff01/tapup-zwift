import DigitalCard from "@/components/DigitalCard";
import { GripHorizontal } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export const SortableCard = ({ card, user, confirm }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full relative"
    >
      <div className="relative w-full">
        <DigitalCard user={user} confirm={confirm} card={card} />
        <div className="absolute top-1 w-full flex justify-center cursor-pointer">
          <GripHorizontal
            {...listeners}
            className="size-12 text-white lg:size-8 opacity-50 hover:opacity-100 transition-opacity duration-150"
          />
        </div>
      </div>
    </div>
  );
};
