import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, ok, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LoadFidelityController } from "./loadFidelityController";

describe("LoadFidelityController", () => {
  let testInstance: LoadFidelityController;
  let loadFidelity: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadFidelity = jest.fn();
    loadFidelity.mockResolvedValue({
      ...fakeFidelityEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeFidelityEntity._id };
    testInstance = new LoadFidelityController(validation, loadFidelity);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadFidelity with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeFidelityEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadFidelity).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadFidelity).toHaveBeenCalledTimes(1);
  });
  test("should throws if loadFidelity throw", async () => {
    loadFidelity.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
});
