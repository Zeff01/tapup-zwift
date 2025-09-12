import { Card } from "@/types/types";
import { carouselCards } from "@/constants";
import { getUserCardOrdering } from "../firebase/actions/user.action";

/**
 * Sort cards based on the cardOrdering field from the user-account document
 */
export async function sortCards(
  cards: Partial<Card>[],
  uid: string
): Promise<Card[]> {
  const ordering = await getUserCardOrdering(uid);

  if (!ordering) {
    return cards.filter((c): c is Card => !!c.id && !!c.owner); // return in original order (typed safely)
  }

  const cardMap = new Map(cards.map((card) => [card.id, card]));
  const sorted = ordering
    .map((id) => cardMap.get(id))
    .filter((card): card is Card => !!card?.id && !!card?.owner);

  const unordered = cards.filter(
    (c): c is Card => !!c.id && !!c.owner && !ordering.includes(c.id)
  );

  return [...sorted, ...unordered];
}

/**
 * Get the card image URL based on card ID
 */
export const getCardImage = (cardId?: string) => {
  const cardItem =
    Object.values(carouselCards).find((item) => item.id === cardId) ??
    carouselCards[cardId as keyof typeof carouselCards];

  return cardItem ? cardItem.image : carouselCards.eclipse.image;
};