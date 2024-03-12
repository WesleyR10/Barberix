import { CategoryData,CategoryEntity } from "@/slices/category/entities";
import { AddCategoryRepository } from "@/slices/category/repositories";

export type AddCategory = (data: CategoryData) => Promise<CategoryEntity | null>; // Tipo que irei receber na chamada

export type AddCategorySignature = (addCategory: AddCategoryRepository) => AddCategory; // Tipo que irei retornar - contrato

export const addCategory: AddCategorySignature =
    (addCategoryRepository: AddCategoryRepository) => (data: CategoryData) => {
      return addCategoryRepository.addCategory(new CategoryEntity(data));
    };

// Equivale a criar um construtor de objetos que implementa a interface AddCategoryRepository
/*
    export class AddCategory{
        constructor(private addCategoryRepository: AddCategoryRepository){}
    }
*/