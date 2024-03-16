import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadProductByPageController } from "@/slices/product/controllers";
import { makeLoadProductByPageFactory } from "@/slices/product/useCases";

export const makeLoadProductByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadProductByPage",
    new LoadProductByPageController(
      makeValidationComposite(requiredFields),
      makeLoadProductByPageFactory()
    )
  );
};
