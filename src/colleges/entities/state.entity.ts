import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the State' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the State' })
  name: string;
}