import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadClientByPage } from "@/slices/client/useCases";

export class LoadClientByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadClientByPage: LoadClientByPage
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
    const clientLoaded = await this.loadClientByPage({
      fields,
      options,
    });
    return ok(clientLoaded);
  }
}
