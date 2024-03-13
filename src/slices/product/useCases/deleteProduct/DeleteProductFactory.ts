import { MongoRepository } from "@/application/infra";
import { ProductRepository } from "@/slices/product/repositories";
import { DeleteProduct,deleteProduct } from "@/slices/product/useCases";

export const makeDeleteProductFactory = (): DeleteProduct => {
  const repository = new ProductRepository(new MongoRepository("product"));
  return deleteProduct(repository);
};