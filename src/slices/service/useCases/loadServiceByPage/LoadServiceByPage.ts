import { Query } from "@/application/types";
import { ServicePaginated } from "@/slices/service/entities";
import { LoadServiceByPageRepository } from "@/slices/service/repositories";

export type LoadServiceByPage = (query: Query) => Promise<ServicePaginated | null>;
export type LoadServiceByPageSignature = (
    loadServiceByPage: LoadServiceByPageRepository
) => LoadServiceByPage;
export const loadServiceByPage: LoadServiceByPageSignature =
    (loadServiceByPageRepository: LoadServiceByPageRepository) => async (query: Query) => {
      return loadServiceByPageRepository.loadServiceByPage(query);
    };
