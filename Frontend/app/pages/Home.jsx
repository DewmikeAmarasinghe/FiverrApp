import Featured from '../components/Featured'
import FindExpert from '../components/FindExpert'
import { cards,projects } from '../data';
import { menu } from '../menu';
import Slider from '../components/Slider';
import MenuBottomCard from '../components/MenuBottomCard';
import CategoryCard from '../components/CategoryCard';
import FiverrPro from '../components/FiverrPro'
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  return (
    <div className=''>
      <Featured />

      {/* menu-bottom-slider */}
      <Slider 
        className='pb-8 pt-8 lg:pt-8 c-width mx-auto' 
        data={menu} 
        componentPropsAcceptor={(card) => <MenuBottomCard {...card} active />}
        breakpoints={{
          240: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 18,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 22,
          },
          900: {
            slidesPerView: 7,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 26,
          },
          1200: {
            slidesPerView: 9,
            spaceBetween: 28,
          }
        }}
      />

      <h2 className='c-width mx-auto text-2xl sm:text-3xl md:text-4xl pt-4 sm:pt-6 md:pt-8 font-medium md:font-normal tracking-tight text-gray-900'>Popular services</h2>  
      
      {/* Popular Services(Category Cards) */}
      <Slider className='pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24 c-width mx-auto'
      data={cards} 
      componentPropsAcceptor={(card) => <CategoryCard {...card} />} 
      centeredSlides={true}
      enabled={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: false,
        stopOnLastSlide: false,
        waitForTransition: true
      }}
      breakpoints = {{
            320: {
              slidesPerView: 1.65,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 50,
            }
          }}
      />

      <FindExpert />

      <FiverrPro />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Nunito] c-width mx-auto mt-16 sm:mt-20 md:mt-24 lg:mt-30 mb-6 sm:mb-8 font-medium tracking-tight text-gray-900">Made on Fiverr</h2>

      {/* Project Cards */}
      <Slider className='mb-12 sm:mb-16 md:mb-20 c-width mx-auto'
      data={projects} 
      componentPropsAcceptor={(card) => <ProjectCard {...card} />} 
      centeredSlides={true}
      enabled={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: false,
        stopOnLastSlide: false,
        waitForTransition: true
      }}
      breakpoints = {{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 40,
            },
            1100: {
              slidesPerView: 3.75,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 50,
            }
          }}
      />
    </div>
  )
}

export default Home