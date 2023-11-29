import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTeacherDto } from 'src/domain/dtos/create-teacher.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('/register')
    async register(
        @Body() createTeacherDto: CreateTeacherDto
    ) {
        return this.authService.register(createTeacherDto)
    }

    @Post('login')
    async login(
        @Body() LoginDto: LoginDto
    ) {
        return this.authService.login(LoginDto)
    }
}
