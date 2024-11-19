import { Suspense } from "react";
import Card from "./_components/card";
import Loading from "./loading";

const CanvasPage = ({ params }: { params: { cardId: string } }) => {
  const { cardId } = params;
  return (
    <Suspense key={cardId} fallback={<Loading />}>
      <Card id={cardId} />
    </Suspense>
  );
};

export default CanvasPage;
