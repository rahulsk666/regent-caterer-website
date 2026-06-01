import ContactForm from "@/components/ContactForm";
import ContactInfoCard from "@/components/ContactInfoCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const ContactPage = () => {
  return (
    <div className="flex-1 space-y-4">
      {/* Page Header */}
      <Navbar />
      {/* Main Content */}
      <section
        id="contactPage"
        className="container-app min-h-[150vh] pb-24 flex-1"
      >
        <div className="text-center lg:mb-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We&apos;d love to hear from you! Reach out through any of the
            channels below.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ContactForm />
          {/* Contact Info Sidebar */}
          <ContactInfoCard />
        </div>
      </section>

      <Footer />
      {/* <WhatsAppFloating /> */}
    </div>
  );
};

export default ContactPage;
