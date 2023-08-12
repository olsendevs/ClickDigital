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
import { ServiceService } from './services/service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Req() request) {
    const userId = request.user.id;
    return this.serviceService.create(createServiceDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get()
  findAll(
    @Req() request,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    page ? page : (page = 1);
    size ? size : (size = 5);

    const userId = request.user.id;
    return this.serviceService.findAll(userId, page, size);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.serviceService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.serviceService.update(id, updateServiceDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
