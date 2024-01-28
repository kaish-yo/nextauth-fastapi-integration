"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function UserAccountNav() {
  return (
    <Button
      onClick={() =>
        signOut({
          // The page that you want to redirect to after a user signs out
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant={"destructive"}
    >
      Sign out
    </Button>
  );
}
