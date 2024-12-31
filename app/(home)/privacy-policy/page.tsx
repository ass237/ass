import Footer from '@/components/homeComp/Footer'
import Navbar from '@/components/homeComp/Navbar'
import React from 'react'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <Navbar/>

      <section className="container mx-auto px-4 py-16 sm:px-6 md:px-8">

<div className="text-center mb-12">
  <h1 className="text-3xl font-semibold text-red-600 sm:text-4xl md:text-5xl">Privacy Policy</h1>
  <p className="mt-4 text-gray-700 sm:text-lg">Your privacy is important to us. Please read our policy carefully.</p>
</div>

<div className="space-y-8 text-lg text-gray-700">
  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Introduction</h2>
    <p>
      At ASS - Accès Sang Sécurisé, we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit and use our website and services.
    </p>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Information We Collect</h2>
    <p>
      We collect the following types of information:
    </p>
    <ul className="list-disc pl-6">
      <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
      <li><strong>Health and Donation Information:</strong> Information related to your blood donations, such as blood type, donation history, and any health-related data necessary for donation eligibility.</li>
      <li><strong>Usage Data:</strong> Information about how you use our website, such as browsing history, IP address, and other technical data collected through cookies and analytics tools.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">How We Use Your Information</h2>
    <p>
      The information we collect is used for the following purposes:
    </p>
    <ul className="list-disc pl-6">
      <li>To provide and maintain our services.</li>
      <li>To personalize your experience on our platform.</li>
      <li>To communicate with you regarding your blood donation history and related activities.</li>
      <li>To improve our platform, including troubleshooting and optimizing user experience.</li>
      <li>To send you notifications, updates, or promotional content related to blood donation and health awareness.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Data Sharing and Disclosure</h2>
    <p>
      We do not sell, trade, or otherwise transfer your personal data to outside parties except as described below:
    </p>
    <ul className="list-disc pl-6">
      <li><strong>Service Providers:</strong> We may share information with trusted third-party providers who assist us in operating our website and services, subject to confidentiality agreements.</li>
      <li><strong>Legal Compliance:</strong> We may disclose your information if required to do so by law or in response to valid legal processes, such as a court order or subpoena.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Data Security</h2>
    <p>
      We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
    </p>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Your Rights</h2>
    <p>
      You have the following rights regarding your personal data:
    </p>
    <ul className="list-disc pl-6">
      <li><strong>Access:</strong> You can request access to the personal data we hold about you.</li>
      <li><strong>Correction:</strong> You can request that we update or correct any inaccurate or incomplete information.</li>
      <li><strong>Deletion:</strong> You can request that we delete your personal data, subject to legal obligations.</li>
      <li><strong>Opt-out:</strong> You can opt-out of receiving promotional communications from us by following the unsubscribe instructions in the emails we send you.</li>
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Cookies</h2>
    <p>
      We use cookies to enhance your experience on our website. Cookies are small files that are stored on your device. You can control the use of cookies through your browser settings, though doing so may affect your experience on our platform.
    </p>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the “Last Updated” date at the bottom of this page.
    </p>
  </section>

  <section>
    <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">Contact Us</h2>
    <p>
      If you have any questions or concerns about this Privacy Policy, please contact us at:
    </p>
    <p>
      <strong>Email:</strong> privacy@accensangsecure.com<br />
      <strong>Phone:</strong> +123-456-7890<br />
      <strong>Address:</strong> 123 Blood Drive Street, Health City, Country
    </p>
  </section>
</div>
</section>



     <Footer/>
    </div>
    
  )
}

export default PrivacyPolicyPage
