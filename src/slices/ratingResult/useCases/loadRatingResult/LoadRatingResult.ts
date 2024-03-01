import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { LoadRatingResultRepository } from "@/slices/ratingResult/repositories";

export type LoadRatingResult = (query: Query) => Promise<RatingResultData | null>;
export type LoadRatingResultSignature = (
    loadRatingResult: LoadRatingResultRepository
) => LoadRatingResult;
export const loadRatingResult: LoadRatingResultSignature =
    (loadRatingResultRepository: LoadRatingResultRepository) => async (query: Query) => {
        return loadRatingResultRepository.loadRatingResult(query);
    };
