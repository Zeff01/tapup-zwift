import { USER_ROLE_ENUMS } from "@/constants";
import { authCurrentUserv2 } from "@/lib/firebase/auth";
import { notFound, redirect } from "next/navigation";
import { getAllCards } from "@/lib/firebase/actions/card.action";
import PrintCardsTable from "./_components/PrintCardsTable";

const PrintCardsPage = async () => {
  const auth = await authCurrentUserv2();
  if (!auth) {
    redirect("/login");
  }

  if (auth?.role !== USER_ROLE_ENUMS.ADMIN) {
    notFound();
  }

  // if (!auth.onboarding) {
  //   redirect("/onboarding");
  // }

  const cards = await getAllCards({ role: auth.role });

  if (!cards)
    return (
      <div className="place-self-center my-auto">
        No lists of cards to display
      </div>
    );

  return <PrintCardsTable cardsData={cards} />;
};

export default PrintCardsPage;
