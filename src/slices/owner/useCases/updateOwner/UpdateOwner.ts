import { cleanDataObject } from "@/application/helpers";
import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";
import { UpdateOwnerRepository } from "@/slices/owner/repositories";

export type UpdateOwner = (query: Query, data: OwnerData) => Promise<OwnerData | null>;
export type UpdateOwnerSignature = (updateOwner: UpdateOwnerRepository) => UpdateOwner;
export const updateOwner: UpdateOwnerSignature =
  (updateOwnerRepository: UpdateOwnerRepository) =>
    async (query: Query, data: OwnerData) => {
      return updateOwnerRepository.updateOwner(
        query,
        cleanDataObject({
          forbiddenFields: ["_id", "createdById", "active"],
          allowedFields: [
            "hourStart1",
            "hourEnd1",
            "hourLunchStart1",
            "hourLunchEnd1",
            "hourStart2",
            "hourEnd2",
            "hourLunchStart2",
            "hourLunchEnd2",
            "hourStart3",
            "hourEnd3",
            "hourLunchStart3",
            "hourLunchEnd3",
            "days1",
            "days2",
            "days3",
          ],
          bodyObject: data,
        })
      );
    };