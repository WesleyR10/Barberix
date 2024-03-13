import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { UpdateRatingResult,updateRatingResult } from "@/slices/ratingResult/useCases";

export const makeUpdateRatingResultFactory = (): UpdateRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return updateRatingResult(repository);
};