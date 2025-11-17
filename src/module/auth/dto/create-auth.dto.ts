import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Max, Min } from "class-validator";

export class Register {
    @IsString()
    @Length(3, 50)
    @ApiProperty()
    username: string;

    @IsEmail()
    @Length(3, 200)
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    @Length(8, 200)
    password: string;
}
export class Login {
    @ApiProperty()
    @IsString()
    @Length(3, 50)
    email: string;

    @ApiProperty()
    @Length(8, 200)
    @IsString()
    password: string;
}
export class Verify {
    @ApiProperty()
    @Min(100000)
    @Max(999999)
    @IsString()
    otp: string;

    @ApiProperty()
    @Length(3, 50)
    @IsString()
    email: string;
}
