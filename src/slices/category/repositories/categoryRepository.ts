import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { CategoryData, CategoryPaginated } from "@/slices/category/entities";

import {
    AddCategoryRepository,
    DeleteCategoryRepository,
    LoadCategoryByPageRepository,
    LoadCategoryRepository,
    UpdateCategoryRepository,
} from "./contracts";
export class CategoryRepository
implements
    AddCategoryRepository,
    DeleteCategoryRepository,
    LoadCategoryByPageRepository,
    LoadCategoryRepository,
    UpdateCategoryRepository
{
    constructor(private readonly repository: Repository) {}
    async addCategory(category: CategoryData): Promise<CategoryData | null> {
        return this.repository.add(category);
    }
    async deleteCategory(query: Query): Promise<CategoryData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadCategoryByPage(query: Query): Promise<CategoryPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const categorys = await this.repository.getPaginate(
            // query?.options?.page ?? 0, // Era assim 
            pageNumber, // Ficou assim
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { categorys, total };
    }
    async loadCategory(query: Query): Promise<CategoryData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateCategory(query: Query, data: CategoryData): Promise<CategoryData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}