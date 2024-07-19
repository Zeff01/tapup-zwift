"use client";
import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
import UpdateComponent from "./UpdateComponent";
import { useEffect, useState } from "react";
import { Users } from "@/src/lib/firebase/store/users.type";
import Loading from "./loading";

export default function UpdatePage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      setLoading(true);
      const getUser = await getUserBySubId(params.id);
      setUserData(getUser);
      setLoading(false);
    })();
  }, []);

  if (!userData || loading) return <Loading />;

  return <UpdateComponent userData={userData} />;
}
