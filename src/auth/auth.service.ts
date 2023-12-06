import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  //Register a new user
  async register({ name, email, password }: CreateUserDto) {
    const user = await this.userService.findOne(email);
    if (user) {
      throw new BadRequestException('User already exists')
    }
    return await this.userRepo.save({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
  }

  //User login
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    const payload = { email: user.email };
    const tokenUser = await this.jwtService.signAsync(payload);

    return tokenUser;

  }




}
