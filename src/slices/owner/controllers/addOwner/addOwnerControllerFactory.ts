import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddOwnerController } from "@/slices/owner/controllers";
import { makeAddOwnerFactory, makeLoadOwnerFactory } from "@/slices/owner/useCases";

export const makeAddOwnerController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addOwner",
    new AddOwnerController(
      makeValidationComposite(requiredFields),
      makeAddOwnerFactory(),
      makeLoadOwnerFactory()
    )
  );
};
