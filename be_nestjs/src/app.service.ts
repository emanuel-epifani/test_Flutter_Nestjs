import { Injectable, OnApplicationBootstrap  } from '@nestjs/common';

@Injectable()
export class AppService {


   onApplicationBootstrap() {
      console.log('Server avviato!');
      // Qui puoi eseguire l'operazione che desideri,e testare funzioni/modifiche come fosse una main() function dei compilati
    }



}
