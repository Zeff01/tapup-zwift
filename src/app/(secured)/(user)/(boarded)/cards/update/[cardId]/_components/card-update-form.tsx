import MultiStepFormUpdate from "@/components/forms/multi-step-form-update";
import { getCardById } from "@/lib/firebase/actions/card.action";
import { catchErrorTyped } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  cardId: string;
};

const CardUpdateFom = async ({ cardId }: Props) => {
  const [err, data] = await catchErrorTyped(getCardById(cardId));

  if (err || !data) notFound();

  const card = JSON.parse(JSON.stringify(data));

  return <MultiStepFormUpdate userData={card} isCard />;
};

export default CardUpdateFom;
