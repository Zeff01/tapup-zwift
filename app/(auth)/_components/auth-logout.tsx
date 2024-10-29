"use client";

import { Button } from "@/components/ui/button";
import { signOutHandler } from "@/src/lib/firebase/config/auth";
export default function LogoutButton() {
  return <Button onClick={signOutHandler}>Logout</Button>;
}
