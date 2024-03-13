import { MongoRepository } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { LoadFidelityByPage,loadFidelityByPage } from "@/slices/fidelity/useCases";

export const makeLoadFidelityByPageFactory = (): LoadFidelityByPage => {
  const repository = new FidelityRepository(new MongoRepository("fidelity"));
  return loadFidelityByPage(repository);
};