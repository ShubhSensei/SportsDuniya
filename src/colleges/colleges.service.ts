import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './entities/college.entity';
import { CollegePlacement } from './entities/college_placement.entity';
import { CollegeWiseCourse } from './entities/college_wise_course.entity';

@Injectable()
export class CollegesService {

  constructor(
    @InjectRepository(College)
    private collegesRepository: Repository<College>,
    @InjectRepository(CollegePlacement)
    private collegePlacementRepository: Repository<CollegePlacement>,
    @InjectRepository(CollegeWiseCourse)
    private collegeWiseCourseRepository: Repository<CollegeWiseCourse>,
  ) {}


  async getAvgSection(collegeId: number) {
    const placements = await this.collegePlacementRepository
      .createQueryBuilder('placement')
      .select('placement.year', 'year')
      .addSelect('AVG(placement.highest_placement)', 'avg_highest_placement')
      .addSelect('AVG(placement.average_placement)', 'avg_average_placement')
      .addSelect('AVG(placement.median_placement)', 'avg_median_placement')
      .addSelect('AVG(placement.placement_rate)', 'avg_placement_rate')
      .where('placement.college_id = :collegeId', { collegeId })
      .andWhere('placement.highest_placement IS NOT NULL AND placement.highest_placement != 0')
      .andWhere('placement.average_placement IS NOT NULL AND placement.average_placement != 0')
      .andWhere('placement.median_placement IS NOT NULL AND placement.median_placement != 0')
      .andWhere('placement.placement_rate IS NOT NULL AND placement.placement_rate != 0')
      .groupBy('placement.year')
      .getRawMany();

    return placements;
  }

  async getPlacementSection(collegeId: number) {
    const placements = await this.collegePlacementRepository.find({
      where: { college: { id: collegeId } },
    });

    const sortedPlacements = placements.filter(
      (placement) =>
        placement.placement_rate > 0 &&
        placement.highest_placement > 0 &&
        placement.average_placement > 0 &&
        placement.median_placement > 0,
    );

    sortedPlacements.forEach((placement, index, array) => {
      if (index >= 1) {
        const prevRate = array[index - 1].placement_rate;
        placement['placement_trend'] =
          placement.placement_rate > prevRate ? 'UP' : 'DOWN';
      } else {
        placement['placement_trend'] = 'NA'; // No trend for the first year
      }
    });

    return sortedPlacements;
  }

  async getCollegeCourses(collegeId: number) {
    return this.collegeWiseCourseRepository.find({
      where: { college: { id: collegeId } },
      order: { course_fee: 'DESC' },
    });
  }

  async getCollegesByCityOrState(city: string, state: string) {
    const query = this.collegesRepository.createQueryBuilder('college')
      .leftJoinAndSelect('college.city', 'city')
      .leftJoinAndSelect('college.state', 'state');

    if (city) {
      query.andWhere('city.name = :city', { city });
    }

    if (state) {
      query.andWhere('state.name = :state', { state });
    }

    return query.getMany();
  }
}