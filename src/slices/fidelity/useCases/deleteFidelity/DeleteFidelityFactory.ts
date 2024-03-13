import { MongoRepository } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { DeleteFidelity,deleteFidelity } from "@/slices/fidelity/useCases";

export const makeDeleteFidelityFactory = (): DeleteFidelity => {
  const repository = new FidelityRepository(new MongoRepository("fidelity"));
  return deleteFidelity(repository);
};