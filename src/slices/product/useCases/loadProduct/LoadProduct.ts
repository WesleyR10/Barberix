import { Query } from "@/application/types";
import { ProductData } from "@/slices/product/entities";
import { LoadProductRepository } from "@/slices/product/repositories";

export type LoadProduct = (query: Query) => Promise<ProductData | null>;
export type LoadProductSignature = (loadProduct: LoadProductRepository) => LoadProduct;
export const loadProduct: LoadProductSignature =
    (loadProductRepository: LoadProductRepository) => async (query: Query) => {
      return loadProductRepository.loadProduct(query);
    };
