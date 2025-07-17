import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
    // Add debug logging
    console.log("=== CREATE REVIEW DEBUG ===");
    console.log("req.userId:", req.userId);
    console.log("req.isSeller:", req.isSeller);
    console.log("req.body:", req.body);
    
    // Check if user is authenticated
    if (!req.userId) {
        console.log("ERROR: No userId found - user not authenticated");
        return next(createError(401, "You must be logged in to create a review!"));
    }
    
    // Check if user is a seller
    if (req.isSeller) {
        console.log("ERROR: User is a seller, cannot create review");
        return next(createError(403, "Sellers can't create a review!"));
    }

    // Validate required fields
    const { gigId, desc, star, orderPrice, orderDuration } = req.body;
    
    console.log("Extracted fields:", { gigId, desc, star, orderPrice, orderDuration });
    
    if (!gigId || !desc || !star || orderPrice === undefined || !orderDuration) {
        console.log("ERROR: Missing required fields");
        return next(createError(400, "Missing required fields: gigId, desc, star, orderPrice, orderDuration"));
    }

    // Validate field values
    if (star < 1 || star > 5) {
        console.log("ERROR: Invalid star rating:", star);
        return next(createError(400, "Star rating must be between 1 and 5"));
    }

    if (orderPrice < 0) {
        console.log("ERROR: Invalid order price:", orderPrice);
        return next(createError(400, "Order price must be a positive number"));
    }

    if (orderDuration < 1) {
        console.log("ERROR: Invalid order duration:", orderDuration);
        return next(createError(400, "Order duration must be at least 1 day"));
    }

    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
        orderPrice: req.body.orderPrice,
        orderDuration: req.body.orderDuration,
    });

    console.log("Created newReview object:", newReview);

    try {
        const existingReview = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });

        if (existingReview) {
            console.log("ERROR: User already has a review for this gig");
            return next(
                createError(403, "You have already created a review for this gig!")
            );
        }

        console.log("No existing review found, proceeding to save...");
        const savedReview = await newReview.save();
        console.log("Review saved successfully:", savedReview);

        await Gig.findByIdAndUpdate(req.body.gigId, {
            $inc: { totalStars: req.body.star, starNumber: 1 },
        });
        
        console.log("Gig stats updated successfully");
        console.log("=== CREATE REVIEW SUCCESS ===");
        res.status(201).send(savedReview);
    } catch (err) {
        console.log("ERROR in try-catch block:", err);
        next(err);
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ gigId: req.params.gigId }).sort({ createdAt: -1 });
        res.status(200).send(reviews);
    } catch (err) {
        next(err);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return next(createError(404, "Review not found!"));
        }

        // Check if the user is the author of the review
        if (review.userId !== req.userId) {
            return next(createError(403, "You can only delete your own reviews!"));
        }

        // Remove the review's contribution from gig statistics
        await Gig.findByIdAndUpdate(review.gigId, {
            $inc: { totalStars: -review.star, starNumber: -1 },
        });

        await Review.findByIdAndDelete(req.params.id);
        
        res.status(200).send("Review has been deleted!");
    } catch (err) {
        next(err);
    }
};

// New function to add seller response to a review
export const addSellerResponse = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { response } = req.body;
        
        if (!req.isSeller) {
            return next(createError(403, "Only sellers can respond to reviews!"));
        }

        if (!response || response.trim().length === 0) {
            return next(createError(400, "Response cannot be empty!"));
        }

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return next(createError(404, "Review not found!"));
        }

        // Get the gig to check if the current user is the seller
        const gig = await Gig.findById(review.gigId);
        
        if (!gig) {
            return next(createError(404, "Gig not found!"));
        }

        if (gig.userId !== req.userId) {
            return next(createError(403, "You can only respond to reviews of your own gigs!"));
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                sellerResponse: response.trim(),
                sellerResponseDate: new Date(),
            },
            { new: true }
        );

        res.status(200).send(updatedReview);
    } catch (err) {
        next(err);
    }
};

// Function to update seller response
export const updateSellerResponse = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { response } = req.body;
        
        if (!req.isSeller) {
            return next(createError(403, "Only sellers can update responses!"));
        }

        if (!response || response.trim().length === 0) {
            return next(createError(400, "Response cannot be empty!"));
        }

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return next(createError(404, "Review not found!"));
        }

        // Get the gig to check if the current user is the seller
        const gig = await Gig.findById(review.gigId);
        
        if (!gig) {
            return next(createError(404, "Gig not found!"));
        }

        if (gig.userId !== req.userId) {
            return next(createError(403, "You can only update responses to reviews of your own gigs!"));
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                sellerResponse: response.trim(),
                sellerResponseDate: new Date(),
            },
            { new: true }
        );

        res.status(200).send(updatedReview);
    } catch (err) {
        next(err);
    }
};

// Function to delete seller response
export const deleteSellerResponse = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        
        if (!req.isSeller) {
            return next(createError(403, "Only sellers can delete responses!"));
        }

        const review = await Review.findById(reviewId);
        
        if (!review) {
            return next(createError(404, "Review not found!"));
        }

        // Get the gig to check if the current user is the seller
        const gig = await Gig.findById(review.gigId);
        
        if (!gig) {
            return next(createError(404, "Gig not found!"));
        }

        if (gig.userId !== req.userId) {
            return next(createError(403, "You can only delete responses to reviews of your own gigs!"));
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                $unset: { 
                    sellerResponse: 1, 
                    sellerResponseDate: 1 
                }
            },
            { new: true }
        );

        res.status(200).send(updatedReview);
    } catch (err) {
        next(err);
    }
};