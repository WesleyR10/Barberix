import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { OrderData, OrderPaginated } from "@/slices/order/entities";

import {
    AddOrderRepository,
    DeleteOrderRepository,
    LoadOrderByPageRepository,
    LoadOrderRepository,
    UpdateOrderRepository,
} from "./contracts";
export class OrderRepository
implements
        AddOrderRepository,
        DeleteOrderRepository,
        LoadOrderByPageRepository,
        LoadOrderRepository,
        UpdateOrderRepository
{
    constructor(private readonly repository: Repository) {}
    async addOrder(order: OrderData): Promise<OrderData | null> {
        return this.repository.add(order);
    }
    async deleteOrder(query: Query): Promise<OrderData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadOrderByPage(query: Query): Promise<OrderPaginated | null> {
        const page = query?.options?.page;
        const pageNumber = typeof page === "number" ? page : 0;

        const orders = await this.repository.getPaginate(
            pageNumber,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { orders, total };
    }
    async loadOrder(query: Query): Promise<OrderData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateOrder(query: Query, data: OrderData): Promise<OrderData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}