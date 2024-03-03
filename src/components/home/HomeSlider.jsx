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
      const allData = res.data.sort((a, b) => a?.serial - b?.serial);

      if (window.innerWidth < 768) return allData?.filter(data => data?.device === "mobile");
      else return allData?.filter(data => data?.device === "desktop");
    }
  })

  if (isLoading) return null;

  return (
    <section>
      <div className="md:container">
        <swiper-container autoplay loop speed="1000" navigation pagination>
          {
            banners?.map(banner => <Slider key={banner?.serial} imgSrc={banner?.url} />)
          }
        </swiper-container>
      </div>
    </section>
  );
}

Slider.propTypes = {
  imgSrc: PropTypes.string
}