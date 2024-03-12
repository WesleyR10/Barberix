import { RideData,RideEntity } from "@/slices/ride/entities";
import { AddRideRepository } from "@/slices/ride/repositories";

export type AddRide = (data: RideData) => Promise<RideEntity | null>;
export type AddRideSignature = (addRide: AddRideRepository) => AddRide;
export const addRide: AddRideSignature =
    (addRideRepository: AddRideRepository) => (data: RideData) => {
      return addRideRepository.addRide(new RideEntity(data));
    };
