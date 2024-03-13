import { MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { AddUser,addUser } from "@/slices/user/useCases";

export const makeAddUserFactory = (): AddUser => {
  const repository = new UserRepository(new MongoRepository("user"));
  return addUser(repository);
};