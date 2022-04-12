import * as reviewRepo from './review.repository.js';

export const getReviews = async () => {
  return await reviewRepo.getReviews();
};

export const createReview = async (review) => {
  return await reviewRepo.createReview(review);
};
