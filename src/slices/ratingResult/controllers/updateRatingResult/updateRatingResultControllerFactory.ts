import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateRatingResultController } from "@/slices/ratingResult/controllers";
import { makeUpdateRatingResultFactory } from "@/slices/ratingResult/useCases";

export const makeUpdateRatingResultController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRatingResult",
    new UpdateRatingResultController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRatingResultFactory()
    )
  );
};
