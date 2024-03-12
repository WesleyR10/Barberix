import { RatingData,RatingEntity } from "@/slices/rating/entities";
import { AddRatingRepository } from "@/slices/rating/repositories";

export type AddRating = (data: RatingData) => Promise<RatingEntity | null>;
export type AddRatingSignature = (addRating: AddRatingRepository) => AddRating;
export const addRating: AddRatingSignature =
    (addRatingRepository: AddRatingRepository) => (data: RatingData) => {
      return addRatingRepository.addRating(new RatingEntity(data));
    };
