import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddFidelityController } from "@/slices/fidelity/controllers";
import { makeAddFidelityFactory } from "@/slices/fidelity/useCases";

export const makeAddFidelityController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addFidelity",
    new AddFidelityController(
      makeValidationComposite(requiredFields),
      makeAddFidelityFactory()
    )
  );
};
