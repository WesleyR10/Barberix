import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { DeleteFidelityRepository } from "@/slices/fidelity/repositories";

export type DeleteFidelity = (query: Query) => Promise<FidelityData | null>;
export type DeleteFidelitySignature = (
    deleteFidelity: DeleteFidelityRepository
) => DeleteFidelity;
export const deleteFidelity: DeleteFidelitySignature =
    (deleteFidelityRepository: DeleteFidelityRepository) => (query: Query) => {
      return deleteFidelityRepository.deleteFidelity(query);
    };
