import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteProductController } from "@/slices/product/controllers";
import { makeDeleteProductFactory } from "@/slices/product/useCases";

export const makeDeleteProductController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteProduct",
    new DeleteProductController(
      makeValidationComposite(requiredFields),
      makeDeleteProductFactory()
    )
  );
};
