import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TEACHER')
  @Get('me/students')
  findOwnStudents(@Request() req: { user: { id: string } }) {
    return this.teacherService.findOwnStudents(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
