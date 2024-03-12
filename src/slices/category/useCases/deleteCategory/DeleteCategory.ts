import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { DeleteCategoryRepository } from "@/slices/category/repositories";

export type DeleteCategory = (query: Query) => Promise<CategoryData | null>;

export type DeleteCategorySignature = (
    deleteCategory: DeleteCategoryRepository
) => DeleteCategory;

export const deleteCategory: DeleteCategorySignature =
    (deleteCategoryRepository: DeleteCategoryRepository) => (query: Query) => {
      return deleteCategoryRepository.deleteCategory(query);
    };
