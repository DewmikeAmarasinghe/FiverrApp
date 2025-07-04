import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Slider from './Slider'
import { menu } from '../menu'
import MenuTopCard from './MenuTopCard'
import { CircleUserRound } from 'lucide-react'
import newRequest from '../utils/newRequest'

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  // Add ref for dropdown
  const dropdownRef = useRef(null)

  const { pathname } = useLocation()

  const isActive = () => {
    const vh = window.innerHeight;
    window.scrollY > vh ? setActive(true) : setActive(false);
  }

  // used to conditionally render the menu bar
  useEffect(() => {
    window.addEventListener('scroll', isActive)

    return () => {
      window.removeEventListener('scroll', isActive)
    }
  }, [])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Add event listener when dropdown is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const user = localStorage.getItem("currentUser")
        if (user && user !== 'null') {
          setCurrentUser(JSON.parse(user))
        }
      } catch (error) {
        console.error('Error parsing currentUser from localStorage:', error)
        setCurrentUser(null)
      }
    }
  }, [])

  const navigate = useNavigate(null)
  const handleLogout = async () => {
    setOpen(false)
    try {
      await newRequest.post('/auth/logout')
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("currentUser", null)
      }
      setCurrentUser(null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    // HERO section
    <div className={`navbar ${active || pathname !== '/' ? 'active' : ''}`}>

      {/* navbar */}
      <div className="flex items-center c-width justify-between py-3 sm:py-4 md:py-5 px-0">

        {/* logo */}
        <Link to='/'>
          <div className="text-2xl sm:text-3xl md:text-4xl flex items-center font-bold">
            <h1 className="cursor-pointer tracking-tighter text-slate-700">fiverr</h1>
            <span className="text-green-400 text-3xl sm:text-4xl">.</span>
          </div>
        </Link>

        {/* links */}
        <div className="flex font-medium sm:font-semibold tracking-tighter text-gray-500 text-sm sm:text-base md:text-lg items-center gap-3 sm:gap-4 md:gap-6">
          <span className="navlink hidden lg:inline-block">Fiverr Pro</span>
          <span className="navlink hidden md:inline-block">Explore</span>
          <span className="navlink inline-block">English</span>
          {/* if not a seller */}
          {(currentUser && !currentUser.isSeller) && (
            <span
              className="navlink hidden sm:inline-block cursor-pointer"
              onClick={() => navigate('/becomeseller', { state: { userData: currentUser } })}
            >
              Become a Seller
            </span>
          )}
          {/* if a guest visitor */}
          {(!currentUser || !currentUser.username) &&
            <>
              <Link to="/login" className="navlink">Log in</Link>
              <Link to="/register" className="rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 border-1 text-slate-800 cursor-pointer hover:text-white hover:font-bold hover:bg-slate-700 text-sm sm:text-base transition-colors duration-200">Join</Link>
            </>
          }

          {/* if logged in show the user icon and username */}
          {/* and show the custom dropdown menu */}
          {currentUser && currentUser.username && (
            <div className="relative z-100" ref={dropdownRef}>
              <Link onClick={() => setOpen(!open)} className="flex items-center gap-2 sm:gap-3" to="#">
                {currentUser.img ? (
                  <img
                    className="rounded-full object-cover bg-center w-6 h-6 sm:w-8 sm:h-8"
                    src={currentUser.img}
                    alt="profile picture"
                  />
                ) : (
                  <CircleUserRound className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                )}
                <span className="text-slate font-normal text-md italic hover:text-blue-600 hidden sm:inline">
                  {currentUser?.username}
                </span>
              </Link>


              <div className={`absolute font-[Nunito] top-[35px] sm:top-[40px] rounded-md w-40 sm:w-64 right-0 border tracking-tight hover:shadow-md border-slate-300 gap-2 bg-white text-slate-600 flex flex-col px-6 sm:px-10 py-3 sm:py-4 
                                
                                transition-all duration-300 ease origin-top 

                                ${open
                  ? 'opacity-100 scale-y-100 visible'
                  : 'opacity-0 scale-y-0 invisible'
                }`
              }>

                {/* Show Gigs for all users, My Gigs only for sellers */}
                <Link to='gigs' onClick={() => setOpen(false)} className='option'>Gigs</Link>
                {currentUser?.isSeller && (
                  <Link to='mygigs' onClick={() => setOpen(false)} className='option'>My Gigs</Link>
                )}
                <Link to='orders' onClick={() => setOpen(false)} className='option'>Orders</Link>
                <Link to='messages' onClick={() => setOpen(false)} className='option'>Messages</Link>
                <span onClick={() => handleLogout()} className='option'>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className='border-t-[1px] border-gray-200 w-full' />

      {/* menu top bar */}
      {((pathname !== '/') || active) &&
        <>
          <div className="c-width">

            <Slider
              className='w-full'
              spaceBetween={0}
              data={menu}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                },
                480: {
                  slidesPerView: 4,
                },
                640: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 6,
                },
                900: {
                  slidesPerView: 7,
                },
                1024: {
                  slidesPerView: 8,
                },
                1200: {
                  slidesPerView: 9,
                }
              }}
              componentPropsAcceptor={(item) => <MenuTopCard title={item.title} />}
            />

          </div>
        </>
      }
    </div>
  )
}

export default Navbar