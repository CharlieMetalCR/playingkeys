import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProgressDto: CreateProgressDto, @Request() req: { user: { id: string; role: string } }) {
    if (req.user.role === 'STUDENT') {
      createProgressDto.studentId = req.user.id;
    }
    return this.progressService.create(createProgressDto);
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.progressService.findByStudent(studentId);
  }

  @Get('lesson/:lessonId')
  findByLesson(@Param('lessonId') lessonId: string) {
    return this.progressService.findByLesson(lessonId);
  }
}
