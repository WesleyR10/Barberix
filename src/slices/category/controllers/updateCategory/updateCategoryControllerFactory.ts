import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateCategoryController } from "@/slices/category/controllers";
import { makeUpdateCategoryFactory } from "@/slices/category/useCases";

export const makeUpdateCategoryController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCategory",
    new UpdateCategoryController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateCategoryFactory()
    )
  );
};