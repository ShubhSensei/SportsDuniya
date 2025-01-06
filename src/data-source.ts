import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { College } from './colleges/entities/college.entity';
import { CollegePlacement } from './colleges/entities/college_placement.entity';
import { CollegeWiseCourse } from './colleges/entities/college_wise_course.entity';
import { City } from './colleges/entities/city.entity';
import { State } from './colleges/entities/state.entity';
import * as dotenv from 'dotenv';

// dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [College, CollegePlacement, CollegeWiseCourse, City, State],
    migrations: [],
    subscribers: [],
});

