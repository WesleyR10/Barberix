import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RatingData, RatingPaginated } from "@/slices/rating/entities";

import {
    AddRatingRepository,
    DeleteRatingRepository,
    LoadRatingByPageRepository,
    LoadRatingRepository,
    UpdateRatingRepository,
} from "./contracts";
export class RatingRepository
implements
        AddRatingRepository,
        DeleteRatingRepository,
        LoadRatingByPageRepository,
        LoadRatingRepository,
        UpdateRatingRepository
{
    constructor(private readonly repository: Repository) {}
    async addRating(rating: RatingData): Promise<RatingData | null> {
        return this.repository.add(rating);
    }
    async deleteRating(query: Query): Promise<RatingData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadRatingByPage(query: Query): Promise<RatingPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const ratings = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { ratings, total };
    }
    async loadRating(query: Query): Promise<RatingData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateRating(query: Query, data: RatingData): Promise<RatingData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}