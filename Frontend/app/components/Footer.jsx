import FooterDropdown from './FooterDropdown'
import { footer } from '../menu'
import { nanoid } from 'nanoid'
import { Link } from 'react-router'
import { RiTwitterXFill } from "react-icons/ri";
import { GrPinterest } from "react-icons/gr";
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoLogoUsd } from "react-icons/io";
import { BsUniversalAccessCircle } from "react-icons/bs";

const Footer = () => {

  const footerElements = footer.map((dropdown) => (

    <div key={nanoid()} className="mx-auto w-full max-w-[440px] sm:max-w-none">
      <FooterDropdown {...dropdown}/>
    </div>

  ))

  return (
    <div className='c-width flex mt-auto flex-col gap-3 sm:gap-4'>

        <div className='border-t border-gray-300' />
          {/* footer top dropdown bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:my-4 gap-1 sm:gap-2 md:gap-3">
            {footerElements}
          </div>
        <div className='border-t border-gray-300' />



        {/* footer bottom bar */}
        <div className="flex flex-col w-full items-center lg:flex-row mb-6 sm:mb-8 mt-3 sm:mt-4 justify-between gap-3 sm:gap-4">


            {/* fiverr logo and desc */}
            <div className="left flex flex-col sm:flex-row gap-2 items-center">

              <Link to='/'>
                <div className="text-2xl sm:text-3xl md:text-4xl md:-mt-2 flex items-center font-bold">
                  <h1 className="cursor-pointer tracking-tighter text-slate-700">fiverr</h1>
                  <span className="text-green-400 text-3xl sm:text-4xl">.</span>
                </div>
              </Link>

              <p className="tracking-tight text-slate-600 text-sm sm:text-base text-center sm:text-left">© Fiverr International Ltd. 2025</p>
              
            </div>




            {/* socials and other */}
            <div className="right flex flex-col items-center gap-8 sm:gap-4 md:gap-6 lg:gap-8 sm:flex-row lg:ml-auto">

                {/* socials */}
                <div className="flex flex-nowrap gap-3 sm:gap-4">
                  <FaTiktok className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                  <FaInstagram className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                  <FaLinkedin className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                  <IoLogoFacebook className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                  <GrPinterest className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                  <RiTwitterXFill className='cursor-pointer text-lg sm:text-xl hover:text-slate-800 transition-colors'/>
                </div>

                {/* other */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center justify-center text-xs sm:text-sm text-slate-600">

                    {/* english */}
                    <div className="flex items-center cursor-pointer hover:text-slate-800 transition-colors gap-1">
                      <AiOutlineGlobal className="text-sm sm:text-base"/>
                      <p>English</p>
                    </div>

                    <div className="flex items-center cursor-pointer hover:text-slate-800 transition-colors gap-1">
                      <IoLogoUsd className="text-sm sm:text-base"/>
                      <p>USD</p>
                    </div>

                    <BsUniversalAccessCircle className='cursor-pointer text-sm sm:text-base hover:text-slate-800 transition-colors'/>

                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer