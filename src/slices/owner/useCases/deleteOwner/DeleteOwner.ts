import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { DeleteOwnerRepository } from "@/slices/owner/repositories";

export type DeleteOwner = (query: Query) => Promise<OwnerData | null>;
export type DeleteOwnerSignature = (deleteOwner: DeleteOwnerRepository) => DeleteOwner;
export const deleteOwner: DeleteOwnerSignature =
    (deleteOwnerRepository: DeleteOwnerRepository) => (query: Query) => {
        return deleteOwnerRepository.deleteOwner(query);
    };
