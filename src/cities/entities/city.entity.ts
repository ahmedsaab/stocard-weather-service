import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'cities'})
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: '100', nullable: false })
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;
}
