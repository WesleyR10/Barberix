import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { RideData, RidePaginated } from "@/slices/ride/entities";

import {
    AddRideRepository,
    DeleteRideRepository,
    LoadRideByPageRepository,
    LoadRideRepository,
    UpdateRideRepository,
} from "./contracts";
export class RideRepository
implements
        AddRideRepository,
        DeleteRideRepository,
        LoadRideByPageRepository,
        LoadRideRepository,
        UpdateRideRepository
{
    constructor(private readonly repository: Repository) {}
    async addRide(ride: RideData): Promise<RideData | null> {
        return this.repository.add(ride);
    }
    async deleteRide(query: Query): Promise<RideData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadRideByPage(query: Query): Promise<RidePaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const rides = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { rides, total };
    }
    async loadRide(query: Query): Promise<RideData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateRide(query: Query, data: RideData): Promise<RideData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}