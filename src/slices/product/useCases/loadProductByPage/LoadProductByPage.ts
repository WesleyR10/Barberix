import { Query } from "@/application/types";
import { ProductPaginated } from "@/slices/product/entities";
import { LoadProductByPageRepository } from "@/slices/product/repositories";

export type LoadProductByPage = (query: Query) => Promise<ProductPaginated | null>;
export type LoadProductByPageSignature = (
    loadProductByPage: LoadProductByPageRepository
) => LoadProductByPage;
export const loadProductByPage: LoadProductByPageSignature =
    (loadProductByPageRepository: LoadProductByPageRepository) => async (query: Query) => {
        return loadProductByPageRepository.loadProductByPage(query);
    };
