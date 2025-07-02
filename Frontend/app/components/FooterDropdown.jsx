import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid'
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";


const FooterDropdown = ({ data, title }) => {

    const [active, setActive] = useState(false)


    const elements = data.map((option) => {
        return (
            <li className='list-none inline-block my-1 text-sm sm:text-base' key={nanoid()}>
                {option}
            </li>
        )
    })

    const footerDropdownReference = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            
        }
    }, [])

    return (
        <div className='w-full'>

            {/* One drop down */}
            <div className={`cursor-pointer md:cursor-default flex flex-col transition-all duration-300 gap-2 sm:gap-4 py-3 sm:py-4 ${active ? 'origin-top ease-out' : 'origin-bottom ease-in'}`}
                onClick={() => {
                    if (window.innerWidth < 768) {
                        setActive(!active)
                    }
                }}
            >
                {/* heading */}
                <div className="flex flex-nowrap justify-between md:justify-start items-center w-full">
                    <h4 className='font-semibold text-base sm:text-[17px] items-center'>{title}</h4>
                    <div className="md:hidden">
                        {active ? <RiArrowDropUpLine className='size-6 sm:size-7 transition-transform duration-200' /> : <RiArrowDropDownLine className='size-6 sm:size-7 transition-transform duration-200' />}
                    </div>
                </div>

                {/* list elements */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out md:block ${active
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
                    }`}>
                    <ul className="flex flex-col text-slate-600 gap-1 sm:gap-0">
                        {elements}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default FooterDropdown