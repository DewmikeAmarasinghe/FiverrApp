import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from "lucide-react";
import GigCard from '../components/GigCard'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { useLocation,useNavigate } from "react-router";
import Slider from '../components/Slider';
import MenuBottomCard from '../components/MenuBottomCard';
import { menu } from '../menu';

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: async () => {
      try {
        const minValue = minRef.current?.value || '';
        const maxValue = maxRef.current?.value || '';

        // Build URL properly - handle cases where search might be empty
        let url = `/gigs`;
        const params = new URLSearchParams();

        // Add search params if they exist
        if (search) {
          // Remove the leading '?' if it exists in search
          const searchParams = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
          searchParams.forEach((value, key) => params.append(key, value));
        }

        // Add min/max if provided
        if (minValue) params.append('min', minValue);
        if (maxValue) params.append('max', maxValue);
        if (sort) params.append('sort', sort);

        // Construct final URL
        if (params.toString()) {
          url += '?' + params.toString();
        }

        const response = await newRequest.get(url);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true,
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort, refetch]);

  const currentCat = useMemo(() => {
    const raw = search || '';
    const params = new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : raw);
    return params.get('cat') || '';
  }, [search]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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
            <source src="/videos/community.mp4" />
            <source src="/videos/vecteezy_technology-digital-or-information-data-concept_2016788.mp4" type="video/mp4" />
          </video>
        </div>

        {/* black overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Content on top */}
        <div className="relative z-20 h-full w-full px-4 sm:px-6 lg:px-8">

          {/* inner container */}
          <div className="w-full max-w-[900px] mx-auto pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 justify-center h-full gap-6 sm:gap-8 flex flex-col">

            {/* title */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-2 tracking-tight leading-tight text-center'>
              Work Your Way
            </h1>

            {/* subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-center">
              Explore the boundaries of art and technology with our talented freelancers
            </p>

            {/* input */}
            <div className="flex font-bold relative flex-wrap w-full">
              <input type="text" name='search' className='bg-white p-3 sm:p-4 font-normal rounded-lg text-slate-500 w-full text-sm sm:text-base' placeholder='What services are you looking for today ...' />
              <Search className='absolute hover:cursor-pointer bg-slate-900 mt-1.5 sm:mt-2 mr-2 sm:mr-[0.4rem] rounded-lg h-8 w-8 sm:h-10 sm:w-10 p-1.5 sm:p-2 overflow-hidden right-0 text-white' />
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                className="cursor-pointer text-sm sm:text-base md:text-lg font-bold tracking-wide w-fit rounded-md font-[Nunito] px-4 sm:px-6 py-2 sm:py-3 text-white bg-emerald-500 hover:bg-emerald-400"
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("currentUser"));
                  if (user && !user.isSeller) {
                    navigate("/becomeseller");
                  } else {
                    navigate("/register");
                  }
                }}
              >
                Become a Seller
              </button>
            </div>

            {/* Banner */}
            <div className="flex flex-col md:flex-row mt-auto relative w-full isolate justify-center items-center">

              <div className="flex flex-col flex-1 items-center text-center z-20 py-4 sm:py-6">
                <p className="text-sm sm:text-base lg:text-xl leading-5">A Gig is Bought Every</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl">4 sec</h2>
              </div>

              <div className="flex flex-col flex-1 items-center text-center z-20 py-4 sm:py-6">
                <p className="text-sm sm:text-base lg:text-xl leading-5">Transactions</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl">50M+</h2>
              </div>

              <div className="flex flex-col flex-1 items-center text-center z-20 py-4 sm:py-6">
                <p className="text-sm sm:text-base lg:text-xl leading-5">Price Range</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl">$5 - $10,000</h2>
              </div>

              {/* gray overlay */}
              <div className="absolute inset-0 bg-white opacity-0 md:opacity-20 rounded-lg -z-10"></div>

            </div>
          </div>
        </div>
      </div>

      {/* Join us */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          {/* header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4 tracking-tight">
              Join our growing freelance community
            </h2>
          </div>

          {/* search */}
          <div className="flex flex-col text-center w-full gap-6 sm:gap-8">

            {/* menu-bottom-slider */}
            <Slider
              className='pb-8 pt-8 lg:pt-8 c-width mx-auto'
              data={menu}
              componentPropsAcceptor={(card) => <MenuBottomCard {...card} active />}
              breakpoints={{
                240: {
                  slidesPerView: 2.5,
                  spaceBetween: 12,
                },
                320: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                480: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 6,
                  spaceBetween: 22,
                },
                900: {
                  slidesPerView: 7,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 26,
                },
                1200: {
                  slidesPerView: 9,
                  spaceBetween: 28,
                }
              }}
            />

            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Discover the most popular services with our talented freelancers
            </p>

            <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">

              {/* input section */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
                <span className="font-medium text-sm sm:text-base text-gray-700">Budget</span>

                <div className="flex gap-2 items-center">
                  <input
                    ref={minRef}
                    className='w-[60px] pl-2 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all'
                    type="number"
                    name='min'
                    placeholder='min'
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    ref={maxRef}
                    className='w-[60px] pl-2 py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all'
                    type="number"
                    name='max'
                    placeholder='max'
                  />
                </div>

                {/* sort by section */}
                <div onClick={() => setOpen(!open)} className="relative isolate z-10 flex items-center gap-2 sm:gap-3 cursor-pointer">
                  <span className="font-medium text-sm sm:text-base text-gray-600">Sort by</span>

                  <span className="font-bold tracking-wide text-sm sm:text-base text-gray-900">
                    {sort === "sales" ? "Best Selling" : sort === "createdAt" ? "Newest" : "Popular"}
                  </span>

                  {/* dropdown */}
                  {open ? <ChevronUp className='h-4 w-4 sm:h-5 sm:w-5 text-gray-700' /> : <ChevronDown className='h-4 w-4 sm:h-5 sm:w-5 text-gray-700' />}
                  {open && (
                    <div className="absolute shadow-xl top-8 sm:top-10 right-0 flex flex-col py-3 sm:py-4 px-4 sm:px-6 gap-2 rounded-lg text-gray-600 border border-gray-200 bg-white min-w-[140px] sm:min-w-[160px]">
                      <span onClick={() => reSort("sales")} className='hover:text-gray-900 cursor-pointer py-1 text-sm sm:text-base'>Best Selling</span>
                      <span onClick={() => reSort("createdAt")} className='hover:text-gray-900 cursor-pointer py-1 text-sm sm:text-base'>Newest</span>
                      <span onClick={() => reSort("popular")} className='hover:text-gray-900 cursor-pointer py-1 text-sm sm:text-base'>Popular</span>
                    </div>
                  )}

                </div>
                <button
                  onClick={apply}
                  disabled={isLoading}
                  className={`py-2 px-3 cursor-pointer text-white font-bold text-sm sm:text-base rounded-lg transition-colors ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-slate-400 hover:bg-green-600 active:bg-blue-600'
                    }`}
                >
                  {isLoading ? 'Applying...' : 'Apply'}
                </button>
                <button
                  onClick={() => {
                    navigate('/gigs');
                    setSort('sales');
                    if (minRef.current) minRef.current.value = '';
                    if (maxRef.current) maxRef.current.value = '';
                    refetch();
                  }}
                  className="py-2 px-3 ml-2 cursor-pointer text-white font-bold text-sm sm:text-base rounded-lg bg-blue-500 hover:bg-blue-700 transition-colors"
                >
                  Show All
                </button>
              </div>

            </div>
          </div>

          {/* Results count and status */}
          <div className="text-center mt-8 text-gray-600">
            {isLoading ? (
              "Loading results..."
            ) : error ? (
              <div className="text-red-600">
                Error loading gigs: {error.message || 'Something went wrong!'}
              </div>
            ) : (
              <>
                Showing {data?.length || 0} result{data?.length !== 1 ? 's' : ''}
                {currentCat && (
                  <span className="ml-2 inline-block align-middle px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                    in {currentCat}
                  </span>
                )}
              </>
            )}
          </div>

          {/* grid layout */}
          <div className="grid grid-cols-1 mt-16 sm:grid-cols-2 lg:grid-cols-3 gap-6 c-width mx-auto">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">Loading gigs...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12 text-red-600 bg-red-50 p-6 rounded-lg border border-red-200">
                <p className="font-semibold text-lg mb-2">Unable to load gigs</p>
                <p className="text-sm text-red-700 mb-4">
                  {error.response?.status === 404 ? 'API endpoint not found - Check your backend server' :
                    error.response?.status === 500 ? 'Server error - Check your backend logs' :
                      error.response?.status === 0 || error.code === 'ERR_NETWORK' ? 'Cannot connect to server - Is your backend running?' :
                        error.message?.includes('CORS') ? 'CORS error - Check your backend CORS configuration' :
                          error.code === 'ECONNREFUSED' ? 'Connection refused - Backend server not running' :
                            `${error.message || 'Something went wrong!'}`}
                </p>
                <div className="text-xs text-red-600 mb-4 font-mono bg-red-100 p-2 rounded">
                  Error Code: {error.code || 'Unknown'} |
                  Status: {error.response?.status || 'No response'}
                </div>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : !data || data.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="mx-auto h-16 w-16 mb-4" />
                </div>
                <p className="text-gray-600 text-lg font-medium mb-2">No gigs found</p>
                <p className="text-gray-500 text-sm">
                  {search ? 'Try adjusting your search criteria or budget range.' : 'There are no gigs available at the moment.'}
                </p>
              </div>
            ) : (
              data.map((gig) => (
                <div key={gig._id} className="flex justify-center">
                  <GigCard item={gig} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gigs