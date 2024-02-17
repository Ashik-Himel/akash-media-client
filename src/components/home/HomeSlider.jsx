import { register } from 'swiper/element/bundle';
register();
import banner1 from '../../assets/slider-images/banner-1.jpg';
import banner2 from '../../assets/slider-images/banner-2.jpg';
import banner3 from '../../assets/slider-images/banner-3.jpg';
import PropTypes from 'prop-types';

const Slider = ({imgSrc}) => {
  return (
    <swiper-slide>
      <img className="w-full h-full min-h-[300px] md:min-h-full object-cover object-center" src={imgSrc} alt="Banner Image" />
    </swiper-slide>
  );
}

export default function HomeSlider() {
  return (
    <section>
      <div className="md:container">
        <swiper-container autoplay loop speed="1000" navigation pagination>
          <Slider imgSrc={banner1} />
          <Slider imgSrc={banner2} />
          <Slider imgSrc={banner3} />
        </swiper-container>
      </div>
    </section>
  );
}

Slider.propTypes = {
  imgSrc: PropTypes.string
}