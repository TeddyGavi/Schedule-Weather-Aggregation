import { Users } from '../entities/user.entity';

export class UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(user: Users) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
