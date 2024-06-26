import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { UpdateRide,updateRide } from "@/slices/ride/useCases";

export const makeUpdateRideFactory = (): UpdateRide => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return updateRide(repository);
};