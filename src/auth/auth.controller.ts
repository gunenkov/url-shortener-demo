import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiTags('auth')
    @ApiOperation({ summary: 'Авторизация' })
    signIn(@Body() UserDto: UserDto) {
        return this.authService.signIn(UserDto.userName, UserDto.password);
    }
}
