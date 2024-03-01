import { RatingResultData,RatingResultEntity } from "@/slices/ratingResult/entities";
import { AddRatingResultRepository } from "@/slices/ratingResult/repositories";

export type AddRatingResult = (
    data: RatingResultData
) => Promise<RatingResultEntity | null>;
export type AddRatingResultSignature = (
    addRatingResult: AddRatingResultRepository
) => AddRatingResult;
export const addRatingResult: AddRatingResultSignature =
    (addRatingResultRepository: AddRatingResultRepository) => (data: RatingResultData) => {
        return addRatingResultRepository.addRatingResult(new RatingResultEntity(data));
    };
