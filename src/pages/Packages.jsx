import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import PackagesSection from "../components/home/PackagesSection";

export default function Packages() {
  return (
    <main>
      <Helmet>
        <title>Packages - Akash Media</title>
      </Helmet>

      <HeaderBanner text="All Packages" />
      <PackagesSection title={false} />
    </main>
  );
}