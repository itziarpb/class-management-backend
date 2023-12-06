import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
