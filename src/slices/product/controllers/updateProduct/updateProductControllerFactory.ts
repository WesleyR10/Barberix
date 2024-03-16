import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateProductController } from "@/slices/product/controllers";
import { makeUpdateProductFactory } from "@/slices/product/useCases";

export const makeUpdateProductController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateProduct",
    new UpdateProductController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateProductFactory()
    )
  );
};
