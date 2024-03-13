import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { LoadRideByPage,loadRideByPage } from "@/slices/ride/useCases";

export const makeLoadRideByPageFactory = (): LoadRideByPage => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return loadRideByPage(repository);
};