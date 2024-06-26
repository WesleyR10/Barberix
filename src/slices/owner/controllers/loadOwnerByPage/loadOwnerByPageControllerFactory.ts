import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadOwnerByPageController } from "@/slices/owner/controllers";
import { makeLoadOwnerByPageFactory } from "@/slices/owner/useCases";

export const makeLoadOwnerByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadOwnerByPage",
    new LoadOwnerByPageController(
      makeValidationComposite(requiredFields),
      makeLoadOwnerByPageFactory()
    )
  );
};
