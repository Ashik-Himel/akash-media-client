import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider";
import QuickLinksSection from "../components/home/QuickLinksSection";
import WhatWeProvide from "../components/home/WhatWeProvide";
import PackagesSection from "../components/home/PackagesSection";
import NewConnectionSection from "../components/home/NewConnectionSection";
import FaqSection from "../components/home/FaqSection";
import ContactUsSection from "../components/home/ContactUsSection";
import { useRef } from "react";

export default function Home() {
  const faqRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <main>
      <Helmet>
        <title>Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Akash Media" />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net" />
      </Helmet>

      <HomeSlider />
      <QuickLinksSection faqRef={faqRef} contactRef={contactRef} />
      <WhatWeProvide />
      <PackagesSection />
      <NewConnectionSection mt='mt-12 lg:mt-16' />
      <FaqSection faqRef={faqRef} />
      <ContactUsSection contactRef={contactRef} />
    </main>
  );
}