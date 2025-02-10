const policy = {
  title: "Terms and Conditions",
  description: `
Welcome to TapUp ("we," "our," "us"). These Terms and Conditions govern your use of our website, https://www.tapup.tech/ (the "Site"), and our services. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Site.

To use our Site, you must be at least [Insert Minimum Age] years old. By accessing or using the Site, you represent and warrant that you meet this eligibility requirement. The Site is intended for lawful use only, and you agree to comply with all applicable laws and regulations. You must not engage in any activity that violates the rights of others, harms the Site or its users, or disrupts the functionality of the Site.

All content on the Site, including text, graphics, logos, and software, is the property of TapUp or its licensors and is protected by intellectual property laws. You may not use, reproduce, distribute, or modify any content without our prior written consent. Unauthorized use of the Site or its content may result in legal action.

If you create an account on the Site, you are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to notify us immediately of any unauthorized use of your account or any other security breach. You are solely responsible for all activities that occur under your account.

If you purchase services through the Site, you agree to pay all applicable fees. Payment terms, including refund policies, will be outlined during the checkout process. Please review these terms carefully before completing your purchase. Failure to comply with payment terms may result in the suspension or termination of your access to the services.

To the fullest extent permitted by law, TapUp shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Site or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages. Our liability is limited to the maximum extent permitted by applicable law.

You agree to indemnify and hold TapUp harmless from any claims, damages, or expenses, including reasonable attorneys' fees, arising out of your use of the Site or violation of these Terms. This includes any third-party claims related to your actions or content posted on the Site.

We reserve the right to terminate or suspend your access to the Site at any time, without notice, for any reason, including violation of these Terms. Upon termination, your right to use the Site will immediately cease, and you must discontinue all use of the Site and its content.

These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes arising out of or related to these Terms or your use of the Site will be resolved in the courts of [Insert Jurisdiction]. By using the Site, you consent to the exclusive jurisdiction of these courts.

We may update these Terms from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date. Your continued use of the Site after such changes constitutes your acceptance of the updated Terms.


`,
};

const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold  mt-6 text-center">{policy.title}</h2>
      <p className="text-placeholder-input dark:text-offWhiteTemplate text-justify whitespace-pre-wrap leading-relaxed">
        {policy.description}
      </p>
    </section>
  );
};

export default TermsAndConditions;
