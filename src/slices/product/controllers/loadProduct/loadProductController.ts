import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadProduct } from "@/slices/product/useCases";

export class LoadProductController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadProduct: LoadProduct
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const productLoaded = await this.loadProduct({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(productLoaded);
  }
}
