import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import ChannelsSection from "../components/channels/ChannelsSection";

export default function Channels() {
  return (
    <main>
      <Helmet>
        <title>Channels - Akash Media</title>
      </Helmet>

      <HeaderBanner text="Channel List" />
      <ChannelsSection sectionHeading="Bangla" />
      <ChannelsSection sectionHeading="Hindi Entertainment" />
      <ChannelsSection sectionHeading="Hindi Movies" />
      <ChannelsSection sectionHeading="English Movies" />
      <ChannelsSection sectionHeading="Sports" />
      <ChannelsSection sectionHeading="Music" />
      <ChannelsSection sectionHeading="Kids" />
      <ChannelsSection sectionHeading="Entertainment" />
      <ChannelsSection sectionHeading="News" />
    </main>
  );
}