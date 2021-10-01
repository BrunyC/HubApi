import { FindById } from "./find-by-id.inteface";

export interface UsersService {
  findOne(data: FindById);
}