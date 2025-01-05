import { DataSource } from 'typeorm';
// import { createDatabase, dropDatabase, runSeeders, useSeederFactory } from 'typeorm-extension';
import { AppDataSource } from './data-source';
import { faker } from '@faker-js/faker';
import { College } from './colleges/entities/college.entity';
import { CollegePlacement } from './colleges/entities/college_placement.entity';
import { CollegeWiseCourse } from './colleges/entities/college_wise_course.entity';
import { City } from './colleges/entities/city.entity';
import { State } from './colleges/entities/state.entity';
import { createDatabase } from 'typeorm-extension';


async function seed() {
    

  await createDatabase({ ifNotExist: true });

  const dataSource: DataSource = await AppDataSource.initialize();

  // Step 1: Seed States
  const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
  const stateEntities = states.map((name) => AppDataSource.getRepository(State).create({ name }));
  await AppDataSource.getRepository(State).save(stateEntities);

  // Step 2: Seed Cities
  const cities = ['Los Angeles', 'Houston', 'Chicago', 'Miami', 'Austin'];
  const cityEntities = cities.map((name) => AppDataSource.getRepository(City).create({ name }));
  await AppDataSource.getRepository(City).save(cityEntities);

  // Step 3: Seed Colleges
  for (let i = 0; i < 10; i++) {
    const college = AppDataSource.getRepository(College).create({
      name: faker.company.name(),
      score: faker.number.int({ min: 1, max: 1000 }),
      city: cityEntities[faker.number.int({ min: 0, max: cities.length - 1 })],
      state: stateEntities[faker.number.int({ min: 0, max: states.length - 1 })],
    });
    await AppDataSource.getRepository(College).save(college);

    // Step 4: Seed College Placements
    for (let year = 2018; year <= 2023; year++) {
      const placement = AppDataSource.getRepository(CollegePlacement).create({
        college,
        year,
        highest_placement: faker.number.int({ min: 50000, max: 200000 }),
        average_placement: faker.number.int({ min: 30000, max: 150000 }),
        median_placement: faker.number.int({ min: 25000, max: 100000 }),
        placement_rate: faker.number.float({ min: 50, max: 100, precision: 0.01 }),
      });
      await AppDataSource.getRepository(CollegePlacement).save(placement);
    }

    // Step 5: Seed College Courses
    for (let j = 0; j < 5; j++) {
      const course = AppDataSource.getRepository(CollegeWiseCourse).create({
        college,
        course_name: faker.helpers.arrayElement(['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Business Administration']),
        course_duration: faker.number.int({ min: 1, max: 4 }),
        course_fee: faker.number.int({ min: 10000, max: 500000 }),
      });
      await AppDataSource.getRepository(CollegeWiseCourse).save(course);
    }
  }

  console.log('Seeding completed!');
  await dataSource.destroy();
}

seed().catch((error) => console.error('Error seeding database:', error));
