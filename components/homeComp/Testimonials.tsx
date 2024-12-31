type Testimonial = {
  name: string;
  message: string;
};

const Testimonials: React.FC<{ testimonials: Testimonial[], maxDisplay?: number }> = ({ testimonials, maxDisplay = 5 }) => {
  // Limit the number of testimonials displayed based on the maxDisplay prop
  const limitedTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <h2 className="text-center text-3xl font-bold">What Our Donors Say</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {limitedTestimonials.map((testimonial) => (
          <div key={testimonial.name} className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
            <p className="text-center text-gray-600 italic">{testimonial.message}</p>
            <h3 className="mt-4 text-lg font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
