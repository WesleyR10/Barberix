import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";
import { DeleteProductRepository } from "@/slices/product/repositories";

export type DeleteProduct = (query: Query) => Promise<ProductData | null>;
export type DeleteProductSignature = (
    deleteProduct: DeleteProductRepository
) => DeleteProduct;
export const deleteProduct: DeleteProductSignature =
    (deleteProductRepository: DeleteProductRepository) => (query: Query) => {
      return deleteProductRepository.deleteProduct(query);
    };
