import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TeacherService } from 'src/services/teacher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/domain/entities/teacher.entity';
import { TeacherModule } from 'src/modules/teacher.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
  TeacherModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, TeacherService, ]
})
export class AuthModule {}
