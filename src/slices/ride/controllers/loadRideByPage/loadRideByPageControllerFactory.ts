import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRideByPageController } from "@/slices/ride/controllers";
import { makeLoadRideByPageFactory } from "@/slices/ride/useCases";

export const makeLoadRideByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRideByPage",
    new LoadRideByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRideByPageFactory()
    )
  );
};
