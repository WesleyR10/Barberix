import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadProductController } from "@/slices/product/controllers";
import { makeLoadProductFactory } from "@/slices/product/useCases";

export const makeLoadProductController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadProduct",
    new LoadProductController(
      makeValidationComposite(requiredFields),
      makeLoadProductFactory()
    )
  );
};
