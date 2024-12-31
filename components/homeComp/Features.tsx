type Feature = {
    title: string;
    description: string;
    icon: string;
  };
  
  const Features: React.FC<{ features: Feature[] }> = ({ features }) => {
    return (
      <section id="features" className="py-16">
        <h2 className="text-center text-3xl font-bold">App Features</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;
  