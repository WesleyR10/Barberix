import { Query } from "@/application/types";
import { ClientData } from "@/slices/client/entities";
import { LoadClientRepository } from "@/slices/client/repositories";

export type LoadClient = (query: Query) => Promise<ClientData | null>;
export type LoadClientSignature = (loadClient: LoadClientRepository) => LoadClient;
export const loadClient: LoadClientSignature =
    (loadClientRepository: LoadClientRepository) => async (query: Query) => {
      return loadClientRepository.loadClient(query);
    };
