"use client";
import React from "react";
import { useParams } from "next/navigation";
// Import templates
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
// Continue importing all templates...

interface templateType {
  [key: string]: any;
}

// Mapping of templates
const templates: templateType = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
  // Continue mapping all templates...
};

function TemplatePage() {
  const params = useParams();
  const TemplateComponent = templates[`${params.id}`];

  return (
    <main className=" min-h-screen bg-black overflow-x-hidden flex justify-center items-center mx-auto ">
      {TemplateComponent ? <TemplateComponent /> : <p>Template not found.</p>}
    </main>
  );
}

export default TemplatePage;
