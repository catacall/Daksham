"use client";

import { ReactNode } from "react";

import Navbar from "@/components/Frontend/Navbar";
import Footer from "@/components/Frontend/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import ChatbotDrawer from "@/components/ChatbotDrawer";
import { MessageSquare } from "lucide-react";

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

      {/* Chatbot FAB */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot"))}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-2xl shadow-gold/20 hover:scale-105 hover:bg-[#ffe180] transition-all active:scale-95 cursor-pointer"
        aria-label="Open Chat Assistant"
      >
        <MessageSquare size={26} />
      </button>
    </>
  );
}
