import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";
import { LoadRatingRepository } from "@/slices/rating/repositories";

export type LoadRating = (query: Query) => Promise<RatingData | null>;
export type LoadRatingSignature = (loadRating: LoadRatingRepository) => LoadRating;
export const loadRating: LoadRatingSignature =
    (loadRatingRepository: LoadRatingRepository) => async (query: Query) => {
      return loadRatingRepository.loadRating(query);
    };
