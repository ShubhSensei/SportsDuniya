import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { College } from './college.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('college_placement')
export class CollegePlacement {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the college placement' })
  id: number;

  @ManyToOne(() => College)
  @JoinColumn({ name: 'college_id' })
  @ApiProperty({ description: 'The college associated with this placement record' })
  college: College;

  @Column()
  @ApiProperty({ description: 'The year of the placement record' })
  year: number;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    description: 'The highest placement recorded for the college in the given year',
    example: 50.0,
  })
  highest_placement: number;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    description: 'The average placement recorded for the college in the given year',
    example: 30.0,
  })
  average_placement: number;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    description: 'The median placement recorded for the college in the given year',
    example: 35.0,
  })
  median_placement: number;

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    description: 'The placement rate (percentage) for the college in the given year',
    example: 85.5,
  })
  placement_rate: number;
}
