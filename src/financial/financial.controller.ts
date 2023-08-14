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
import { FinancialService } from './services/financial.service';
import { CreateFinancialDto } from './dto/create-Financial.dto';
import { UpdateFinancialDto } from './dto/update-Financial.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('financial')
export class FinancialController {
  constructor(private readonly FinancialService: FinancialService) {}

  @UseGuards(RolesGuard)
  @Roles('default')
  @Post()
  create(@Body() createFinancialDto: CreateFinancialDto, @Req() request) {
    const userId = request.user.id;
    return this.FinancialService.create(createFinancialDto, userId);
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
    return this.FinancialService.findAll(userId, page, size);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.FinancialService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialDto: UpdateFinancialDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.FinancialService.update(id, updateFinancialDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.FinancialService.delete(id);
  }
}
