import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import NewConnectionSection from "../components/home/NewConnectionSection";

export default function GetConnection() {
  return (
    <main>
      <Helmet>
        <title>Get a Connection - Akash Media</title>
      </Helmet>

      <HeaderBanner text="Get a Connection" />
      <NewConnectionSection />
    </main>
  );
}