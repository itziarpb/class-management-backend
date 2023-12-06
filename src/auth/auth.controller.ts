import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    //Register a new user
    @Post('/register')
    async register(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.authService.register(createUserDto)
    }

    //User login
    @Post('/login')
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
