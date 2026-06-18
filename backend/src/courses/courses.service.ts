import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses = [
    {
      id: 'cs50x-2021',
      slug: 'cs50x-2021',
      title: 'CS50x 2021',
      subtitle: 'Foundations of computer science and full-stack development',
      description:
        'A structured CS50-style curriculum covering programming, data structures, web development, and ethics.',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      modules: [
        {
          id: 'module-0',
          title: 'Week 0: Scratch',
          description: 'Visual programming fundamentals with Scratch.',
          position: 0
        },
        {
          id: 'module-1',
          title: 'Week 1: C',
          description: 'Introduction to C, data types, and basic algorithms.',
          position: 1
        },
        {
          id: 'module-2',
          title: 'Week 2: Arrays',
          description: 'Learn arrays, memory layout, and simple searching.',
          position: 2
        },
        {
          id: 'module-3',
          title: 'Week 3: Algorithms',
          description: 'Study sorting, searching, and algorithmic thinking.',
          position: 3
        },
        {
          id: 'module-4',
          title: 'Week 4: Memory',
          description: 'Understand pointers, memory allocation, and debugging.',
          position: 4
        },
        {
          id: 'module-5',
          title: 'Week 5: Data Structures',
          description: 'Build linked lists, hash tables, and maps.',
          position: 5
        },
        {
          id: 'module-6',
          title: 'Week 6: Python',
          description: 'Switch to Python and explore scripting for real problems.',
          position: 6
        },
        {
          id: 'module-7',
          title: 'Week 7: SQL',
          description: 'Design databases, write SQL queries, and manage data.',
          position: 7
        },
        {
          id: 'module-8',
          title: 'Week 8: Web Development',
          description: 'Build modern HTML, CSS, and JavaScript applications.',
          position: 8
        },
        {
          id: 'module-9',
          title: 'Week 9: Flask',
          description: 'Create backend web apps using Flask and deploy APIs.',
          position: 9
        },
        {
          id: 'module-10',
          title: 'Week 10: Ethics',
          description: 'Explore ethics, privacy, and responsible computing.',
          position: 10
        },
        {
          id: 'module-security',
          title: 'Security',
          description: 'Learn secure design patterns and threat modeling.',
          position: 11
        },
        {
          id: 'module-ai',
          title: 'Artificial Intelligence',
          description: 'Intro to AI techniques, search, and machine learning.',
          position: 12
        }
      ]
    }
  ];

  findAll() {
    return this.courses.map(({ id, slug, title, subtitle, description, level, status }) => ({
      id,
      slug,
      title,
      subtitle,
      description,
      level,
      status
    }));
  }

  findOne(id: string) {
    return this.courses.find((course) => course.id === id || course.slug === id);
  }

  findModules(courseId: string) {
    const course = this.findOne(courseId);
    return course?.modules || [];
  }

  findModule(courseId: string, moduleId: string) {
    const modules = this.findModules(courseId);
    return modules.find((module) => module.id === moduleId);
  }
}
