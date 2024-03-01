import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";
import { UpdateProductRepository } from "@/slices/product/repositories";

export type UpdateProduct = (
    query: Query,
    data: ProductData
) => Promise<ProductData | null>;
export type UpdateProductSignature = (
    updateProduct: UpdateProductRepository
) => UpdateProduct;
export const updateProduct: UpdateProductSignature =
    (updateProductRepository: UpdateProductRepository) =>
        async (query: Query, data: ProductData) => {
            return updateProductRepository.updateProduct(query, data);
        };
