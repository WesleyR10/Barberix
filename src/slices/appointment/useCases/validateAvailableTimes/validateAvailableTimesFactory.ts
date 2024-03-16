import {
  makeLoadAvailableTimesFactory,
  ValidateAvailableTimes,
  validateAvailableTimes,
} from "@/slices/appointment/useCases";
export const makeValidateAvailableTimesFactory = (): ValidateAvailableTimes => {
  return validateAvailableTimes(makeLoadAvailableTimesFactory());
};