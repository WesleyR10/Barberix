import { MongoRepository } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { LoadCategoryByPage,loadCategoryByPage } from "@/slices/category/useCases";

export const makeLoadCategoryByPageFactory = (): LoadCategoryByPage => {
  const repository = new CategoryRepository(new MongoRepository("category"));
  return loadCategoryByPage(repository);
};