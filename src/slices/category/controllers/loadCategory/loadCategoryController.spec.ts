import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, ok, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { LoadCategoryController } from "./loadCategoryController";

describe("LoadCategoryController", () => {
  let testInstance: LoadCategoryController;
  let loadCategory: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCategory = jest.fn();
    loadCategory.mockResolvedValue({
      ...fakeCategoryEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeCategoryEntity._id};
    testInstance = new LoadCategoryController(validation, loadCategory);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call loadCategory with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadCategory).toHaveBeenCalledWith({ fields: fakeQuery, options: {} });
    expect(loadCategory).toHaveBeenCalledTimes(1);
  });

  test("should call loadCategory with correct params search name", async () => {
    const result = await testInstance.execute({
      query: {name: "fakeCategoryEntity"},
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeCategoryEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(loadCategory).toHaveBeenCalledWith({ fields: {name: "fakeCategoryEntity"}, options: {} });
    expect(loadCategory).toHaveBeenCalledTimes(1);
  });

  test("should throws if loadCategory throw", async () => {
    loadCategory.mockRejectedValueOnce(new Error("error"));
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

