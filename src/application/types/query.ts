export type Query = {
    fields: any;
    options?: QueryOptions;
};

export type QueryOptions = {
    projection?: unknown;
    sort?: unknown;
    page?: unknown;
    limit?: number;
    userLoggedId?: string;
    indexToCreate?: any;
};
