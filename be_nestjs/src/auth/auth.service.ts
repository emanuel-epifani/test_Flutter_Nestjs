// noinspection SpellCheckingInspection

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}


  /**
   * - registra l'utente nel db
   * - generea un jwt e un refreshToken per questo utente e li passa al fe
   */
  async registerUser(username: string, password: string) {
    // Check if user exists
    const userExists = await this.userModel.findOne({ username: username})

    if (userExists) {
      throw new BadRequestException('User already exists');
    } else {
      //creo l'utente (password criptata, jwt e refresh)
      let payload = { username: username, password: password}
      let jwtToken = await this.jwtService.signAsync(payload)
      let refreshToken = await this.jwtService.signAsync(payload)
      const newUser = new this.userModel({
        username: username,
        password: await bcrypt.hash(password, 10),
        refreshToken: refreshToken
      });
      //lo registro nel db
      await newUser.save();
      //restituisco al fe lo user con il suo refresh token e il suo jwt
      return {
        username: newUser.username,
        userId: newUser.id,
        access_token_jwt: jwtToken,
        refreshToken: newUser.refreshToken
      }
    }

  }

  async debug(){

  }




  /**
   * FATTO
   * guarda nel db se esite un utente con qst credenziali,
   * - se lo user e corretto => passa questa guardia e puo esser chiamata la funzione "login_getToken()",
   * - altrimenti => lancia l'eccezione "utente non trovato / credenziali errate"
   */
  async validateUser(username: string, password: string) {
    await this.userModel.syncIndexes();
    let user = await this.userModel.findOne({username: username}).exec()

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      if (user.password == password) {
        return { username: user.username };
      } else {
        throw new UnauthorizedException('Incorrect Credentials');
      }
    }

  }




  /**
   * se el credenziali passate dall'utente sono correte si supera la guardia @UseGuards(AuthGuard('local')
   * e puo essere chiamato questo metodo che dato un user in input mi genera un token e lo passa al fe
   */
  async login_getToken(username: string, password: string) {
    await this.userModel.syncIndexes();
    let userExists = await this.userModel.findOne({username: username}).exec()

      if(!userExists){
        throw new NotFoundException('User not found');
      } else {
        if(password != userExists.password) {
          throw new BadRequestException('Password is incorrect');
        } else {
          return {
            username: userExists.username,
            userId: userExists.id,
            access_token_jwt: await this.jwtService.signAsync(userExists),
            refresh_token: userExists.refreshToken
          }
        }

      }
    }




  /**
   * se in eguito ad una precedente chiamata dal fe é risultato il jwt scaduto,
   * chiamo qst API che riceve il refreshToken, vede se é valido:
   * - se lo é => genera un nuovo Jwt e un'altro Refresh e li rimanda al frontend
   * - se non lo é => lancia un'eccezione di accesso non autorizzato
   */
  async refreshJwtToken(refreshToken: string, userId: string) {
      let user = await this.userModel.findById(userId);

      if (!user || user.refreshToken !== refreshToken) {
        throw new ForbiddenException('Access Denied');

      } else {
          const isRefreshTokenValid = this.jwtService.verify(refreshToken);

          if(!isRefreshTokenValid){
            throw new ForbiddenException('Refresh Token non valido');
          } else {
            return {
              username: user.username,
              userId: user.id,
              access_token_jwt: await this.jwtService.signAsync(user),
            };
          }

      }
  }


  async refreshBothTokens(userId: string) {
    let user = await this.userModel.findById(userId);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    } else {
      return {
        username: user.username,
        userId: user.id,
        access_token_jwt: await this.jwtService.signAsync(user),
        refreshToken: await this.jwtService.signAsync(user),
      };
    }
  }


  }






