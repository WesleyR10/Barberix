import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteRatingResultController } from "@/slices/ratingResult/controllers";
import { makeDeleteRatingResultFactory } from "@/slices/ratingResult/useCases";

export const makeDeleteRatingResultController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRatingResult",
    new DeleteRatingResultController(
      makeValidationComposite(requiredFields),
      makeDeleteRatingResultFactory()
    )
  );
};
