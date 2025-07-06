import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

// --------------------------------------------------------------------------------

// this generic Slider requires componentPropsAcceptor function that accepts a card object and set
// its details into the custom card component

// and it also need a json file with data as objects to map over

// --------------------------------------------------------------------------------

const Slider = ({
  // required
  data = [],
  componentPropsAcceptor,

  // optional
  spaceBetween = 20,
  centeredSlides = false,
  autoplay = true,
  slidesPerView = 4,
  enabled = true, 
  loop = true, 
  navigation = true,
  pagination = false, 
  breakpoints = {
    200: {
      slidesPerView: 1,
      spaceBetween: 8,
    },
    280: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 1.4,
      spaceBetween: 12,
    },
    380: {
      slidesPerView: 1.6,
      spaceBetween: 14,
    },
    420: {
      slidesPerView: 1.8,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    560: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 22,
    },
    720: {
      slidesPerView: 2.8,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 26,
    },
    860: {
      slidesPerView: 3.3,
      spaceBetween: 28,
    },
    920: {
      slidesPerView: 3.6,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
    1180: {
      slidesPerView: 4.5,
      spaceBetween: 34,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 36,
    },
    1420: {
      slidesPerView: 5.5,
      spaceBetween: 38,
    },
    1536: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
    1680: {
      slidesPerView: 6.5,
      spaceBetween: 42,
    },
    1920: {
      slidesPerView: 7,
      spaceBetween: 44,
    }
  },
  className = ''
}) => {
  const slideElements = data.map((item, index) => (
    <SwiperSlide key={item.id || index}>
      {componentPropsAcceptor(item)}
    </SwiperSlide>
  ));

  const paginationConfig = pagination ? {
    clickable: true,
    dynamicBullets: true,
    ...(typeof pagination === 'object' ? pagination : {})
  } : false;

  const autoplayConfig = autoplay && typeof autoplay === 'object' ? autoplay : false;

  return (
    <div className={`w-full ${className}`}>
      <style jsx>{`
        .swiper-container .swiper-button-next,
        .swiper-container .swiper-button-prev {
          width: 32px !important;
          height: 32px !important;
          margin-top: -16px !important;
        }
        
        .swiper-container .swiper-button-next:after,
        .swiper-container .swiper-button-prev:after {
          font-size: 14px !important;
          font-weight: 600 !important;
        }
        
        @media (max-width: 640px) {
          .swiper-container .swiper-button-next,
          .swiper-container .swiper-button-prev {
            width: 28px !important;
            height: 28px !important;
            margin-top: -14px !important;
          }
          
          .swiper-container .swiper-button-next:after,
          .swiper-container .swiper-button-prev:after {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .swiper-container .swiper-button-next,
          .swiper-container .swiper-button-prev {
            width: 24px !important;
            height: 24px !important;
            margin-top: -12px !important;
          }
          
          .swiper-container .swiper-button-next:after,
          .swiper-container .swiper-button-prev:after {
            font-size: 10px !important;
          }
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, FreeMode, Autoplay]}
        autoplay={autoplayConfig}
        spaceBetween={spaceBetween}
        centeredSlides={centeredSlides}
        slidesPerView={slidesPerView}
        enabled={enabled}
        loop={loop}
        breakpoints={breakpoints}
        navigation={navigation}
        pagination={paginationConfig}
        freeMode={true}
        grabCursor={true}
        watchOverflow={true}
        className="swiper-container"
      >
        {slideElements}
      </Swiper>
    </div>
  );
};

export default Slider;