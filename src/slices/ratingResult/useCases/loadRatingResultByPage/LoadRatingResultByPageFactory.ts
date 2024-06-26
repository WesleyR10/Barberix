import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { LoadRatingResultByPage,loadRatingResultByPage } from "@/slices/ratingResult/useCases";

export const makeLoadRatingResultByPageFactory = (): LoadRatingResultByPage => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return loadRatingResultByPage(repository);
};