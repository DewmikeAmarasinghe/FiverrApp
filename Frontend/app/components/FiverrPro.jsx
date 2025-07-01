import { BsPatchCheckFill } from "react-icons/bs";

const FiverrPro = () => {
  return (
    <div className="flex relative isolate shadow-md shadow-black/30 h-fit bg-teal-100 rounded-xl sm:rounded-2xl c-width">

        {/* opacity reducer */}
        <span className="inset-0 absolute -z-10 bg-white opacity-50"></span>

        {/* padding defining inner container */}
        <div className="py-6 sm:py-8 md:py-10 lg:py-12 w-[92%] sm:w-[90%] gap-4 sm:gap-6 lg:gap-8 size-full max-w-[1400px] mx-auto flex flex-col">
        
            {/* heading */}
            <h2 className="font-bold tracking-tight text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                fiverr
                <span className="font-normal ml-1">pro.</span>
            </h2>

            {/* middle container */}
            <div className="w-full tracking-tight h-full flex flex-col lg:flex-row">

                {/* left */}
                <div className="flex flex-col h-full gap-4 sm:gap-6 md:gap-8 flex-1 lg:w-1/2 lg:pr-6 xl:pr-8">
                    {/* paragraph */}
                    <p className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight">
                        The <span className='text-emerald-400 cursor-pointer hover:text-emerald-600 font-extrabold tracking-wider font-[Nunito]'>premium</span> freelance solution for businesses
                    </p>

                    {/* content */}
                    <div className='flex flex-col sm:flex-row lg:flex-wrap xl:flex-nowrap leading-5 gap-4 sm:gap-4 lg:gap-6'>

                        {/* content left */}
                        <div className="flex gap-4 sm:gap-4 lg:gap-6 sm:flex-1 flex-col">

                            <div className='flex flex-col flex-1' >
                                <div className='flex items-start sm:items-center lg:flex-col lg:items-start gap-3 sm:gap-3'>
                                    <BsPatchCheckFill className='mt-1 sm:-mt-1 lg:mt-0 size-5 sm:size-5 text-emerald-500 flex-shrink-0'/>
                                    <h4 className='text-base sm:text-base lg:text-lg mb-1 font-semibold leading-6'>Dedicated hiring experts</h4>
                                </div>

                                <p className='w-full lg:w-[90%] text-sm sm:text-sm lg:text-base mt-1 lg:mt-2 text-gray-700'>Count on an account manager to find you the right talent and see to your project's every need.</p>
                            </div>

                            <div className='flex flex-col flex-1' >
                                <div className='flex items-start sm:items-center lg:flex-col lg:items-start gap-3 sm:gap-3'>
                                    <BsPatchCheckFill className='mt-1 sm:-mt-1 lg:mt-0 size-5 sm:size-5 text-emerald-500 flex-shrink-0'/>
                                    <h4 className='text-base sm:text-base lg:text-lg mb-1 font-semibold leading-6'>Satisfaction guarantee</h4>
                                </div>

                                <p className='w-full lg:w-[90%] text-sm sm:text-sm lg:text-base mt-1 lg:mt-2 text-gray-700'>Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.</p>
                            </div>

                        </div>

                        {/* content right */}
                        <div className="flex gap-4 sm:gap-4 lg:gap-6 sm:flex-1 flex-col">

                            <div className='flex flex-col flex-1' >
                                <div className='flex items-start sm:items-center lg:flex-col lg:items-start gap-3 sm:gap-3'>
                                    <BsPatchCheckFill className='mt-1 sm:-mt-1 lg:mt-0 size-5 sm:size-5 text-emerald-500 flex-shrink-0'/>
                                    <h4 className='text-base sm:text-base lg:text-lg mb-1 font-semibold leading-6'>Advanced management tools</h4>
                                </div>

                                <p className='w-full lg:w-[90%] text-sm sm:text-sm lg:text-base mt-1 lg:mt-2 text-gray-700'>Seamlessly integrate freelancers into your team and projects.</p>
                            </div>

                            <div className='flex flex-col flex-1' >
                                <div className='flex items-start sm:items-center lg:flex-col lg:items-start gap-3 sm:gap-3'>
                                    <BsPatchCheckFill className='mt-1 sm:-mt-1 lg:mt-0 size-5 sm:size-5 text-emerald-500 flex-shrink-0'/>
                                    <h4 className='text-base sm:text-base lg:text-lg mb-1 font-semibold leading-6'>Flexible payment models</h4>
                                </div>

                                <p className='w-full lg:w-[90%] text-sm sm:text-sm lg:text-base mt-1 lg:mt-2 text-gray-700'>Pay per project or opt for hourly rates to facilitate longer-term collaboration.</p>
                            </div>

                        </div>

                    </div>
                
                </div>

                {/* right */}
                <div className="flex-1 hidden lg:flex items-center justify-center lg:w-1/2 lg:pl-6 xl:pl-8">
                    <img className='w-full max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-md object-contain' src="/images/homepage-fiverrpro/fiverr-pro.webp" alt="Fiverr Pro illustration" />
                </div>

            </div>

            {/* button */}
            <button className="bg-slate-950 hover:bg-slate-800 transition-colors duration-200 cursor-pointer mx-auto sm:mx-0 w-fit text-white px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 rounded-lg font-medium hover:font-bold text-base sm:text-base lg:text-lg mt-auto">Try Now</button>
        </div>

    </div>
  )
}

export default FiverrPro