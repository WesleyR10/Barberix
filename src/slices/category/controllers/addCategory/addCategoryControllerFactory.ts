import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddCategoryController } from "@/slices/category/controllers";
import { makeAddCategoryFactory } from "@/slices/category/useCases";

export const makeAddCategoryController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCategory",
    new AddCategoryController(
      makeValidationComposite(requiredFields),
      makeAddCategoryFactory()
    )
  );
};