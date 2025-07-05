import { Link } from 'react-router'

const ProjectCard = ({ id, pp, username, cat, img }) => {
  return (
    <Link to='/'>
        <div className="flex border shadow-xl mb-6 overflow-hidden w-56 sm:w-60 md:w-64 lg:w-68 hover:text-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105 h-64 sm:h-66 md:h-70 lg:h-72 rounded-lg sm:rounded-xl border-slate-300 flex-col bg-white">
            
            <div className='flex flex-col flex-1'>

                {/* background image */}
                <div className='rounded-t-lg sm:rounded-t-xl overflow-hidden h-40 sm:h-44 md:h-48 lg:h-52'>
                    <img className='object-cover bg-center w-full h-full hover:scale-110 transition-transform duration-500' src={img} alt={cat} />
                </div>

            </div>

            {/* content */}
            <div className="flex px-3 sm:px-4 py-3 sm:py-4 flex-col ">

                <p className='text-xs sm:text-sm text-gray-600 font-medium'>{username}</p>
                <h3 className='text-base sm:text-lg md:text-xl font-semibold leading-tightest line-clamp-2'>{cat}</h3>

            </div>
            
        </div>

    </Link>
  )
}

export default ProjectCard