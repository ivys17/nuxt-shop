import * as reviewRepo from './review.repository.js';

export const getReviews = async () => await reviewRepo.getReviews();

export const createReview = async (review) => await reviewRepo.createReview(review);
