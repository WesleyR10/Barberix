import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRideController } from "@/slices/ride/controllers";
import { makeLoadRideFactory } from "@/slices/ride/useCases";

export const makeLoadRideController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRide",
    new LoadRideController(
      makeValidationComposite(requiredFields),
      makeLoadRideFactory()
    )
  );
};
