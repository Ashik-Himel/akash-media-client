import { register } from 'swiper/element/bundle';
register();

export default function HomeSlider() {
  return (
    <section>
      <div className="lg:container">
        <swiper-container autoplay loop speed="1000" navigation pagination>
          <swiper-slide>
            <img className="w-full h-full min-h-[300px] max-h-[450px] object-cover object-center" src="https://i.ibb.co/QY5TbpK/iphone-14-pro-max-banner.png" alt="Banner" />
          </swiper-slide>
          <swiper-slide>
            <img className="w-full h-full min-h-[300px] max-h-[450px] object-cover object-center" src="https://i.ibb.co/QY5TbpK/iphone-14-pro-max-banner.png" alt="Banner" />
          </swiper-slide>
          <swiper-slide>
            <img className="w-full h-full min-h-[300px] max-h-[450px] object-cover object-center" src="https://i.ibb.co/QY5TbpK/iphone-14-pro-max-banner.png" alt="Banner" />
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  );
}