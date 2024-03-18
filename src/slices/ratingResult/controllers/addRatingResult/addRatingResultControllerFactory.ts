import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddRatingResultController } from "@/slices/ratingResult/controllers";
import { makeAddRatingResultFactory } from "@/slices/ratingResult/useCases";

export const makeAddRatingResultController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRatingResult",
    new AddRatingResultController(
      makeValidationComposite(requiredFields),
      makeAddRatingResultFactory()
    )
  );
};
