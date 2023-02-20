// noinspection SpellCheckingInspection

import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    ) {}


  /** 1.
   * da chiamare la prima volta,
   * crea un utente e mi ritorna:
   * - Jwt e refreshToken (e una volta dentro balzero facendo tutte le chiamte stile 3 usando il jwt, dalla prox richiedero il jwt)
   */
  @Post('signin')
  async registerUser(
    @Param('username') username: string,
    @Param('password') password: string) {
      return this.authService.registerUser(username,password);
  }

  /** 2.
   *
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login_getToken(
    @Param('username') username: string,
    @Param('password') password: string) {
      return this.authService.login_getToken(username,password);
  }

  /** 3.
   * qualunque altra chiamata che usa il jwt anziche username e password
   *
   */
  //@UseGuards(AuthGuard('jwt'))
  @Get('debug')
  async debug() {
    return this.authService.debug();
    //return "Sono il be di prova mio, non quello di luca!!!";

  }


  /** 4. quando scade il jwt
   *
   */
  @Post('refresh')
  async refreshJwtToken(
    @Param('username') refreshToken: string,
    @Param('userId') userId: string) {
    return this.authService.refreshJwtToken(refreshToken, userId);
  }

  /** 5. qquando scaduto anche il refresh, mi recupera di nuovo entrambi i token
   */
  @Post('refresh')
  async refreshBothTokens(
    @Param('userId') userId: string) {
    return this.authService.refreshBothTokens(userId);
  }






}
