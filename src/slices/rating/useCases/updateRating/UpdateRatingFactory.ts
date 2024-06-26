import { MongoRepository } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { UpdateRating,updateRating } from "@/slices/rating/useCases";

export const makeUpdateRatingFactory = (): UpdateRating => {
  const repository = new RatingRepository(new MongoRepository("rating"));
  return updateRating(repository);
};