import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt'; // install
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  #saltOrRounds: number = 10;

  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    //     const user = await this.usersService.findOneBy(email);
    //     if (user?.password !== pass) {
    //     const isMatch = await bcrypt.compare(password, user?.password);
    //     if (!isMatch) {
    //       throw new UnauthorizedException();
    //     }
    //     const payload = { sub: user.id, email: user.email };
    //     return {
    //       access_token: await this.jwtService.signAsync(payload),
    //     };
  }

  async register(createUserDto: CreateUserDto) {
    // const user = await this.usersService.create(payload);
    //     const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)
    //     let data = {
    //       ...payload,
    //       password: hashPass
    //     }
    //     const user = await this.usersService.create(data);
    //     return user;

    return createUserDto;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, this.#saltOrRounds);
  }

  async comparePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
