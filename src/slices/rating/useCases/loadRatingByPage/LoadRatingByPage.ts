import { Query } from "@/application/types";
import { RatingPaginated } from "@/slices/rating/entities";
import { LoadRatingByPageRepository } from "@/slices/rating/repositories";

export type LoadRatingByPage = (query: Query) => Promise<RatingPaginated | null>;
export type LoadRatingByPageSignature = (
    loadRatingByPage: LoadRatingByPageRepository
) => LoadRatingByPage;
export const loadRatingByPage: LoadRatingByPageSignature =
    (loadRatingByPageRepository: LoadRatingByPageRepository) => async (query: Query) => {
        return loadRatingByPageRepository.loadRatingByPage(query);
    };
