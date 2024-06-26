import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateFidelityController } from "@/slices/fidelity/controllers";
import { makeUpdateFidelityFactory } from "@/slices/fidelity/useCases";

export const makeUpdateFidelityController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateFidelity",
    new UpdateFidelityController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateFidelityFactory()
    )
  );
};
