import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { UpdateRatingResultRepository } from "@/slices/ratingResult/repositories";

export type UpdateRatingResult = (
    query: Query,
    data: RatingResultData
) => Promise<RatingResultData | null>;
export type UpdateRatingResultSignature = (
    updateRatingResult: UpdateRatingResultRepository
) => UpdateRatingResult;
export const updateRatingResult: UpdateRatingResultSignature =
    (updateRatingResultRepository: UpdateRatingResultRepository) =>
      async (query: Query, data: RatingResultData) => {
        return updateRatingResultRepository.updateRatingResult(query, data);
      };
