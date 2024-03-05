import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RatingResultData, RatingResultPaginated } from "@/slices/ratingResult/entities";

import {
    AddRatingResultRepository,
    DeleteRatingResultRepository,
    LoadRatingResultByPageRepository,
    LoadRatingResultRepository,
    UpdateRatingResultRepository,
} from "./contracts";
export class RatingResultRepository
implements
        AddRatingResultRepository,
        DeleteRatingResultRepository,
        LoadRatingResultByPageRepository,
        LoadRatingResultRepository,
        UpdateRatingResultRepository
{
    constructor(private readonly repository: Repository) {}
    async addRatingResult(ratingResult: RatingResultData): Promise<RatingResultData | null> {
        return this.repository.add(ratingResult);
    }
    async deleteRatingResult(query: Query): Promise<RatingResultData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadRatingResultByPage(query: Query): Promise<RatingResultPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const ratingResults = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { ratingResults, total };
    }
    async loadRatingResult(query: Query): Promise<RatingResultData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateRatingResult(query: Query, data: RatingResultData): Promise<RatingResultData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}