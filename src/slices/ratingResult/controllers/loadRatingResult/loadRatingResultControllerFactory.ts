import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingResultController } from "@/slices/ratingResult/controllers";
import { makeLoadRatingResultFactory } from "@/slices/ratingResult/useCases";

export const makeLoadRatingResultController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadRatingResult",
    new LoadRatingResultController(
      makeValidationComposite(requiredFields),
      makeLoadRatingResultFactory()
    )
  );
};
