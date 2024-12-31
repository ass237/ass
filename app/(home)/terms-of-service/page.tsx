import Footer from '@/components/homeComp/Footer'
import Navbar from '@/components/homeComp/Navbar'
import React from 'react'

const TermsOfServicePage: React.FC = () => {
  return (
    <div>
      <Navbar/>
    <section className="container mx-auto px-4 py-16 sm:px-6 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-red-600 sm:text-4xl md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-gray-700 sm:text-lg">Last Updated: November 2024</p>
      </div>

      <div className="space-y-8 text-lg text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">1. Acceptance of Terms</h2>
          <p>
            By using the ASS - Accès Sang Sécurisé platform (the Service), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">2. Changes to the Terms</h2>
          <p>
            We reserve the right to modify or update these Terms of Service at any time. Any changes will be effective immediately upon posting on this page. You are encouraged to review these Terms periodically to stay informed about any updates. Your continued use of the Service after such changes will constitute your acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">3. User Responsibilities</h2>
          <p>
            You agree to use the Service in accordance with all applicable laws and regulations. Specifically, you agree that you will not:
          </p>
          <ul className="list-disc pl-6">
            <li>Use the Service for any unlawful purpose.</li>
            <li>Attempt to interfere with or disrupt the operation of the Service.</li>
            <li>Post or share false, misleading, or harmful information.</li>
            <li>Violate any privacy rights or terms of other users or third parties.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">4. Registration and Account</h2>
          <p>
            To use certain features of the Service, such as making donations, accessing educational content, or managing your profile, you may need to create an account. By creating an account, you agree to:
          </p>
          <ul className="list-disc pl-6">
            <li>Provide accurate and complete information during registration.</li>
            <li>Maintain the confidentiality of your login credentials and be responsible for all activities under your account.</li>
            <li>Notify us immediately of any unauthorized access or suspicious activity related to your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">5. Donation Policy</h2>
          <p>
            As part of the Service, users may be able to donate blood. You acknowledge and agree to the following terms regarding blood donations:
          </p>
          <ul className="list-disc pl-6">
            <li>Blood donations are voluntary and must be done in accordance with medical guidelines.</li>
            <li>You must meet the health and eligibility requirements to donate blood as determined by the blood banks listed on our platform.</li>
            <li>ASS - Accès Sang Sécurisé is not responsible for any complications that may arise from the donation process.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">6. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Please refer to our <a href="/privacy-policy" className="text-red-600 hover:underline">Privacy Policy</a> for details on how we collect, use, and protect your personal information. By using the Service, you consent to the collection and processing of your data as described in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">7. Intellectual Property</h2>
          <p>
            All content, logos, trademarks, and other materials available on the Service are the property of ASS - Accès Sang Sécurisé or its licensors. You agree not to copy, reproduce, distribute, or create derivative works from any of this content without express permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ASS - Accès Sang Sécurisé shall not be held liable for any damages or losses arising from:
          </p>
          <ul className="list-disc pl-6">
            <li>The use or inability to use the Service.</li>
            <li>Errors, interruptions, or delays in the Service.</li>
            <li>Any interactions with other users or third parties.</li>
          </ul>
          <p>
            We make no guarantees regarding the accuracy or reliability of information provided on the platform. You acknowledge that using the Service is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">9. Termination of Service</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Service if you violate these Terms of Service, engage in illegal activities, or otherwise misuse the platform. Termination will not affect any rights or obligations that have accrued prior to termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">10. Third-Party Links and Services</h2>
          <p>
            The Service may contain links to third-party websites or services that are not owned or controlled by ASS - Accès Sang Sécurisé. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">11. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ASS - Accès Sang Sécurisé operates. Any disputes arising from or relating to these terms will be subject to the exclusive jurisdiction of the courts located in that jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">12. Contact Us</h2>
          <p>
            If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:support@acces-sang-secure.com" className="text-red-600 hover:underline">support@acces-sang-secure.com</a>
          </p>
          <p>
            Phone: +123 456 7890
          </p>
          <p>
            Address: 123 Blood Drive Avenue, City, Country
          </p>
        </section>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default TermsOfServicePage
