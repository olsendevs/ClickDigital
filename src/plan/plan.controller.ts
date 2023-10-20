import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PlanService } from './services/plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('Plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Post()
  create(@Body() createPlanDto: CreatePlanDto, @Req() request) {
    const userId = request.user.id;
    return this.planService.create(createPlanDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Get()
  findAll(
    @Req() request,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    page ? page : (page = 1);
    size ? size : (size = 5);

    const userId = request.user.id;
    return this.planService.findAll(userId, page, size);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.planService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.planService.update(id, updatePlanDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.delete(id);
  }
}
