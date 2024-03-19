import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function StreamHome() {
  useEffect(() => {
    const frameVideo = document.querySelector("#channel-frame #document");
    console.log(frameVideo)
  }, []);

  return (
    <main>
      <Helmet>
        <title>Stream - Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Stream - Akash Media" />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/stream" />
      </Helmet>

      <section className="mt-6">
        <div className="container">
          <iframe id="channel-frame" className="w-full max-w-[900px] aspect-video" src="https://103.161.226.101:8009/TEST_CHANNEL/embed.html" allowFullScreen ></iframe>
        </div>
      </section>
    </main>
  );
}