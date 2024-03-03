import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import RechargeSection from "../components/recharge/RechargeSection";

export default function Recharge() {
  return (
    <main>
      <Helmet>
        <title>Recharge - Akash Media</title>
        <meta name="description" content="You can recharge our wallet in our platform. You can renew your packages from your wallet." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Recharge - Akash Media" />
        <meta property="og:description" content="You can recharge our wallet in our platform. You can renew your packages from your wallet." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/recharge" />
      </Helmet>

      <HeaderBanner text="Recharge Now" />
      <RechargeSection />
    </main>
  );
}