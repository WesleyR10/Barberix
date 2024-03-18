import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingResultByPageController } from "@/slices/ratingResult/controllers";
import { makeLoadRatingResultByPageFactory } from "@/slices/ratingResult/useCases";

export const makeLoadRatingResultByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadRatingResultByPage",
    new LoadRatingResultByPageController(
      makeValidationComposite(requiredFields),
      makeLoadRatingResultByPageFactory()
    )
  );
};
