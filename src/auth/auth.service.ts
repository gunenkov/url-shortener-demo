import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async signIn(userName: string, password: string) {
        if (userName != process.env.ADMIN_USERNAME || password != process.env.ADMIN_PASSWORD) {
            throw new UnauthorizedException();
        }
        const payload = { username: userName, sub: userName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
