import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateRideController } from "@/slices/ride/controllers";
import { makeUpdateRideFactory } from "@/slices/ride/useCases";

export const makeUpdateRideController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRide",
    new UpdateRideController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRideFactory()
    )
  );
};
