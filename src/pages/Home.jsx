import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider";
import QuickLinksSection from "../components/home/QuickLinksSection";
import WhatWeProvide from "../components/home/WhatWeProvide";
import PackagesSection from "../components/home/PackagesSection";
import NewConnectionSection from "../components/home/NewConnectionSection";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Akash Media</title>
      </Helmet>

      <HomeSlider />
      <QuickLinksSection />
      <WhatWeProvide />
      <PackagesSection />
      <NewConnectionSection />
    </main>
  );
}