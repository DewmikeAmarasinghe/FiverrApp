import { Link } from 'react-router'

const MenuTopCard = ({ title }) => {
    return (
        <Link to={`/gigs?cat=${encodeURIComponent(title)}`} className="block">
            <div className="h-10 sm:h-11 md:h-12 bg-white border-b-1 text-slate-600 border-b-gray-200 hover:bg-gradient-to-t hover:from-green-100 hover:to-white hover:border-b-3 hover:border-green-500 flex items-center justify-center transition-all duration-200 hover:text-slate-700">
                <h3 className='text-center text-xs lg:text-sm xl:text-base tracking-tighter  px-1 sm:px-2 leading-tight'>
                    {title}
                </h3>
            </div>
        </Link>
    )
}

export default MenuTopCard