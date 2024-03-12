import { Authentication,DbAuthentication } from "@/application/helpers";
import { BcryptAdapter, env, JwtAdapter, MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET, "120d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.JWT_REFRESH_SECRET, "120d");
  const userMongoRepository = new MongoRepository("users");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};