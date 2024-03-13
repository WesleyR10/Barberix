import { MongoRepository } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { UpdateFidelity,updateFidelity } from "@/slices/fidelity/useCases";

export const makeUpdateFidelityFactory = (): UpdateFidelity => {
  const repository = new FidelityRepository(new MongoRepository("fidelity"));
  return updateFidelity(repository);
};