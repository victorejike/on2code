import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('api/v1/courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  getCourses() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  getCourse(@Param('id') id: string) {
    const course = this.coursesService.findOne(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  @Get(':id/modules')
  getModules(@Param('id') id: string) {
    const course = this.coursesService.findOne(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return { modules: this.coursesService.findModules(id) };
  }

  @Get(':id/modules/:moduleId')
  getModule(@Param('id') id: string, @Param('moduleId') moduleId: string) {
    const moduleItem = this.coursesService.findModule(id, moduleId);
    if (!moduleItem) {
      throw new NotFoundException('Module not found');
    }
    return moduleItem;
  }
}
