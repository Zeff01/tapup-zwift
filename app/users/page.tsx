"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";
import Navbar from "@/components/ui/Navbar";
import LoadingLogo from "@/components/LoadingLogo";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(JSON.parse(JSON.stringify(fetchedUsers)));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <LoadingLogo />;
  if (users.length === 0) return <div>Empty</div>;

  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <Navbar />
      <TableComponent users={users} />
    </main>
  );
}
