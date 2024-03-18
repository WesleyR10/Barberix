import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteOwnerController } from "@/slices/owner/controllers";
import { makeDeleteOwnerFactory } from "@/slices/owner/useCases";

export const makeDeleteOwnerController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteOwner",
    new DeleteOwnerController(
      makeValidationComposite(requiredFields),
      makeDeleteOwnerFactory()
    )
  );
};
