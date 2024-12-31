
import Footer from "@/components/homeComp/Footer";
import Navbar from "@/components/homeComp/Navbar";
import { faqs as faqData, testimonials as testimonialData, features } from "@/lib/homeData";
import EventCalendar from "@/components/EventCalendar2";
import FAQ from "@/components/homeComp/FAQ";
import Testimonials from "@/components/homeComp/Testimonials";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-red-600 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Join Us in Saving Lives</h1>
          <p className="mt-4 text-lg">Become a blood donor today and help those in need.</p>
          <Link href="/sign-in" className="mt-6 inline-block rounded-lg bg-white text-red-600 px-6 py-3 font-semibold transition duration-300 hover:bg-gray-200">
            Get Involved
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <h2 className="text-center text-3xl font-bold">App Features</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className="py-16 bg-gray-50">
        <EventCalendar />
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqData} maxDisplay={5} />

      {/* Testimonial Section */}
      <Testimonials testimonials={testimonialData} maxDisplay={3} />

      <Footer />
    </div>
  );
};

export default HomePage;
