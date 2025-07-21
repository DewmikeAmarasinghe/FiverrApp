import { Router } from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
    createReview,
    getReviews,
    deleteReview,
    addSellerResponse,
    updateSellerResponse,
    deleteSellerResponse,
} from "../controllers/review.controller.js";

const router = Router();

// Create a new review (buyers only)
router.post("/", verifyToken, createReview);

// Get all reviews for a specific gig
router.get("/:gigId", getReviews);

// Delete a review (review author only)
router.delete("/:id", verifyToken, deleteReview);

// Add seller response to a review
router.post("/:reviewId/response", verifyToken, addSellerResponse);

// Update seller response
router.put("/:reviewId/response", verifyToken, updateSellerResponse);

// Delete seller response
router.delete("/:reviewId/response", verifyToken, deleteSellerResponse);

export default router;