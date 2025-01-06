<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Backend Developer Assignment

A backend application using NestJS and PostgreSQL to manage and query college-related data. 

### Database Design
- **Tables**:
  - **Colleges**: Stores college information with fields for `id`, `name`, `score`, `city_id`, and `state_id`.
  - **College_Placement**: Stores placement data for colleges with fields for `id`, `college_id`, `year`, `highest_placement`, `average_placement`, `median_placement`, and `placement_rate`.
  - **College_Wise_Course**: Stores course details for colleges with fields for `id`, `college_id`, `course_name`, `course_duration`, and `course_fee`.
  - **Cities**: Stores city information with fields for `id` and `name`.
  - **States**: Stores state information with fields for `id` and `name`.

### API Endpoints
1. **College Placements Data**
   - Endpoint: `/college_data/[college_id]`
     - **Section 1**: Returns average of placement fields grouped by year.
     - **Section 2**: Returns all placement data with a calculated `placement_trend` field.

2. **College Courses Data**
   - Endpoint: `/college_courses/{college_id}`
     - Returns all course data for a college, sorted by `course_fee` in descending order.

3. **City and State Filter for Colleges**
   - Endpoint: `/colleges`
     - Filters colleges by `city` or `state` query parameters.

### Authentication
- JWT-based authentication with login and signup functionality.
- Secure endpoints to ensure only authenticated users can access them.

### CRUD Operations
- Implementation of Create, Read, Update, and Delete operations for an additional entity.
- Request validation and edge-case handling.

### Hosting
- Hosted on **Render** with PostgreSQL as the database.
- Swagger API documentation is included.


## Installation Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory with the following variables:
     ```env
     DATABASE_URL=<your_postgresql_connection_string>
     JWT_SECRET=<your_jwt_secret>
     PORT=3000
     ```

4. **Run Database Migrations**:
   ```bash
   npm run typeorm:migration:run
   ```

5. **Seed the Database**:
   ```bash
   npm run seed
   ```

6. **Start the Server**:
   ```bash
   npm run start
   ```
   The application will be available at `http://localhost:3000`.


## API Documentation

Swagger documentation is available at:
```
https://sportsduniya-1.onrender.com/api
```


## Deployment

- **Base API URL**: [Deployed URL](<https://sportsduniya-1.onrender.com/colleges>)
- **Swagger Documentation URL**: [Swagger Docs](<https://sportsduniya-1.onrender.com/api>)


## Deliverables

- SQL scripts for table creation are available in the `/colleges/colleges.service.ts` folder.


This project is submitted as part of a backend developer assignment for evaluation purposes.
