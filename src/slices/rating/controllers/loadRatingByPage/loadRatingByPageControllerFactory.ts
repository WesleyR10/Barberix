import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingByPageController } from "@/slices/rating/controllers";
import { makeLoadRatingByPageFactory } from "@/slices/rating/useCases";

export const makeLoadRatingByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRatingByPage",
    new LoadRatingByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRatingByPageFactory()
    )
  );
};
