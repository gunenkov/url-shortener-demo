import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    password: string;
}