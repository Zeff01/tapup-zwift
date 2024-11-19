import CardsAndUsersFields from "@/components/forms/CardsAndUsersUpdateFields";
import { getCardById } from "@/src/lib/firebase/store/card.action";
import { redirect } from "next/navigation";

type Props = {
  cardId: string;
};

const CardUpdateFom = async ({ cardId }: Props) => {
  const data = await getCardById(cardId);

  if (!data) redirect("/cards");

  const user = JSON.parse(JSON.stringify(data));

  return <CardsAndUsersFields userData={user} isCard />;
};

export default CardUpdateFom;
