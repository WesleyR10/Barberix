import { Query } from "@/application/types";
import { RatingResultAverage } from "@/slices/ratingResult/entities";
import { LoadAverageRatingResultRepository } from "@/slices/ratingResult/repositories";

export type LoadAverageRatingResult = (
    query: Query
) => Promise<RatingResultAverage | null>;

export type LoadAverageRatingResultSignature = (
    loadAverageRatingResult: LoadAverageRatingResultRepository
) => LoadAverageRatingResult;

export const loadAverageRatingResult: LoadAverageRatingResultSignature =
    (loadAverageRatingResultRepository: LoadAverageRatingResultRepository) =>
        async (query: Query) => {
            return loadAverageRatingResultRepository.loadAverageRatingResult(query);
        };
