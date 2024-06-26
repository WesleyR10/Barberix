import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteCategoryController } from "@/slices/category/controllers";
import { makeDeleteCategoryFactory } from "@/slices/category/useCases";

export const makeDeleteCategoryController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteCategory",
    new DeleteCategoryController(
      makeValidationComposite(requiredFields),
      makeDeleteCategoryFactory()
    )
  );
};