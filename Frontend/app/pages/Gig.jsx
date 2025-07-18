import { Star, CircleUser } from "lucide-react"
import Slider from '../components/Slider'
import Button from "../components/Button"
import { nanoid } from "nanoid"
import { technologies } from "../data"
import ReviewCard from "../components/ReviewCard"
import PricingCard from "../components/PricingCard"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import newRequest from "../utils/newRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getCurrentUser from "../utils/getCurrentUser";

const Gig = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();

  // Fetch gig data
  const { isLoading: isLoadingGig, error: errorGig, data: gigData } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = gigData?.userId;

  // Fetch user data
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  // Fetch reviews data
  const { isLoading: isLoadingReviews, error: errorReviews, data: reviewsData } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () =>
      newRequest.get(`/reviews/${id}`).then((res) => {
        return res.data;
      }),
  });

  // Add review mutation
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: (error) => {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. Please try again.");
    }
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = parseInt(e.target[1].value);
    const orderPrice = parseFloat(e.target[2].value);
    const orderDuration = parseInt(e.target[3].value);
    
    if (!desc.trim() || !star || !orderPrice || !orderDuration) {
      alert("Please fill in all fields.");
      return;
    }
    
    mutation.mutate({ 
      gigId: id, 
      desc: desc.trim(), 
      star,
      orderPrice,
      orderDuration 
    });
    e.target.reset();
  };

  // Calculate average rating with safety checks
  const averageRating = gigData?.starNumber > 0 ? Math.round(gigData.totalStars / gigData.starNumber) : 0;
  const safeAverageRating = Math.max(0, Math.min(5, averageRating));

  // -------------------------------------------------------------------------------------------------------------
  const renderTechnologyCategory = ({ title, button_className, content }, index) => {
    const buttons = content.map((item) => (
      <Button
        key={nanoid()}
        className={`${button_className} px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:shadow-sm`}
        content={item}
      />
    ));

    return (
      <div key={index} className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {buttons}
        </div>
      </div>
    );
  };
  
  const mappedData = technologies.map((tech, index) => renderTechnologyCategory(tech, index));

  // Map review data to ReviewCard props correctly with safety checks
  const reviewsToDisplay = reviewsData?.map((review) => (
    <ReviewCard
      key={review._id}
      review={review}
      sellerImage={userData?.img}
      gigOwnerId={gigData?.userId}
    />
  )) || [];

  if (isLoadingGig) {
    return (
      <div className='c-width'>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading gig data...</div>
        </div>
      </div>
    );
  }

  if (errorGig) {
    return (
      <div className='c-width'>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading gig data!</div>
        </div>
      </div>
    );
  }

  return (
    <div className='c-width'>

      {/* container */}
      <div className="flex flex-col relative items-between lg:flex-row w-full">

        {/* left => main */}
        <div className="flex flex-col w-full lg:w-[60%] gap-6 my-12">

          {/* breadcrumbs */}
          <span className="text-sm text-gray-500 ml-2">
            Fiverr {">"} {gigData?.cat || "Category"} {">"}
          </span>

          {/* heading */}
          <h1 className="font-bold ml-2 text-balance font-[Nunito] text-4xl">
            {gigData?.title || "Loading title..."}
          </h1>

          {/* user bar */}
          {isLoadingUser ? (
            <div className="ml-2">Loading user data...</div>
          ) : errorUser ? (
            <div className="ml-2 text-red-500">Error loading user data!</div>
          ) : (
            <div className="flex flex-nowrap ml-2 items-center gap-3">
              <img 
                src={userData?.img} 
                alt="User avatar" 
                className="rounded-full h-6 w-6 object-cover bg-center hover:cursor-pointer" 
              />
              <span className="text-md font-semibold text-slate-600 hover:text-blue-400 cursor-pointer">
                {userData?.username || "Anonymous"}
              </span>
              <div className="flex flex-nowrap items-center gap-1">
                {Array(safeAverageRating)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} className="stroke-yellow-400 fill-yellow-400 h-4 w-4" />
                  ))}
                <span className="text-sm text-gray-600 ml-1">{safeAverageRating}</span>
              </div>
            </div>
          )}

          {/* slider */}
          <Slider
            data={gigData?.images || []}
            className="shadow-lg mt-8"
            componentPropsAcceptor={(imglink) => (
              <img 
                className="rounded-lg h-[50vh] w-full transition-transform hover:scale-102 object-cover bg-center" 
                src={imglink} 
                alt='slide' 
              />
            )}
            breakpoints={{}}
            slidesPerView={1} 
          />

          {/* Show PricingCard below slider on mobile/tablet */}
          <div className="block lg:hidden">
            <PricingCard gigData={gigData} userData={userData} />
          </div>

          {/* about this gig */}
          <div className="max-w-4xl mx-auto mt-12 sm:mt-9 rounded-2xl overflow-hidden">

            {/* header */}
            <h1 className="text-3xl font-bold mb-4 font-[Nunito]">About This Gig</h1>

            <div className="md:pr-8">
              {/* desc */}
              <div className="mb-16">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {gigData?.desc || "Loading description..."}
                </p>
              </div>

              {/* About the seller */}
              {isLoadingUser ? (
                <div className="mb-20">Loading seller information...</div>
              ) : errorUser ? (
                <div className="mb-20 text-red-500">Error loading seller information!</div>
              ) : (
                <div className="mb-20 flex flex-col font-[Nunito]">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About The Seller</h3>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={userData?.img} 
                        alt="Seller" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{userData?.username || "Anonymous"}</h4>
                        <div className="flex items-center gap-1">
                          {Array(safeAverageRating)
                            .fill()
                            .map((item, i) => (
                              <Star key={i} className="stroke-yellow-400 fill-yellow-400 h-4 w-4" />
                            ))}
                          <span className="text-sm text-gray-600 ml-1">( total {gigData?.sales || 0} sales )</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">From:</span> {userData?.country || "Unknown"}
                      </div>
                      <div>
                        <span className="font-semibold">Member since:</span> {userData?.createdAt ? new Date(userData.createdAt).getFullYear() : "N/A"}
                      </div>
                    </div>
                    {userData?.desc && (
                      <p className="text-gray-600 mt-4">{userData.desc}</p>
                    )}
                  </div>
                </div>
              )}

              {/* technologies we use - keeping static as requested initially */}
              <div className="flex flex-col font-[Nunito] mb-20">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Technologies We Use</h3>

                {/* layout of technologies */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-6">
                    {mappedData.slice(0, 3)}
                  </div>
                  <div className="space-y-6">
                    {mappedData.slice(3)}
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div className="bg-yellow-50 border mb-12 border-yellow-200 rounded-xl p-6">
                <h4 className="font-bold text-yellow-800 mb-2">📝 Note</h4>
                <p className="text-yellow-700">Before placing your order, please reach out to discuss your requirements in detail.</p>
              </div>

              {/* Reviews Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 font-[Nunito]">Reviews</h2>
                
                {isLoadingReviews ? (
                  <div>Loading reviews...</div>
                ) : errorReviews ? (
                  <div className="text-red-500">Error loading reviews!</div>
                ) : reviewsData && reviewsData.length > 0 ? (
                  reviewsToDisplay
                ) : (
                  <div className="text-gray-500">No reviews yet.</div>
                )}

                {/* Add Review Form - Only show for buyers */}
                {currentUser && currentUser._id !== gigData?.userId && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4">Add a review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <textarea
                        placeholder="Write your opinion"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        required
                        minLength={10}
                      />
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="Order Price ($)"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                          step="0.01"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Duration (days)"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                          required
                        />
                      </div>
                      <button 
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? "Sending..." : "Send Review"}
                      </button>
                      {mutation.error && (
                        <div className="text-red-500 text-sm">
                          Failed to submit review. Please try again.
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* right => aside - Only visible on large screens and sticky */}
        <aside className="hidden lg:flex flex-col relative w-full lg:w-[40%] gap-6 py-12 pl-6">
          <PricingCard gigData={gigData} userData={userData} />
        </aside>
      </div>
    </div>
  )
}

export default Gig;