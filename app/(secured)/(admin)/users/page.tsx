"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const users = await getAllUsers();
      const allUsers = JSON.parse(JSON.stringify(users));

      setData(allUsers);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <main className="flex h-full bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <TableComponent users={data} isLoading={isLoading} />
    </main>
  );
}
