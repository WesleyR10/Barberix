import { OwnerData,OwnerEntity } from "@/slices/owner/entities";
import { AddOwnerRepository } from "@/slices/owner/repositories";

export type AddOwner = (data: OwnerData) => Promise<OwnerEntity | null>;
export type AddOwnerSignature = (addOwner: AddOwnerRepository) => AddOwner;
export const addOwner: AddOwnerSignature =
    (addOwnerRepository: AddOwnerRepository) => (data: OwnerData) => {
      return addOwnerRepository.addOwner(new OwnerEntity(data));
    };
