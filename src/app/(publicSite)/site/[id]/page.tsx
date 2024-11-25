import Loading from "@/src/app/loading";
import React, { Suspense } from "react";
import UserWebpage from "./_components/User";

const UserMainPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense key={params.id} fallback={<Loading />}>
      <UserWebpage id={params.id} />
    </Suspense>
  );
};

export default UserMainPage;
