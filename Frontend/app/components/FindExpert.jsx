import { Link } from "react-router"

const FindExpert = () => {
  return (
    <div>
      {/* stuck at vibe coding? container */}
      <div className="min-h-[60vh] c-width text-white mb-16 relative isolate z-10 rounded-2xl overflow-hidden flex items-center bg-gradient-to-b from-[rgb(196,93,123)] to-rose-400">

        {/* dark overlay */}
        <div className="inset-0 absolute bg-gradient-to-t from-[rgb(33,14,20)] to-[rgb(255,255,255)] opacity-40 z-0"></div>

        {/* inner container */}
        <div className="flex flex-col md:flex-row mx-auto gap-8 md:gap-4 relative z-20 items-center w-[90%] max-w-[1200px] py-8 md:py-0 md:h-[80%]">

          {/* left col - content */}
          <div className="left flex justify-center items-center text-center md:text-start md:items-start gap-6 flex-col md:flex-1 order-2 md:order-1">
            <h3 className='md:font-normal text-3xl md:text-4xl leading-tight'>Stuck at vibe coding?</h3>

            <p className='text-lg opacity-90'>Get matched with the right expert to turn your prototype into a real, working product.</p>

            <Link to='/gigs' className='px-6 cursor-pointer w-fit text-lg hover:bg-slate-100 bg-white text-black font-semibold rounded-xl py-3 transition-colors'>Find an expert</Link>
          </div>

          {/* right col - video */}
          <div className="md:flex-1 order-1 md:order-2 w-full md:w-auto">
            <div className="aspect-video md:aspect-auto md:h-full rounded-xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/Vibe coding marketing banner loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FindExpert