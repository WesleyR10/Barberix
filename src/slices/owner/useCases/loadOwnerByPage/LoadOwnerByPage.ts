import { Query } from "@/application/types";
import { OwnerPaginated } from "@/slices/owner/entities";
import { LoadOwnerByPageRepository } from "@/slices/owner/repositories";

export type LoadOwnerByPage = (query: Query) => Promise<OwnerPaginated | null>;
export type LoadOwnerByPageSignature = (
    loadOwnerByPage: LoadOwnerByPageRepository
) => LoadOwnerByPage;
export const loadOwnerByPage: LoadOwnerByPageSignature =
    (loadOwnerByPageRepository: LoadOwnerByPageRepository) => async (query: Query) => {
        return loadOwnerByPageRepository.loadOwnerByPage(query);
    };
