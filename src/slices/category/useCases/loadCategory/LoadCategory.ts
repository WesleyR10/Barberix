import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";
import { LoadCategoryRepository } from "@/slices/category/repositories";

export type LoadCategory = (query: Query) => Promise<CategoryData | null>;

export type LoadCategorySignature = (loadCategory: LoadCategoryRepository) => LoadCategory;

export const loadCategory: LoadCategorySignature =
    (loadCategoryRepository: LoadCategoryRepository) => async (query: Query) => {
      return loadCategoryRepository.loadCategory(query);
    };
