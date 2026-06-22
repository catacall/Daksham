"use client";

import { ReactNode } from "react";

import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import ChatbotDrawer from "@/components/ChatbotDrawer";

interface Props {
  children: ReactNode;
}

export default function ClientShell({ children }: Props) {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1">{children}</div>

        <Footer />
      </main>

      <EnquiryModal />
      <ChatbotDrawer />
    </>
  );
}
