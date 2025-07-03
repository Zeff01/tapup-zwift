import { useDndMonitor, DragOverlay, useDndContext } from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useIsMobile } from "@/hooks/use-mobile";
import DigitalCard from "@/components/DigitalCard";
import DigitalCardOverlay from "./DigitalCardOverlay";
import { Card } from "@/types/types";

interface SortableCardsProps {
    cards: Card[];
    user: any;
    confirm: any;
}

export default function SortableCards({ cards, user, confirm }: SortableCardsProps) {
    const isMobile = useIsMobile();
    const { active } = useDndContext();
    const activeCard = cards.find((card) => card.id === active?.id);

    const SCROLL_THRESHOLD = isMobile ? 130 : 90;
    const SCROLL_AMOUNT = 80;

    useDndMonitor({
        onDragMove(event) {
            const el = document.querySelector(`[data-id="${event.active.id}"]`) as HTMLElement | null;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;


            if (rect.bottom > windowHeight - SCROLL_THRESHOLD) {
                window.scrollBy({ top: SCROLL_AMOUNT });
            } else if (rect.top < SCROLL_THRESHOLD) {
                window.scrollBy({ top: -SCROLL_AMOUNT });
            }
        },
    });

    return (
        <SortableContext
            items={cards.map((c) => c.id as string)}
            strategy={isMobile ? verticalListSortingStrategy : rectSortingStrategy}
        >
            <div
                data-scroll-container
                className="
                    grid justify-center justify-items-center
                    grid-cols-[repeat(auto-fill,minmax(17rem,24rem))]
                    xl:justify-start xl:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
                    gap-4 md:px-2 overflow-y-auto"
            >
                {cards.map((card) => (
                    <DigitalCard key={card.id} user={user} confirm={confirm} card={card} />
                ))}
            </div>

            <DragOverlay
                dropAnimation={{ duration: 250, easing: "ease-out" }}
            >
                {activeCard && <DigitalCardOverlay card={activeCard} />}
            </DragOverlay>
        </SortableContext>
    );
}
