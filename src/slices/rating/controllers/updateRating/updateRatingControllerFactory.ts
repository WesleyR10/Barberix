import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { UpdateRatingController } from "@/slices/rating/controllers";
import { makeUpdateRatingFactory } from "@/slices/rating/useCases";

export const makeUpdateRatingController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateRating",
    new UpdateRatingController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRatingFactory()
    )
  );
};
