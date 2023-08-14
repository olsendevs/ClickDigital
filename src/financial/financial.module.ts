import { Module } from '@nestjs/common';
import { FinancialService } from './services/financial.service';
import { FinancialController } from './financial.controller';
import { FinancialRepository } from './repositories/Financial.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialSchema } from './entities/Financial.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Financial',
        schema: FinancialSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [FinancialController],
  providers: [
    FinancialService,
    FinancialRepository,
    AuthService,
    AuthRepository,
    UserService,
    UserRepository,
  ],
})
export class FinancialModule {}
