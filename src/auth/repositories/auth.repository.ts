import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload.type';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthRepository {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signPayload(payload: Payload) {
    return await this.jwtService.signAsync(payload);
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
