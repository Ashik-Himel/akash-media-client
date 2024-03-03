import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import NewConnectionSection from "../components/home/NewConnectionSection";

export default function GetConnection() {
  return (
    <main>
      <Helmet>
        <title>Get a Connection - Akash Media</title>
        <meta name="description" content="You can get a connection easily from us. Our set-top box price is only 1800 taka." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Get a Connection - Akash Media" />
        <meta property="og:description" content="You can get a connection easily from us. Our set-top box price is only 1800 taka." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/get-connection" />
      </Helmet>

      <HeaderBanner text="Get a Connection" />
      <NewConnectionSection />
    </main>
  );
}