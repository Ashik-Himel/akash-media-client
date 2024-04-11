import { register } from 'swiper/element/bundle';
register();
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Slider = ({imgSrc}) => {
  return (
    <swiper-slide>
      <img className="w-full h-full min-h-[350px] md:min-h-full object-cover object-center" src={imgSrc} alt="Banner Image" />
    </swiper-slide>
  );
}

export default function HomeSlider() {
  const axiosPublic = useAxiosPublic();

  const {data: banners = [], isLoading} = useQuery({
    queryKey: ["banners"],
    queryFn: async() => {
      const res = await axiosPublic("/banners");
      return res.data;
    }
  })

  if (isLoading) {
    return (
      <section>
        <div className="md:container">
          <swiper-container autoplay loop speed="1000" navigation pagination>
            <swiper-slide>
              <div className="bg-gray-300 dark:bg-gray-700 w-full h-[350px] md:h-[400px] 2xl:h-[500px] flex justify-center items-center">
                <span className="loading loading-infinity loading-lg text-primary"></span>
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="md:container">
        <div className='block md:hidden'>
          <swiper-container autoplay loop speed="1000" navigation pagination>
            {
              banners?.filter(banner => banner?.device === "mobile")?.map(banner => <Slider key={banner?.serial} imgSrc={banner?.url} />)
            }
          </swiper-container>
        </div>

        <div className='hidden md:block'>
          <swiper-container autoplay loop speed="1000" navigation pagination>
            {
              banners?.filter(banner => banner?.device === "desktop")?.map(banner => <Slider key={banner?.serial} imgSrc={banner?.url} />)
            }
          </swiper-container>
        </div>
      </div>
    </section>
  );
}

Slider.propTypes = {
  imgSrc: PropTypes.string
}