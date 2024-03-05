import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { ClientData, ClientPaginated } from "@/slices/client/entities";

import {
    AddClientRepository,
    DeleteClientRepository,
    LoadClientByPageRepository,
    LoadClientRepository,
    UpdateClientRepository,
} from "./contracts";
export class ClientRepository
implements
        AddClientRepository,
        DeleteClientRepository,
        LoadClientByPageRepository,
        LoadClientRepository,
        UpdateClientRepository
{
    async incrementAppointmentsTotal(query: Query): Promise<ClientData | null> {
        return this.repository.increment(query?.fields ?? {}, {appointmentsTotal: 1});
    }
    constructor(private readonly repository: Repository) {}
    async addClient(client: ClientData): Promise<ClientData | null> {
        return this.repository.add(client);
    }
    async deleteClient(query: Query): Promise<ClientData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadClientByPage(query: Query): Promise<ClientPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const clients = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { clients, total };
    }
    async loadClient(query: Query): Promise<ClientData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateClient(query: Query, data: ClientData): Promise<ClientData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}