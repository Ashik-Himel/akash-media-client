import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import PackagesSection from "../components/home/PackagesSection";

export default function Packages() {
  return (
    <main>
      <Helmet>
        <title>Packages - Akash Media</title>
        <meta name="description" content="You can enjoy our services by paying a minimum package price. Our packages starts from 200 taka / month only." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Packages - Akash Media" />
        <meta property="og:description" content="You can enjoy our services by paying a minimum package price. Our packages starts from 200 taka / month only." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/packages" />
      </Helmet>

      <HeaderBanner text="All Packages" />
      <PackagesSection title={false} />
    </main>
  );
}