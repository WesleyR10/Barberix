import {
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
  Validation,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategoryByPage } from "@/slices/category/useCases";

export class LoadCategoryByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryByPage: LoadCategoryByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest} = httpRequest?.query || {};
    const fields = rest;
    // sortBy é o nome do campo que será ordenado 
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 }; // se for asc mongo entende como 1, se for desc mongo entende como -1
    const options = { sort, page: Number(page) };
    const categoryLoaded = await this.loadCategoryByPage({
      fields,
      options,
    });
    return ok(categoryLoaded);
  }
}