import { GrSearch } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";

const Featured = () => {
    return (
        <div className="relative text-white w-full flex items-center justify-center">

            {/* Background video */}
            <div className="absolute inset-0 w-full overflow-hidden z-0">
                <video
                    className="bg-center w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/videos/Background-video.mp4" />
                    {/* fallback video */}
                    <source src="/videos/vecteezy_technology-digital-or-information-data-concept_2016788.mp4" type="video/mp4" />
                </video>
            </div>

            {/* gray overlay */}
            <div className="absolute inset-0 bg-gray-700 opacity-10 z-10"></div>

            {/* Content on top */}
            <div className="relative z-20 h-full w-full px-4 sm:px-6 lg:px-8">

                {/* inner container */}
                <div className="w-full max-w-[900px] mx-auto pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 justify-center h-full gap-6 sm:gap-8 flex flex-col">

                    {/* title */}
                    <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-2 tracking-tight leading-tight'>
                        Our freelancers <br />
                        will take it from here
                    </h1>

                    {/* input */}
                    <div className="flex font-bold relative flex-wrap w-full">
                        <input type="text" name='search' className='bg-white p-3 sm:p-4 font-normal rounded-lg text-slate-500 w-full text-sm sm:text-base' placeholder='Search for any service...'/>
                        <GrSearch className='absolute hover:cursor-pointer bg-slate-900 mt-1.5 sm:mt-2 mr-2 sm:mr-[0.4rem] rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-1.5 sm:p-2 overflow-hidden right-0'/>
                    </div>

                    {/* popular */}
                    <div className="flex flex-wrap font-semibold gap-2 sm:gap-4">
                        <button className='popular text-xs sm:text-sm md:text-base'>Web Design <FaArrowRightLong className='ml-2 sm:ml-3 text-xs sm:text-sm' /></button>
                        <button className='popular text-xs sm:text-sm md:text-base'>Wordpress <FaArrowRightLong className='ml-2 sm:ml-3 text-xs sm:text-sm' /></button>
                        <button className='popular text-xs sm:text-sm md:text-base'>Logo Design <FaArrowRightLong className='ml-2 sm:ml-3 text-xs sm:text-sm' /></button>
                        <button className='popular text-xs sm:text-sm md:text-base'>All Services <FaArrowRightLong className='ml-2 sm:ml-3 text-xs sm:text-sm' /></button>
                    </div>

                    {/* trusted by */}
                    <div className="flex flex-wrap mt-auto items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        <span className='text-sm sm:text-base md:text-lg'>Trusted By: </span>
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/meta.svg" alt="meta" />
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/google.svg" alt="google" />
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/netflix.svg" alt="netflix" />
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/pg.svg" alt="pg" />
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/paypal.svg" alt="paypal" />
                        <img className='cursor-pointer h-2 md:h-3 w-auto' src="/images/payoneer.svg" alt="payoneer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured