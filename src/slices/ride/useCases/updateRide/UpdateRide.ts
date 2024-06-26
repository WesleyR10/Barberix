import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";
import { UpdateRideRepository } from "@/slices/ride/repositories";

export type UpdateRide = (query: Query, data: RideData) => Promise<RideData | null>;
export type UpdateRideSignature = (updateRide: UpdateRideRepository) => UpdateRide;
export const updateRide: UpdateRideSignature =
    (updateRideRepository: UpdateRideRepository) =>
      async (query: Query, data: RideData) => {
        return updateRideRepository.updateRide(query, data);
      };
