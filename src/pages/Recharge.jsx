import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import RechargeSection from "../components/recharge/RechargeSection";

export default function Recharge() {
  return (
    <main>
      <Helmet>
        <title>Recharge - Akash Media</title>
      </Helmet>

      <HeaderBanner text="Recharge Now" />
      <RechargeSection />
    </main>
  );
}