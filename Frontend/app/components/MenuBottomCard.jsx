import { Link } from 'react-router'

const MenuBottomCard = ({ src, title }) => {
    return (
        <Link className='block w-full' to={`/gigs?cat=${encodeURIComponent(title)}`}>

            <div className="h-[110px] w-[110px] sm:h-[130px] sm:w-[130px] md:h-[140px] md:w-[140px] py-2 sm:py-3 px-3 sm:px-4 flex flex-col gap-1 sm:gap-2 hover:bg-radial my-1 sm:my-2 bg-white hover:from-green-200 hover:from-1% hover:to-80% hover:to-white rounded-lg sm:rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.12)] sm:shadow-[0_0_10px_rgba(0,0,0,0.15)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-200 hover:scale-105">
                <img className='h-[35%] sm:h-[40%] mb-0.5 sm:mb-1 w-7 sm:w-9 md:w-10 object-contain' src={src} alt={title} />

                <h3 className='font-bold font-[Nunito] leading-[1.2em] sm:leading-[1.25em] text-gray-600 text-[14px] sm:text-[16px] md:text-[17px] h-[60%] sm:h-[60%] overflow-hidden'>{title}</h3>
            </div>

        </Link>
    )
}

export default MenuBottomCard