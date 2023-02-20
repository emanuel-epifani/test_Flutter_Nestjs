// noinspection SpellCheckingInspection

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authService: AuthService
  ) {
    super();
  }
  //funzione triggerata automaticamente dal @UseGuards(AuthGuard('local'))
  async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser(username, password);
  }

}