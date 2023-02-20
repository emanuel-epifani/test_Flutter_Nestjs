import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Studente {
  @PrimaryColumn()
  nome: string;
  @Column({ nullable: true })
  cognome: string;
  @Column({ nullable: true })
  genere: string;
}
