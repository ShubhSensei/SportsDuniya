import { Controller, Get, Param, Query } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { ApiTags, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { College } from './entities/college.entity';
// import { CollegePlacement } from './entities/college_placement.entity';
// import { CollegeWiseCourse } from './entities/college_wise_course.entity';
// import { City } from './entities/city.entity';
// import { State } from './entities/state.entity';

@ApiTags('Colleges')
@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get(':college_id/avg_section')
  @ApiParam({
    name: 'college_id',
    type: Number,
    description: 'The ID of the college to get average placement data',
  })
  @ApiResponse({
    status: 200,
    description: 'Average placement data for the specified college',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          year: { type: 'number', description: 'Year of the placement data' },
          avg_highest_placement: { type: 'number', description: 'Average highest placement' },
          avg_average_placement: { type: 'number', description: 'Average placement' },
          avg_median_placement: { type: 'number', description: 'Median placement' },
          avg_placement_rate: { type: 'number', description: 'Placement rate' },
        },
      },
    },
  })
  async getAvgSection(@Param('college_id') collegeId: number) {
    return this.collegesService.getAvgSection(collegeId);
  }

  @Get(':college_id/placement_section')
  @ApiParam({
    name: 'college_id',
    type: Number,
    description: 'The ID of the college to get placement section data',
  })
  @ApiResponse({
    status: 200,
    description: 'Placement data for the specified college',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          placement_rate: { type: 'number', description: 'Placement rate of the year' },
          highest_placement: { type: 'number', description: 'Highest placement achieved' },
          average_placement: { type: 'number', description: 'Average placement achieved' },
          median_placement: { type: 'number', description: 'Median placement achieved' },
          placement_trend: { type: 'string', description: 'Placement trend (UP, DOWN, NA)' },
        },
      },
    },
  })
  async getPlacementSection(@Param('college_id') collegeId: number) {
    return this.collegesService.getPlacementSection(collegeId);
  }

  @Get(':college_id/courses')
  @ApiParam({
    name: 'college_id',
    type: Number,
    description: 'The ID of the college to get its courses',
  })
  @ApiResponse({
    status: 200,
    description: 'List of courses offered by the specified college',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Course ID' },
          course_name: { type: 'string', description: 'Name of the course' },
          course_duration: { type: 'number', description: 'Duration of the course in years' },
          course_fee: { type: 'number', description: 'Fee of the course' },
        },
      },
    },
  })
  async getCollegeCourses(@Param('college_id') collegeId: number) {
    return this.collegesService.getCollegeCourses(collegeId);
  }

  @Get()
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city name' })
  @ApiQuery({ name: 'state', required: false, description: 'Filter by state name' })
  @ApiResponse({ status: 200, description: 'List of colleges', type: [College] })
  async getCollegesByCityOrState(
    @Query('city') city: string, 
    @Query('state') state: string
  ) {
    return this.collegesService.getCollegesByCityOrState(city, state);
  }
}