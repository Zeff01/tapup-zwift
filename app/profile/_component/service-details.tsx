interface ServiceProp {
  service: {
    title: string;
    description: string;
  };
}

const ServiceDetails: React.FC<ServiceProp> = ({service}) => {
  return (
    <section className="p-0">
      <h2 className="text-base font-semibold text-center pb-2">{service.title }</h2>
      <p className="text-justify text-xs md:text-base">{service.description}</p>
    </section>
  );
}

export default ServiceDetails;