import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { LoadRide,loadRide } from "@/slices/ride/useCases";

export const makeLoadRideFactory = (): LoadRide => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return loadRide(repository);
};