import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadCategoryByPageController } from "@/slices/category/controllers";
import { makeLoadCategoryByPageFactory } from "@/slices/category/useCases";

export const makeLoadCategoryByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCategoryByPage",
    new LoadCategoryByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryByPageFactory()
    )
  );
};