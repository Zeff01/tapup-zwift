const policy = {
  title: "Privacy Policy",
  description: `
Welcome to TapUp (we," "our," "us"). At TapUp, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, https://www.tapup.tech/ (the "Site"), or use our services. By accessing or using our Site, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please refrain from using the Site.

We collect various types of information to provide and improve our services. This includes personal information such as your name, email address, phone number, and payment details, which you provide when using our services. Additionally, we collect usage data, such as your IP address, browser type, pages visited, and device information, to better understand how you interact with the Site. We also use cookies and similar tracking technologies to enhance your experience and analyze Site traffic. These technologies help us personalize content, remember your preferences, and improve the overall functionality of the Site.

The information we collect is used for several purposes. Primarily, it enables us to provide, operate, and maintain our services. We also use your information to improve, personalize, and expand our offerings, ensuring that our services meet your needs. Communication is another key use of your information; we may contact you to respond to inquiries, provide updates, or send transactional confirmations. Additionally, we analyze usage trends to identify areas for improvement and to optimize the performance of the Site.

We do not sell your personal information. However, we may share it with third-party service providers who assist us in operating the Site and delivering our services. These providers are contractually obligated to protect your information and use it solely for the purposes we specify. We may also disclose your information when required by law or to protect our rights, property, or safety. In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.

We take data security seriously and implement reasonable measures to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security. Depending on your location, you may have certain rights regarding your personal information, such as the right to access, update, or delete your data. You may also have the right to opt-out of marketing communications or restrict the processing of your information. To exercise these rights, please contact us using the information provided below.

Our Site may contain links to third-party websites. These links are provided for your convenience, but we are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.

We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date. 
`,
};

const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold  mt-6 text-center">{policy.title}</h2>
      <p className="text-placeholder-input dark:text-offWhiteTemplate text-justify whitespace-pre-wrap leading-relaxed">
        {policy.description}
      </p>
    </section>
  );
};

export default PrivacyPolicy;
