import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ProfileObject } from '../../types/ProfileObject';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginAuthDto): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user?.password === password) {
      return user;
    }

    return null;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const payload = { ...loginAuthDto };

    const validate = await this.validateUser(payload);
    if (validate) {
      const getUserInfo: ProfileObject = validate?.dataValues;
      delete getUserInfo?.password;

      return {
        access_token: this.jwtService.sign(getUserInfo),
      };
    }

    throw new HttpException(
      'Email or password is not correct',
      HttpStatus.BAD_REQUEST,
    );
  }
}
