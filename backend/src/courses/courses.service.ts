import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses = [
    {
      id: 'course-1',
      slug: 'cs50-bootcamp',
      title: 'CS50-style Programming Bootcamp',
      subtitle: 'Foundations of software engineering and full-stack development',
      status: 'published',
      coverImage: null
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    return this.courses.find((course) => course.id === id);
  }
}
