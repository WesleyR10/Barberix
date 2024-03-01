import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";
import { DeleteRideRepository } from "@/slices/ride/repositories";

export type DeleteRide = (query: Query) => Promise<RideData | null>;
export type DeleteRideSignature = (deleteRide: DeleteRideRepository) => DeleteRide;
export const deleteRide: DeleteRideSignature =
    (deleteRideRepository: DeleteRideRepository) => (query: Query) => {
        return deleteRideRepository.deleteRide(query);
    };
