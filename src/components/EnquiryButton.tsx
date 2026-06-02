"use client";

import { MessageSquare } from "lucide-react";

interface EnquiryButtonProps {
  projectTitle: string;
  className?: string;
  label?: string;
}

export default function EnquiryButton({
  projectTitle,
  className = "",
  label = "Request Details",
}: EnquiryButtonProps) {
  const handleClick = () => {
    const event = new CustomEvent("open-enquiry-modal", {
      detail: { project: projectTitle },
    });
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 font-sans font-bold uppercase tracking-wider ${className}`}
    >
      <MessageSquare size={18} />
      {label}
    </button>
  );
}
