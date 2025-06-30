import { Link } from 'react-router'

const CategoryCard = ({ title, desc, img }) => {
  return (
    <Link to='/gigs/:cat=design' className="group block">
      <div className='relative overflow-hidden rounded-xl aspect-square w-full sm:w-64 md:w-72 lg:w-80 xl:w-64 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>

        {/* background image */}
        <div className='absolute inset-0 z-0'>
          <img 
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
            src={img} 
            alt={desc} 
          />
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>

        {/* content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            <p className='text-white/80 text-sm sm:text-base mb-2 font-light tracking-wide'>
              {desc}
            </p>
            <h3 className='text-white text-xl sm:text-2xl font-semibold leading-tight'>
              {title}
            </h3>
          </div>
          
          {/* hover arrow indicator */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div className="inline-flex items-center text-white text-sm font-medium">
              <span className="mr-2">Explore</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* subtle border on hover */}
        <div className="absolute inset-0 z-30 rounded-xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  )
}

export default CategoryCard