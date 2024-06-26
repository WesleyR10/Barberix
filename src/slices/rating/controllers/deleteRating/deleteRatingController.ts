import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteRating } from "@/slices/rating/useCases";

export class DeleteRatingController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteRating: DeleteRating
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingDeleteed = await this.deleteRating({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(ratingDeleteed);
  }
}
