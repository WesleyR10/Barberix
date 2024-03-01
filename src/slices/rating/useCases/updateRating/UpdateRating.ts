import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";
import { UpdateRatingRepository } from "@/slices/rating/repositories";

export type UpdateRating = (query: Query, data: RatingData) => Promise<RatingData | null>;
export type UpdateRatingSignature = (updateRating: UpdateRatingRepository) => UpdateRating;
export const updateRating: UpdateRatingSignature =
    (updateRatingRepository: UpdateRatingRepository) =>
        async (query: Query, data: RatingData) => {
            return updateRatingRepository.updateRating(query, data);
        };
