import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, ok, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeOwnerEntity } from "@/slices/owner/entities/OwnerEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { AddOwnerController } from "./addOwnerController";

describe("AddOwnerController", () => {
  let testInstance: AddOwnerController;
  let addOwner: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addOwner = jest.fn();
    addOwner.mockResolvedValue({
      ...fakeOwnerEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddOwnerController(validation, addOwner);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeOwnerEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeOwnerEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addOwner with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeOwnerEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addOwner).toHaveBeenCalledWith({
      ...fakeOwnerEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addOwner).toHaveBeenCalledTimes(1);
  });
  test("should throws if addOwner throw", async () => {
    addOwner.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeOwnerEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeOwnerEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
