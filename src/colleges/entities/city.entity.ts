import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the City' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the City' })
  name: string;
}