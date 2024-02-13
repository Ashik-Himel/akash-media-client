import { Helmet } from "react-helmet-async";
import HomeSlider from "../components/home/HomeSlider";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Akash Media</title>
      </Helmet>

      <HomeSlider />
    </main>
  );
}