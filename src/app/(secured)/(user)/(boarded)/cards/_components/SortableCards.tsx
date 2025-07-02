import { useEffect, useRef } from "react";
import { Card } from "@/types/types";
import DigitalCard from "@/components/DigitalCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    useDndContext,
    useDndMonitor,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface SortableCardsProps {
    cards: Card[];
    user: any;
    confirm: any;
    setDragActive: (dragging: boolean) => void;
}

export default function SortableCards({ cards, user, confirm, setDragActive }: SortableCardsProps) {
    const isMobile = useIsMobile();
    const { active } = useDndContext();

    useEffect(() => {
        setDragActive(Boolean(active));
    }, [active, setDragActive]);

    // Manual auto-scroll when dragging near screen edges
    const scrollRef = useRef<{
        frame: number | null;
        direction: "up" | "down" | null;
    }>({ frame: null, direction: null });

    const lastYRef = useRef<number | null>(null);

    const cancelScroll = () => {
        if (scrollRef.current.frame) {
            cancelAnimationFrame(scrollRef.current.frame);
            scrollRef.current.frame = null;
        }
        scrollRef.current.direction = null;
        lastYRef.current = null;
    };

    useDndMonitor({
        onDragMove(event) {
            const node = document.querySelector(`[data-id="${event.active.id}"]`) as HTMLElement | null;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowHeight = window.innerHeight;

            const threshold = 120;
            const maxSpeed = 60;
            const minSpeed = 20;
            const topEdge = threshold;
            const bottomEdge = windowHeight - threshold;

            // Determine movement direction
            const lastY = lastYRef.current;
            let direction: "up" | "down" | null = null;
            if (lastY !== null) {
                const deltaY = centerY - lastY;
                if (Math.abs(deltaY) > 1) {
                    direction = deltaY > 0 ? "down" : "up";
                }
            }
            lastYRef.current = centerY;
            if (!direction) return;

            let distance = 0;
            if (direction === "down" && rect.bottom > bottomEdge) {
                distance = Math.min(rect.bottom - bottomEdge, threshold);
            } else if (direction === "up" && rect.top < topEdge) {
                distance = Math.min(topEdge - rect.top, threshold);
            } else {
                cancelScroll(); // Stop if not near edge
                return;
            }

            const ratio = distance / threshold;
            const eased = ratio * ratio; // quadratic ease
            const amount = minSpeed + (maxSpeed - minSpeed) * eased;

            // If direction changed, cancel existing scroll
            if (scrollRef.current.direction !== direction && scrollRef.current.frame) {
                cancelAnimationFrame(scrollRef.current.frame);
                scrollRef.current.frame = null;
            }

            scrollRef.current.direction = direction;

            if (scrollRef.current.frame) return;

            const scrollLoop = () => {
                const currentY = window.scrollY;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

                if (
                    (direction === "down" && currentY >= maxScroll) ||
                    (direction === "up" && currentY <= 0)
                ) {
                    cancelScroll();
                    return;
                }

                window.scrollBy({ top: direction === "down" ? amount : -amount });
                scrollRef.current.frame = requestAnimationFrame(scrollLoop);
            };

            scrollRef.current.frame = requestAnimationFrame(scrollLoop);
        },

        onDragEnd: cancelScroll,
        onDragCancel: cancelScroll,
    });



    return (
        <SortableContext
            items={cards.map((c) => c.id as string)}
            strategy={isMobile ? verticalListSortingStrategy : rectSortingStrategy}
        >
            <div
                className="
          grid justify-center justify-items-center
          grid-cols-[repeat(auto-fill,minmax(17rem,24rem))]
          xl:justify-start xl:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
          gap-4 md:px-2
        "
            >
                {cards.map((card) => (
                    <DigitalCard
                        key={card.id}
                        user={user}
                        confirm={confirm}
                        card={card}
                    />
                ))}
            </div>
        </SortableContext>
    );
};