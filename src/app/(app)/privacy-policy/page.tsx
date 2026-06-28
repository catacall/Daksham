import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Frontend/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | Daksham Developers",
  description: "Privacy Policy and data collection guidelines for Daksham Developers.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg text-muted">
            <p className="mb-6">
              At Daksham Developers, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, and share information when you visit our website or interact with our services.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">1. Information We Collect</h2>
            <p className="mb-6">
              We collect personal information that you voluntarily provide to us when you fill out forms on our website, such as our enquiry forms. This may include your name, email address, phone number, project of interest, and any messages you send us. We also collect non-identifiable usage data to improve our website experience.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">2. How We Use Your Data</h2>
            <p className="mb-4">
              We use the data we collect exclusively for authorized and legitimate business purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Responding to your inquiries and providing customer support.</li>
              <li>Sending you relevant information about real estate projects you have expressed interest in.</li>
              <li>Improving our services, website, and customer interactions.</li>
              <li>Complying with legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">3. Sharing with External Parties</h2>
            <p className="mb-6">
              We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted external parties only when necessary to fulfill our authorized services (such as our CRM platform, email delivery services, or legal compliance entities), provided that these parties agree to keep this information confidential and secure.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">5. Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at <strong>info@dakshamdevelopers.com</strong>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
