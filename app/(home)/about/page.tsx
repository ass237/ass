import Footer from '@/components/homeComp/Footer'
import Navbar from '@/components/homeComp/Navbar'
import React from 'react'

const AboutPage: React.FC = () => {
  return (
    <div>
    <Navbar/>
    <section className="container mx-auto px-4 py-16 sm:px-6 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-red-600 sm:text-4xl md:text-5xl">About Us</h1>
        <p className="mt-4 text-gray-700 sm:text-lg">Learn more about ASS - Accès Sang Sécurisé</p>
      </div>

      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Our Mission</h2>
          <p>
            At ASS - Accès Sang Sécurisé, our mission is to ensure a constant and safe blood supply for those in need. We connect blood donors, recipients, and blood banks through an easy-to-use platform, simplifying the process of blood donation, request, and distribution. Our aim is to promote health and safety in communities by making blood donation accessible and reliable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">What We Do</h2>
          <p>
            ASS - Accès Sang Sécurisé is a platform designed to:
          </p>
          <ul className="list-disc pl-6">
            <li>Help people locate nearby blood banks and donation centers.</li>
            <li>Provide an easy-to-use blood donation request and tracking system.</li>
            <li>Ensure that donors can find compatible donation matches quickly.</li>
            <li>Offer educational content on the importance of blood donation.</li>
            <li>Enable users to monitor their donation history and stay engaged with the community.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Our Vision</h2>
          <p>
            Our vision is to create a world where no one ever suffers from a lack of blood. By creating a seamless connection between donors and blood banks, we aim to save lives, promote public health, and support the healthcare system in times of need. We envision a safer, more efficient world where blood donation is a routine and life-saving action.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Why Choose Us</h2>
          <p>
            ASS - Accès Sang Sécurisé stands out because:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Reliable Connections:</strong> We connect donors and recipients in real-time, ensuring fast access to blood when needed.</li>
            <li><strong>Secure and Transparent:</strong> Our platform provides transparency and security for both donors and recipients.</li>
            <li><strong>Community-Centered:</strong> We actively engage with local communities and healthcare organizations to make blood donation a regular activity.</li>
            <li><strong>Comprehensive Support:</strong> From helping users find blood banks to providing volunteer opportunities, we offer all the tools necessary for blood donation efforts.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Meet Our Team</h2>
          <p>
            Our dedicated team consists of healthcare professionals, technologists, and volunteers who are committed to improving blood donation efforts. Together, we strive to make a difference in peoples lives by providing access to safe and timely blood transfusions.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <img src="/images/team1.jpg" alt="Team Member 1" className="rounded-full w-32 h-32 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Dr. John Doe</h3>
              <p className="text-gray-500">Chief Medical Officer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/images/team2.jpg" alt="Team Member 2" className="rounded-full w-32 h-32 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-500">Operations Manager</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/images/team3.jpg" alt="Team Member 3" className="rounded-full w-32 h-32 object-cover mb-4" />
              <h3 className="text-xl font-semibold">Michael Johnson</h3>
              <p className="text-gray-500">Tech Lead</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Get Involved</h2>
          <p>
            Join us in our mission to save lives! You can get involved by:
          </p>
          <ul className="list-disc pl-6">
            <li>Becoming a blood donor.</li>
            <li>Volunteering with local blood drives and campaigns.</li>
            <li>Spreading awareness about the importance of blood donation.</li>
          </ul>
          <p className="mt-4">
            For more information on how to get involved, visit our <a href="/volunteer" className="text-red-600 hover:underline">Volunteer Page</a>.
          </p>
        </section>
      </div>
    </section>
    <Footer/>
    </div>
  )
}

export default AboutPage
