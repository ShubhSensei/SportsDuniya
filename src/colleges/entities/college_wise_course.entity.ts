import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { College } from './college.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('college_wise_course')
export class CollegeWiseCourse {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the course' })
  id: number;

  @ManyToOne(() => College)
  @JoinColumn({ name: 'college_id' })
  @ApiProperty({ description: 'The college offering the course' })
  college: College;

  @Column()
  @ApiProperty({ description: 'The name of the course', example: 'Computer Science' })
  course_name: string;

  @Column({ type: 'int' })
  @ApiProperty({
    description: 'The duration of the course in years',
    example: 4,
  })
  course_duration: number;

  @Column('decimal')
  @ApiProperty({
    description: 'The fee of the course in the specified currency',
    example: 150000.50,
  })
  course_fee: number;
}
