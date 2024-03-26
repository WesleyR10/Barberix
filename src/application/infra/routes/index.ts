import { account } from "./account";
import { auth } from "./auth";
import { category } from "./category";
import { health } from "./health";
import { user } from "./user";
// IMPORT MODULE FILES

const routes = [
  health,
  user,
  auth,
  account,
  category
  // ADD FUNCTION IMPORTS
];

export { routes };