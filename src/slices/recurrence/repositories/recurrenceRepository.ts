import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RecurrenceData, RecurrencePaginated } from "@/slices/recurrence/entities";

import {
    AddRecurrenceRepository,
    DeleteRecurrenceRepository,
    LoadRecurrenceByPageRepository,
    LoadRecurrenceRepository,
    UpdateRecurrenceRepository,
} from "./contracts";
export class RecurrenceRepository
implements
        AddRecurrenceRepository,
        DeleteRecurrenceRepository,
        LoadRecurrenceByPageRepository,
        LoadRecurrenceRepository,
        UpdateRecurrenceRepository
{
    constructor(private readonly repository: Repository) {}
    async addRecurrence(recurrence: RecurrenceData): Promise<RecurrenceData | null> {
        return this.repository.add(recurrence);
    }
    async deleteRecurrence(query: Query): Promise<RecurrenceData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadRecurrenceByPage(query: Query): Promise<RecurrencePaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const recurrences = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { recurrences, total };
    }
    async loadRecurrence(query: Query): Promise<RecurrenceData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateRecurrence(query: Query, data: RecurrenceData): Promise<RecurrenceData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}