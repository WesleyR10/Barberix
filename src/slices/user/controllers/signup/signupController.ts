import emailValidator from "deep-email-validator";

import { EmailInUseError, InvalidParamError } from "@/application/errors";
import {
  addDays,
  Authentication,
  badRequest,
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  unauthorized,
  Validation,
} from "@/application/helpers";
import { env } from "@/application/infra";
import { Controller } from "@/application/infra/contracts";
import { AddAccount } from "@/slices/account/useCases";
import { AddUser, LoadUser } from "@/slices/user/useCases";

import { UserEntity } from "../../entities";

interface AuthResponse {
  user : UserEntity;
  accessToken: string;
  refreshToken: string;
}

export class SignupController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addUser: AddUser,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body || {};
    if (env.ENVIRONMENT !== "test") {
      const { validators = null } = (await emailValidator(email)) || {};
      const {
        regex = null,
        typo = null,
        disposable = null,
        smtp = null,
        mx = null,
      } = validators || {};
      if (
        !regex?.valid ||
        !typo?.valid ||
        !disposable?.valid ||
        (!smtp?.valid && smtp?.reason !== "Timeout") ||
        !mx?.valid
      ) {
        return badRequest([new InvalidParamError("email")]);
      }
    }
    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (userExists) {
      return forbidden(new EmailInUseError());
    }
    delete httpRequest?.body?.passwordConfirmation;
    const userCreated = await this.addUser(httpRequest?.body);
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userCreated?._id as string,
      name: userCreated?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return ok({ user: userCreated, accessToken, refreshToken } as AuthResponse); ;
  }
}