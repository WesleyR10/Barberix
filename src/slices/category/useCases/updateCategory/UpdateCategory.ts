import { cleanDataObject } from "@/application/helpers";
import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { UpdateCategoryRepository } from "@/slices/category/repositories";

export type UpdateCategory = (
    query: Query,
    data: CategoryData
) => Promise<CategoryData | null>;

export type UpdateCategorySignature = (
    updateCategory: UpdateCategoryRepository
) => UpdateCategory;

export const updateCategory: UpdateCategorySignature =
  (updateCategoryRepository: UpdateCategoryRepository) =>
    async (query: Query, data: CategoryData) => {
      return updateCategoryRepository.updateCategory(
        query,
        cleanDataObject({
          forbiddenFields: ["_id", "createdById", "active"],
          allowedFields: ["name", "description", "image", "updatedAt"],
          bodyObject: data,
        })
      );
    };
