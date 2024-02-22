import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";

export default function Channels() {
  return (
    <main>
      <Helmet>
        <title>Channels - Akash Media</title>
      </Helmet>

      <HeaderBanner text="Channel List" />
    </main>
  );
}