import { authLogged } from "@/application/infra/middlewares";

import {
  addCategoryAdapter,
  deleteCategoryAdapter,
  loadCategoryAdapter,
  loadCategoryByPageAdapter,
  updateCategoryAdapter,
} from "./categoryAdapter";
import {
  addCategoryPostSchema,
  deleteCategorySchema,
  loadCategoryByPageGetSchema,
  loadCategoryGetSchema,
  updateCategorySchema,
} from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
  fastify.get("/category/load", loadCategoryGetSchema, loadCategoryAdapter());
  fastify.get(
    "/category/loadByPage",
    loadCategoryByPageGetSchema,
    loadCategoryByPageAdapter()
  );
  fastify.delete("/category/delete", deleteCategorySchema, deleteCategoryAdapter());
  fastify.patch("/category/update", updateCategorySchema, updateCategoryAdapter());
}
export { category };
