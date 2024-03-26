import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadFidelityByPageController } from "@/slices/fidelity/controllers";
import { makeLoadFidelityByPageFactory } from "@/slices/fidelity/useCases";

export const makeLoadFidelityByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadFidelityByPage",
    new LoadFidelityByPageController(
      makeValidationComposite(requiredFields),
      makeLoadFidelityByPageFactory()
    )
  );
};
