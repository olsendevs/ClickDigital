import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './entities/Customer.entity';
import { UserSchema } from 'src/user/entities/User.entity';
import { CustomerRepository } from './repositories/Customer.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UserService } from 'src/user/services/user.service';
import { UserRepository } from 'src/user/repositories/User.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    AuthService,
    AuthRepository,
    UserService,
    UserRepository,
  ],
})
export class CustomerModule {}
