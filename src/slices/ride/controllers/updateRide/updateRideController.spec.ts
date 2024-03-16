import { mock,MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";

import { MissingParamError } from "@/application/errors";
import { badRequest, ok, Validation } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

import { UpdateRideController } from "./updateRideController";

describe("UpdateRideController", () => {
  let testInstance: UpdateRideController;
  let updateRide: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateRide = jest.fn();
    updateRide.mockResolvedValue({
      ...fakeRideEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateRideController(
      validationQuery,
      validationBody,
      updateRide
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeRideEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeRideEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeRideEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeRideEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateRide with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRideEntity,
      query: fakeRideEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRideEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateRide).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeRideEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeRideEntity
    );
    expect(updateRide).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateRide throw", async () => {
    updateRide.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRideEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRideEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeRideEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
