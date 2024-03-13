import { MongoRepository } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { LoadOwnerByPage,loadOwnerByPage } from "@/slices/owner/useCases";

export const makeLoadOwnerByPageFactory = (): LoadOwnerByPage => {
  const repository = new OwnerRepository(new MongoRepository("owner"));
  return loadOwnerByPage(repository);
};