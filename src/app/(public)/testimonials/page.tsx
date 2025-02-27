import Image from "next/image";

const testimonials = [
  {
    name: "Sarah M.",
    title: "Marketing Consultant",
    quote: "Tap Up has transformed my networking! I love the convenience of updating my contact details instantly.",
    image: "/assets/testimonialImg2.png"
  },
  {
    name: "James R.",
    title: "Startup Founder",
    quote: "I no longer worry about running out of business cards. The seamless sharing feature is a game-changer!",
       image: "/assets/testimonialImg.png"
  },
  {
    name: "Lisa T.",
    title: "Sales Executive",
    quote: "The QR code feature makes exchanging contacts so easy. I've received great feedback from my clients!",
     image: "/assets/testimonialImg3.png"
  },
  {
    name: "Michael K.",
    title: "Business Owner",
    quote: "I appreciate the eco-friendly approach of Tap Up. It's helping me reduce waste while maintaining a professional image.",
      image: "/assets/testimonialImg5.jpg "
  }
];

const TestimonialPage = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold mt-6">What Our Users Say</h2>
      <p className="text-placeholder-input dark:text-offWhiteTemplate mt-4">
        Hear from professionals and businesses who have transformed their networking with Tap Up.
      </p>
      
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-md flex flex-col items-center text-center">
            <div className="relative w-[5rem] aspect-square">

            <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover rounded-full mb-4" />
            </div>
            <p className="italic text-lg text-muted-foreground">{testimonial.quote}</p>
            <h3 className="mt-4 font-semibold">{testimonial.name}, {testimonial.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialPage;
