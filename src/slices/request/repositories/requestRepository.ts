import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RequestData, RequestPaginated } from "@/slices/request/entities";

import {
    AddRequestRepository,
    DeleteRequestRepository,
    LoadRequestByPageRepository,
    LoadRequestRepository,
    UpdateRequestRepository,
} from "./contracts";
export class RequestRepository
implements
        AddRequestRepository,
        DeleteRequestRepository,
        LoadRequestByPageRepository,
        LoadRequestRepository,
        UpdateRequestRepository
{
    constructor(private readonly repository: Repository) {}
    async addRequest(request: RequestData): Promise<RequestData | null> {
        return this.repository.add(request);
    }
    async deleteRequest(query: Query): Promise<RequestData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadRequestByPage(query: Query): Promise<RequestPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const requests = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { requests, total };
    }
    async loadRequest(query: Query): Promise<RequestData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateRequest(query: Query, data: RequestData): Promise<RequestData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}