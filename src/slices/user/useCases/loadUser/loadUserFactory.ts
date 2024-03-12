import { MongoRepository } from "@/application/infra/database/mongodb";
import { UserRepository } from "@/slices/user/repositories";
import { LoadUser,loadUser } from "@/slices/user/useCases/loadUser";

export const makeLoadUserFactory = (): LoadUser => {
  const userMongoRepository = new MongoRepository("users");
  const userRepository = new UserRepository(userMongoRepository);
  return loadUser(userRepository);
};