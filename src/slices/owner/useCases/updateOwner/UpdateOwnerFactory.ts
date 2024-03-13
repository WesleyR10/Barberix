import { MongoRepository } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { UpdateOwner,updateOwner } from "@/slices/owner/useCases";

export const makeUpdateOwnerFactory = (): UpdateOwner => {
  const repository = new OwnerRepository(new MongoRepository("owner"));
  return updateOwner(repository);
};