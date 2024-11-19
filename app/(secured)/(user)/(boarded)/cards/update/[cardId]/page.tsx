import Loading from "@/app/loading";
import React, { Suspense } from "react";
import CardUpdateFom from "./_components/card-update-form";

const CardEditPage = ({ params }: { params: { cardId: string } }) => {
  const { cardId } = params;
  return (
    <Suspense key={cardId} fallback={<Loading />}>
      <CardUpdateFom cardId={cardId} />
    </Suspense>
  );
};

export default CardEditPage;
