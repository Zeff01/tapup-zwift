import CardsAndUsersFields from "@/components/forms/CardsAndUsersUpdateFields";
import { getCardById } from "@/lib/firebase/actions/card.action";
import { redirect } from "next/navigation";

type Props = {
  cardId: string;
};

const CardUpdateFom = async ({ cardId }: Props) => {
  let user = null;

  try {
    const data = await getCardById(cardId);

    if (!data) {
      redirect("/cards");
    }

    user = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching card data:", error);
    redirect("/cards");
  }

  return <CardsAndUsersFields userData={user} isCard />;
};

export default CardUpdateFom;
