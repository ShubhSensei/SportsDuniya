import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity';
import { State } from './state.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the college' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the college' })
  name: string;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: 'The score of the college (1-1000)' })
  score: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  @ApiProperty({ description: 'The city where the college is located' })
  city: City;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  @ApiProperty({ description: 'The state where the college is located' })
  state: State;
}