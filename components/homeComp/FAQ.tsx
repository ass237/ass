type FAQ = {
  question: string;
  answer: string;
};

const FAQ: React.FC<{ faqs: FAQ[], maxDisplay?: number }> = ({ faqs, maxDisplay }) => {
  // Limit the number of FAQs displayed based on the maxDisplay prop
  const limitedFAQs = faqs.slice(0, maxDisplay);

  return (
    <section id="faq" className="py-16">
      <div className="py-16">
        <h1 className="text-center text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mt-4">
          Have questions? We have got answers. Explore the FAQs below.
        </p>
      </div>
      <div className="mt-8 space-y-4 px-4">
        {limitedFAQs.map((faq) => (
          <details key={faq.question} className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5">
              <h2 className="text-lg font-medium text-gray-900">{faq.question}</h2>
              <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
