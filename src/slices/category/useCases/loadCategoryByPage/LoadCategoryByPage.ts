import { Query } from "@/application/types";
import { CategoryPaginated } from "@/slices/category/entities";
import { LoadCategoryByPageRepository } from "@/slices/category/repositories";

export type LoadCategoryByPage = (query: Query) => Promise<CategoryPaginated | null>;

export type LoadCategoryByPageSignature = (
    loadCategoryByPage: LoadCategoryByPageRepository
) => LoadCategoryByPage;

export const loadCategoryByPage: LoadCategoryByPageSignature =
    (loadCategoryByPageRepository: LoadCategoryByPageRepository) =>
        async (query: Query) => {
            return loadCategoryByPageRepository.loadCategoryByPage(query);
        };
