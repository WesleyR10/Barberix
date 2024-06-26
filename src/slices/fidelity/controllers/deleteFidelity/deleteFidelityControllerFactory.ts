import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteFidelityController } from "@/slices/fidelity/controllers";
import { makeDeleteFidelityFactory } from "@/slices/fidelity/useCases";

export const makeDeleteFidelityController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteFidelity",
    new DeleteFidelityController(
      makeValidationComposite(requiredFields),
      makeDeleteFidelityFactory()
    )
  );
};
