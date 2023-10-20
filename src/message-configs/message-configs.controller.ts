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
} from '@nestjs/common';
import { MessageConfigsService } from './services/message-configs.service';
import { CreateMessageConfigDto } from './dto/create-message-config.dto';
import { UpdateMessageConfigDto } from './dto/update-message-config.dto';
import { Roles, RolesGuard } from 'src/auth/jwt/role.guard';

@Controller('MessageConfigs')
export class MessageConfigsController {
  constructor(private readonly MessageConfigsService: MessageConfigsService) {}

  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Post()
  create(
    @Body() createMessageConfigsDto: CreateMessageConfigDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.MessageConfigsService.create(createMessageConfigsDto, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Get()
  findByUserId(@Req() request) {
    const userId = request.user.id;
    return this.MessageConfigsService.findByUserId(userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.id;
    return this.MessageConfigsService.findOne(id, userId);
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageConfigsDto: UpdateMessageConfigDto,
    @Req() request,
  ) {
    const userId = request.user.id;
    return this.MessageConfigsService.update(
      id,
      updateMessageConfigsDto,
      userId,
    );
  }
  @UseGuards(RolesGuard)
  @Roles('default', 'admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.MessageConfigsService.delete(id);
  }
}
