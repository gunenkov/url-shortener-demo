import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsUrl } from 'class-validator';

export class CreateUrlDto {
    @ApiProperty()
    @IsUrl()
    longUrl: string;

    @ApiProperty()
    @IsAlphanumeric()
    token: string;

    @ApiProperty()
    isActive: boolean = true;
}
