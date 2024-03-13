import { MongoRepository } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { AddRating,addRating } from "@/slices/rating/useCases";

export const makeAddRatingFactory = (): AddRating => {
  const repository = new RatingRepository(new MongoRepository("rating"));
  return addRating(repository);
};