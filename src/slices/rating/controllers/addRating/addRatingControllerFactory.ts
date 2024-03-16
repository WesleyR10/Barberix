import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddRatingController } from "@/slices/rating/controllers";
import { makeAddRatingFactory } from "@/slices/rating/useCases";

export const makeAddRatingController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addRating",
    new AddRatingController(
      makeValidationComposite(requiredFields),
      makeAddRatingFactory()
    )
  );
};
