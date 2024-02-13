import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider";
import QuickLinksSection from "../components/home/QuickLinksSection";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Akash Media</title>
      </Helmet>

      <HomeSlider />
      <QuickLinksSection />
    </main>
  );
}