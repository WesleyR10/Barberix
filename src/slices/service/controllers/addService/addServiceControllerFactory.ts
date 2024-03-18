import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { AddServiceController } from "@/slices/service/controllers";
import { makeAddServiceFactory } from "@/slices/service/useCases";

export const makeAddServiceController = (): Controller => {
  const requiredFields = [
    "name",
    "description",
    "price",
    "finalPrice",
    "comission",
    "havePromotionalPrice",
    "hasFidelityGenerator",
    "categoryId",
    "duration",
    "productsQuantityNeeded",
    "canPayWithFidelityPoints",
    "appointmentsTotal",
  ];
  return makeLogController(
    "addService",
    new AddServiceController(
      makeValidationComposite(requiredFields),
      makeAddServiceFactory()
    )
  );
};
