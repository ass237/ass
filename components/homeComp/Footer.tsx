import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Define footer links and social links in arrays for easy management
const footerLinks = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
    ],
  },
  {
    title: 'Get Help',
    links: [
      { href: '/education', label: 'EDUCATION' },
      { href: '/faqs', label: 'FAQ' },
      
    ],
  },
  // {
  //   title: 'Language',
  //   links: [
  //     { href: '/?lang=en', label: 'EN' },
  //     { href: '/?lang=fr', label: 'FR' },
  //   ],
  // },
  {
    title: 'Contact Us',
    links: [
      { href: 'ass-project@outlook.com', label: 'Email: info@ass.com' },
      { href: 'tel:+1234567890', label: 'Phone: +123-456-7890' },
    ],
  },
];

// Define social media links
const socialLinks = [
  { href: '#', icon: <FaFacebookF /> },
  { href: '#', icon: <FaTwitter /> },
  { href: '#', icon: <FaInstagram /> },
  { href: '#', icon: <FaLinkedin /> },
];

export default function Footer (){
  return (
    <footer className="bg-black py-16">
     <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          {footerLinks.map(({ title, links }) => (
            <div className="w-full px-4 mb-12" key={title}>
              <h4 className="text-white text-lg font-medium mb-6 relative">
                {title}
                <span className="block absolute bottom-[-10px] left-0 bg-red-600 h-0.5 w-12"></span>
              </h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link text-gray-300 transition duration-300 ease-in-out hover:text-red-600 hover:scale-105">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
         <div className="flex justify-center mt-8">
          <div className="flex space-x-6">
            
            {socialLinks.map(({ href, icon }) => (
              <Link href={href} className="text-white hover:text-red-600 text-2xl transition duration-300 ease-in-out transform hover:scale-125" key={href}>
                {icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
        
          <p className="text-white text-sm">&copy; 2023 ASS - ACCESS SANG SECURE. All rights reserved.</p>
        </div>
      </div> 
      
    </footer>
  );
};

