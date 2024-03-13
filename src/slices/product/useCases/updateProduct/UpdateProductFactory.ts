import { MongoRepository } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { UpdateProduct,updateProduct } from "@/slices/product/useCases";

export const makeUpdateProductFactory = (): UpdateProduct => {
  const repository = new ProductRepository(new MongoRepository("product"));
  return updateProduct(repository);
};