import { useState, useEffect, useRef } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

// This is the basic dropdown that doesnt expand automatically at larger screens
// FooterDropdown is the one that checks for the window resizsing using window.innerWidth > 768
const Dropdown = ({ data, title }) => {

    const [active, setActive] = useState(false)

    const dropdownReference = useRef(null)
    const contentRef = useRef(null)

    // comment this if you don't want the dropdown to disappear if the user click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // dropdownReference.current mean if the dropdown is in the DOM
            // Also check if the click is inside the dropdown content
            if (dropdownReference.current && 
                !dropdownReference.current.contains(event.target) &&
                !(contentRef.current && contentRef.current.contains(event.target))) {
                setActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleHeaderClick = () => {
        setActive(!active)
    }

    const handleContentClick = (e) => {
        // Prevent the dropdown from closing when clicking inside the content
        e.stopPropagation()
    }

    // Use a stable key based on index to avoid re-mounting children on each render.
    // Random keys (like nanoid) cause React to recreate the subtree and can reset
    // focus/caret positions in inputs within dropdown content.
    const elements = data.map((option, index) => {
        return (
            <li className='list-none inline-block my-1 text-sm sm:text-base' key={index}>
                {option}
            </li>
        )
    })

    return (
        <div className='w-full'>

            {/* One drop down */}
            <div ref={dropdownReference} className={`cursor-pointer flex flex-col transition-all duration-300 py-3 sm:py-4 ${active ? 'origin-top ease-out' : 'origin-bottom ease-in'}`}>
                {/* heading */}
                <div onClick={handleHeaderClick} className="flex flex-nowrap justify-between md:justify-start items-center w-full">
                    <h4 className='font-semibold text-base sm:text-[17px] items-center'>{title}</h4>
                    {active ? <RiArrowDropUpLine className='size-6 sm:size-7 transition-transform duration-200' /> : <RiArrowDropDownLine className='size-6 sm:size-7 transition-transform duration-200' />}
                </div>

                {/* list elements */}
                <div 
                    ref={contentRef}
                    onClick={handleContentClick}
                    className={`overflow-hidden transition-all duration-1000 ease-in md:block ${active
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                >
                    <ul className="flex flex-col gap-1 sm:gap-0">
                        {elements}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Dropdown