import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/Frontend/Navbar";

export const metadata: Metadata = {
  title: "Terms and Conditions | Daksham Developers",
  description: "Terms and Conditions for using the Daksham Developers website.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy mb-8">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg text-muted">
            <p className="mb-6">
              Welcome to Daksham Developers. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing our website, you confirm your acceptance of these Terms and Conditions and agree to comply with them. If you do not agree with any part of these terms, you must not use our website.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">2. Use of Website</h2>
            <p className="mb-6">
              The content provided on this website is for general informational purposes relating to our real estate projects. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">3. Intellectual Property</h2>
            <p className="mb-6">
              All content on this website, including text, graphics, logos, images, and software, is the property of Daksham Developers or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">4. Limitation of Liability</h2>
            <p className="mb-6">
              While we strive to provide accurate and up-to-date information, Daksham Developers makes no warranties or representations regarding the accuracy, completeness, or reliability of any content on this website. We will not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">5. Revisions</h2>
            <p className="mb-6">
              We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the website signifies your acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-10 mb-4">6. Contact Information</h2>
            <p className="mb-6">
              If you have any questions about these Terms and Conditions, please contact us at <strong>info@dakshamdevelopers.com</strong>.
            </p>
          </div>
        </div>
      </main>
      
    </div>
  );
}
