import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";
import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";

export type UpdateFidelity = (
    query: Query,
    data: FidelityData
) => Promise<FidelityData | null>;
export type UpdateFidelitySignature = (
    updateFidelity: UpdateFidelityRepository
) => UpdateFidelity;
export const updateFidelity: UpdateFidelitySignature =
    (updateFidelityRepository: UpdateFidelityRepository) =>
      async (query: Query, data: FidelityData) => {
        return updateFidelityRepository.updateFidelity(query, data);
      };
