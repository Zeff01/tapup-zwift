"use client";
import React from "react";
import { useParams } from "next/navigation";
// Import templates
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
// Continue importing all templates...

// Mapping of templates
const templates = {
  "1": Template1,
  "2": Template2,
  "3": Template3,
  // Continue mapping all templates...
};

function TemplatePage() {
  const params = useParams();
  const TemplateComponent = templates[params.id];

  return (
    <main className=" min-h-screen bg-black overflow-x-hidden flex justify-center items-center mx-auto ">
      {TemplateComponent ? <TemplateComponent /> : <p>Template not found.</p>}
    </main>
  );
}

export default TemplatePage;
