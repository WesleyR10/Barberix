import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { DeleteRatingController } from "@/slices/rating/controllers";
import { makeDeleteRatingFactory } from "@/slices/rating/useCases";

export const makeDeleteRatingController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteRating",
    new DeleteRatingController(
      makeValidationComposite(requiredFields),
      makeDeleteRatingFactory()
    )
  );
};
