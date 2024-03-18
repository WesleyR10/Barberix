import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadAverageRatingResultController } from "@/slices/ratingResult/controllers";
import { makeLoadAverageRatingResultFactory } from "@/slices/ratingResult/useCases";

export const makeLoadAverageRatingResultController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadAverageRatingResult",
    new LoadAverageRatingResultController(
      makeValidationComposite(requiredFields),
      makeLoadAverageRatingResultFactory()
    )
  );
};
