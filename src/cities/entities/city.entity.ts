import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'cities'})
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '100' })
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;
}
