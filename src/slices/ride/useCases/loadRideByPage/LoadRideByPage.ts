import { Query } from "@/application/types";
import { RidePaginated } from "@/slices/ride/entities";
import { LoadRideByPageRepository } from "@/slices/ride/repositories";

export type LoadRideByPage = (query: Query) => Promise<RidePaginated | null>;
export type LoadRideByPageSignature = (
    loadRideByPage: LoadRideByPageRepository
) => LoadRideByPage;
export const loadRideByPage: LoadRideByPageSignature =
    (loadRideByPageRepository: LoadRideByPageRepository) => async (query: Query) => {
      return loadRideByPageRepository.loadRideByPage(query);
    };
