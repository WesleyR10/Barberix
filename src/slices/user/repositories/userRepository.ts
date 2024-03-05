import { ObjectId } from "mongodb";

import { QueryBuilder } from "@/application/helpers/utils/queryBuilder";
import { Repository } from "@/application/infra/contracts/repository";
import {
    mapQueryParamsToQueryMongo,
    mountGeoNearQuery,
} from "@/application/infra/database/mongodb";
import { Query } from "@/application/types";
import { UserData, UserPaginated } from "@/slices/user/entities";

import {
    AddUserRepository,
    DeleteUserRepository,
    LoadUserByPageGeoNearRepository,
    LoadUserByPageRepository,
    LoadUserRepository,
    UpdateUserRepository,
} from "./contracts";

export class UserRepository implements
        AddUserRepository,
        DeleteUserRepository,
        LoadUserByPageRepository,
        LoadUserRepository,
        UpdateUserRepository,
        LoadUserByPageGeoNearRepository
{
    async loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null> {
        if (!query?.options?.userLoggedId) { // Se não tiver usuário logado
            return null;
        }
        const { coord = null } =
            (await this.repository.getOne(
                { _id: new ObjectId(query?.options?.userLoggedId) },
                { projection: { password: 0 } }
            )) || {};
        const queryMongo = mapQueryParamsToQueryMongo({
            ...((query?.fields ?? {}) as object),
            active: true,
            _id: { $ne: new ObjectId(query?.options?.userLoggedId) },
        });
        if (queryMongo?.$text) {
            const page = query?.options?.page;
            const pageNumber = typeof page === "number" ? page : 0;

            const resultPaginatedArray =
                (await this.repository.getPaginate(
                    pageNumber,
                    queryMongo,
                    query?.options?.sort ?? { createdAt: -1 },
                    10,
                    query?.options?.projection ?? {}
                )) ?? [];
            const totalPaginated = (await this.repository.getCount(queryMongo)) ?? 0;
            return { users: resultPaginatedArray, total: totalPaginated };
        }
        if (!coord?.coordinates) return null;
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const { coordinates } = coord;
        const queryBuilded = new QueryBuilder()
            .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
            .sort({ distance: 1 })
            .skip(((pageNumber) - 1) * 10)
            .limit(10)
            .project({ password: 0 })
            .build();
        const totalQueryBuilded = new QueryBuilder()
            .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
            .count("name")
            .build();
        const resultGeoNearPaginatedArray =
            (await this.repository.aggregate(queryBuilded)) ?? [];
        const totalResult = (await this.repository.aggregate(totalQueryBuilded)) ?? null;
        const total = totalResult?.[0]?.name ?? 0;
        return { users: resultGeoNearPaginatedArray, total };
    }

    async incrementAppointmentsTotal(query: Query): Promise<UserData | null> {
        return this.repository.increment(query?.fields ?? {}, {appointmentsTotal: 1});
    }
    constructor(private readonly repository: Repository) {}

    async addUser(user: UserData): Promise<UserData | null> {
        return this.repository.add(user);
    }

    async deleteUser(query: Query): Promise<UserData | null> {
        return this.repository.deleteOne(query?.fields);
    }

    async loadUserByPage(query: Query): Promise<UserPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const users = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { users, total };
    }

    async loadUser(query: Query): Promise<UserData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }

    async updateUser(query: Query, data: UserData): Promise<UserData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}