"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import Hero from "@/components/Hero"

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    // <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
    <main>
      <Hero/>
    </main>
  );
}
