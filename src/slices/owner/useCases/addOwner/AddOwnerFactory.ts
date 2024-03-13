import { MongoRepository } from "@/application/infra";
import { OwnerRepository } from "@/slices/owner/repositories";
import { AddOwner,addOwner } from "@/slices/owner/useCases";

export const makeAddOwnerFactory = (): AddOwner => {
  const repository = new OwnerRepository(new MongoRepository("owner"));
  return addOwner(repository);
};