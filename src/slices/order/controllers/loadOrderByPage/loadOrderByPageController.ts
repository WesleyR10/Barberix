import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadOrderByPage } from "@/slices/order/useCases";

export class LoadOrderByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadOrderByPage: LoadOrderByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const orderLoaded = await this.loadOrderByPage({
      fields,
      options,
    });
    return ok(orderLoaded);
  }
}
