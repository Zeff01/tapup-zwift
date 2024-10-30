"use client";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/providers/user-provider";
export default function LogoutButton() {
  const { logOutUser } = useUserContext();
  return <Button onClick={logOutUser}>Logout</Button>;
}
