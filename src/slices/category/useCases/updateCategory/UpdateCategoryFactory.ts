import { MongoRepository } from "@/application/infra";
import { CategoryRepository } from "@/slices/category/repositories";
import { UpdateCategory,updateCategory } from "@/slices/category/useCases";

export const makeUpdateCategoryFactory = (): UpdateCategory => {
  const repository = new CategoryRepository(new MongoRepository("category"));
  return updateCategory(repository);
};