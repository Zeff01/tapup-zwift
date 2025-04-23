import React, { Suspense } from "react";
import DeliveryForm, { Countries } from "./_components/deliver-form";
import { getSubscriptionPlans } from "@/lib/firebase/actions/user.action";

const geonameUsername = process.env.NEXT_PUBLIC_GEONAME_USERNAME || "";

async function getCountriesData(): Promise<unknown> {
  const response = await fetch(
    `http://api.geonames.org/countryInfoJSON?username=${geonameUsername}`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch countries data");
  }

  return response.json();
}

async function CountryFormContent() {
  const [countries, subscriptionPlan] = await Promise.all([
    getCountriesData(),
    getSubscriptionPlans(),
  ]);

  return (
    <DeliveryForm
      subscriptionPlan={subscriptionPlan[0]}
      fetchedCountries={countries as Countries}
    />
  );
}

const DeliveryFormPage = async () => {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Customer Delivery Information
      </h1>
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={"Loading..."}>
          <CountryFormContent />
        </Suspense>
      </div>
    </main>
  );
};

export default DeliveryFormPage;
