import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    //Register a new teacher
    @Post('/register')
    async register(
        @Body() createTeacherDto: CreateTeacherDto
    ) {
        return this.authService.register(createTeacherDto)
    }

    //Teacher login
    @Post('login')
    async login(
        @Body() LoginDto: LoginDto
    ) {
        return this.authService.login(LoginDto)
    }

    //Llamada de prueba. Borrar
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
