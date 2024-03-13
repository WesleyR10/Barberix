import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { DeleteRide,deleteRide } from "@/slices/ride/useCases";

export const makeDeleteRideFactory = (): DeleteRide => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return deleteRide(repository);
};