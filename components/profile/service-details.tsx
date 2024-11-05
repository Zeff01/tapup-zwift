interface ServiceProp {
  service: {
    title: string;
    description: string;
  };
}

const ServiceDetails: React.FC<ServiceProp> = ({ service }) => {
  return (
    <section className="p-0 max-w-[300px] mx-auto">
      <h2 className="text-base font-semibold text-center pb-4">
        {service.title || " "}
      </h2>
      <p className="text-justify text-sm px-4">{service.description}</p>
    </section>
  );
};

export default ServiceDetails;
