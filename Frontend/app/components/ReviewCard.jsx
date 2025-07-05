import { FaStar } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import Flag from 'react-world-flags';
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import Dropdown from './Dropdown';
import { getCountryCode } from '../data';
import getCurrentUser from "../utils/getCurrentUser";

const ReviewCard = ({ review, sellerImage, gigOwnerId }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [responseText, setResponseText] = useState('');
  
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();

  // Check if current user is the seller of this gig
  const isCurrentUserSeller = currentUser && currentUser._id === gigOwnerId;

  // Add safety check for review object
  if (!review) {
    return (
      <div className='border px-4 text-balance rounded-xl shadow-lg border-slate-300 mb-10 py-4 h-auto w-full flex items-center justify-center'>
        <div className="text-red-500">Invalid review data</div>
      </div>
    );
  }

  // Fetch user data for the reviewer
  const { isLoading, error, data: userData } = useQuery({
    queryKey: ["reviewer", review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  // Mutation for adding/updating seller response
  const responseMutation = useMutation({
    mutationFn: ({ reviewId, response, isUpdate }) => {
      if (isUpdate) {
        return newRequest.put(`/reviews/${reviewId}/response`, { response });
      } else {
        return newRequest.post(`/reviews/${reviewId}/response`, { response });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      setIsEditing(false);
      setResponseText('');
    },
    onError: (error) => {
      console.error("Failed to save response:", error);
      
      // Extract the error message from the backend response
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data || 
                          "Failed to save response. Please try again.";
      
      alert(errorMessage);
    }
  });

  // Mutation for deleting seller response
  const deleteResponseMutation = useMutation({
    mutationFn: ({ reviewId }) => newRequest.delete(`/reviews/${reviewId}/response`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      setIsEditing(false);
      setResponseText("");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 
        error?.response?.data || 
        "Failed to delete response. Please try again.";
      alert(errorMessage);
    }
  });

  const handleSaveResponse = () => {
    if (!responseText.trim()) {
      alert("Response cannot be empty.");
      return;
    }

    if (responseText.length > 300) {
      alert("Response cannot exceed 300 characters.");
      return;
    }

    const hasExistingResponse = review.sellerResponse && review.sellerResponse.trim() !== '';
    
    responseMutation.mutate({
      reviewId: review._id,
      response: responseText.trim(),
      isUpdate: hasExistingResponse
    });
  };

  const handleEditClick = () => {
    const existingResponse = review.sellerResponse && review.sellerResponse.trim() !== '' 
      ? review.sellerResponse 
      : '';
    setResponseText(existingResponse);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setResponseText('');
  };

  const handleDeleteResponse = () => {
    if (!review?.sellerResponse || review.sellerResponse.trim() === '') return;
    if (!confirm('Delete your response to this review?')) return;
    deleteResponseMutation.mutate({ reviewId: review._id });
  };

  if (isLoading) {
    return (
      <div className='border px-4 text-balance rounded-xl shadow-lg border-slate-300 mb-10 py-4 h-auto w-full flex items-center justify-center'>
        <div>Loading review...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border px-4 text-balance rounded-xl shadow-lg border-slate-300 mb-10 py-4 h-auto w-full flex items-center justify-center'>
        <div className="text-red-500">Error loading review</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
  };

  // Get country code for flag
  const countryCode = userData?.country ? getCountryCode(userData.country) : null;

  // Check if seller has responded - only show if there's actual response content
  const hasSellerResponse = review.sellerResponse && review.sellerResponse.trim() !== '';

  // Helper to render edit form with a stable element type so the caret doesn't reset
  const renderEditForm = (
    <div key="edit-form" className="w-full">
      <textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder="Write your response..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
        rows={3}
        maxLength={300}
        dir="ltr"
        autoFocus
        onFocus={(e) => {
          const valueLength = e.target.value.length;
          // Move caret to end on focus to avoid jump-to-start issues
          try { e.target.setSelectionRange(valueLength, valueLength); } catch {}
        }}
      />
      <div className="text-xs text-gray-500 mt-1">
        {responseText.length}/300 characters
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSaveResponse}
          disabled={responseMutation.isPending}
          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {responseMutation.isPending ? "Saving..." : "Save"}
        </button>
        <button
          onClick={handleCancelEdit}
          className="px-3 py-1 border text-sm rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Prepare dropdown data
  const getDropdownData = () => {
    if (isEditing) {
      return [renderEditForm];
    }

    const responseContent = hasSellerResponse 
      ? review.sellerResponse 
      : "The seller hasn't replied yet";

    const contentArray = [responseContent];

    if (isCurrentUserSeller) {
      contentArray.push(
        <button
          key="reply-button"
          onClick={handleEditClick}
          className="mt-2 px-3 py-1 bg-slate-500 font-semibold text-white text-sm rounded hover:bg-blue-600"
        >
          {hasSellerResponse ? 'Edit response' : 'Reply'}
        </button>
      );

      if (hasSellerResponse) {
        contentArray.push(
          <button
            key="delete-response-button"
            onClick={handleDeleteResponse}
            disabled={deleteResponseMutation.isPending}
            className="mt-2 px-3 py-1 border text-sm rounded hover:bg-gray-100"
          >
            {deleteResponseMutation.isPending ? 'Deleting...' : 'Delete response'}
          </button>
        );
      }
    }

    return contentArray;
  };

  return (
    <div className='border px-4 text-balance rounded-xl shadow-lg border-slate-300 mb-10 py-4 h-auto w-full flex flex-col'>

      {/* user details */}
      <div className="flex flex-col gap-2 pb-4 pt-1">

        {/* img and username */}
        <div className="flex flex-nowrap items-center w-full gap-3">
          <img 
            alt="client image" 
            className="rounded-full size-8 md:row-span-2 col-span-2 sm:size-12 object-cover bg-center" 
            src={userData?.img || 'https://www.svgrepo.com/show/122119/user-image-with-black-background.svg'} 
          />
          <span className="text-slate-800 font-[Nunito] text-lg md:text-xl lg:text-2lg font-semibold tracking-tight">
            {userData?.username || "Anonymous"}
          </span>
        </div>

        {/* repeat status - you might want to implement logic to check if user is a repeat client */}
        <div className="flex flex-nowrap font-[Nunito] gap-2 items-center">
          <FaRepeat className="size-3" />
          <span className="font-medium text-base">Client</span>
        </div>

        {/* country */}
        <div className="flex flex-nowrap gap-2 items-center">
          {countryCode ? (
            <Flag 
              code={countryCode} 
              className="w-6 h-4 object-cover rounded"
            />
          ) : (
            <span className="text-lg">🌍</span>
          )}
          <span className="font-thin text-xs sm:text-sm text-slate-600">
            {userData?.country || "Unknown"}
          </span>
        </div>

      </div>

      {/* review text */}
      <div className="border my-2 border-slate-300" />

      <div className="flex flex-nowrap items-center font-bold font-[Nunito] text-lg my-1 gap-2">
        {/* Render stars based on review rating */}
        {Array(Math.max(0, Math.min(5, review.star || 0)))
          .fill()
          .map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        <span>{review.star || 0}</span>
        <span className="text-slate-300"> . </span>
        <span className="text-slate-700 font-light text-sm tracking-tight">
          {formatDate(review.createdAt)}
        </span>
      </div>

      <p className={`leading-7 font-[Nunito] ${expanded ? '' : 'line-clamp-5 '} ${expanded ? '' : 'md:line-clamp-4'} `}>
        {review.desc || "No review text provided."}
      </p>
      
      {review.desc && review.desc.length > 200 && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="block w-fit pt-2 pb-4 cursor-pointer border-0 hover:text-slate-500 underline"
        >
          {expanded ? 'See Less' : 'See More'}
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:w-1/2 justify-center font-bold my-1">
        <div className="flex flex-nowrap sm:flex-col w-1/2">
          <div className="flex-1 text-slate-600 sm:order-2 font-light">Price</div>
          <div className="flex-1 font-semibold text-lg sm:order-1">${review.orderPrice || 0}</div>
        </div>
        <div className="sm:border-slate-300 border-r-1 sm:mr-10 border-" />
        <div className="flex flex-nowrap sm:flex-col w-1/2">
          <div className="flex-1 text-slate-600 sm:order-2 font-light">Duration</div>
          <div className="flex-1 font-semibold text-lg sm:order-1">{review.orderDuration || 0} days</div>
        </div>
      </div>

      {/* Always show seller's response section */}
      <>
        <hr className='border-b-1 my-4 border-slate-200' />
        
        {/* Seller's response */}
        <div className="flex flex-nowrap items-center gap-3">
          <img 
            alt="seller image" 
            className="rounded-full size-8 object-cover bg-center" 
            src={sellerImage} 
          />
          <Dropdown 
            title="Seller's Response" 
            data={getDropdownData()}
          />
        </div>
      </>

    </div>
  )
}

export default ReviewCard;