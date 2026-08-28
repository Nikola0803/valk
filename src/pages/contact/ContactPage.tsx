import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import FooterSection from "@/pages/home/components/FooterSection";
import ContactHero from "@/pages/contact/components/ContactHero";
import ContactSidebar from "@/pages/contact/components/ContactSidebar";
import ContactForm from "@/pages/contact/components/ContactForm";

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7f5" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div style={{ paddingTop: 64 }}>
        <ContactHero />

        <div className="py-16 px-8">
          <div className="max-w-[1320px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "#e0e0e0" }}>
              <ContactSidebar />
              <ContactForm />
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
