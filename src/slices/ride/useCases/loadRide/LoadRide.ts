import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";
import { LoadRideRepository } from "@/slices/ride/repositories";

export type LoadRide = (query: Query) => Promise<RideData | null>;
export type LoadRideSignature = (loadRide: LoadRideRepository) => LoadRide;
export const loadRide: LoadRideSignature =
    (loadRideRepository: LoadRideRepository) => async (query: Query) => {
        return loadRideRepository.loadRide(query);
    };
