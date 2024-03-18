import { Query } from "@/application/types";
import { UserPaginated } from "@/slices/user/entities";
import { LoadUserByPageGeoNearRepository } from "@/slices/user/repositories";

export type LoadUserByPageGeoNear = (query: Query) => Promise<UserPaginated | null>;
export type LoadUserByPageGeoNearSignature = (
  loadUserByPageGeoNear: LoadUserByPageGeoNearRepository
) => LoadUserByPageGeoNear;
export const loadUserByPageGeoNear: LoadUserByPageGeoNearSignature =
  (loadUserByPageGeoNearRepository: LoadUserByPageGeoNearRepository) =>
    async (query: Query) => {
      return loadUserByPageGeoNearRepository.loadUserByPageGeoNear(query);
    };
