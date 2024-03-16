import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingController } from "@/slices/rating/controllers";
import { makeLoadRatingFactory } from "@/slices/rating/useCases";

export const makeLoadRatingController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRating",
    new LoadRatingController(
      makeValidationComposite(requiredFields),
      makeLoadRatingFactory()
    )
  );
};
