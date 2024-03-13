import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { DeleteRatingResult,deleteRatingResult } from "@/slices/ratingResult/useCases";

export const makeDeleteRatingResultFactory = (): DeleteRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return deleteRatingResult(repository);
};