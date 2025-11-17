import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Max, Min } from "class-validator";

export class Register {
    @IsString()
    @Length(3, 50)
    @ApiProperty({ example: "rahmatjon", })
    username: string;

    @IsEmail()
    @Length(3, 200)
    @ApiProperty({ example: "rahmatjon@gmail.com", })
    email: string;

    @IsString()
    @Length(8, 200)
    @ApiProperty({ example: "admin123!", })
    password: string;
}


export class Login {
    @ApiProperty({ example: "rahmatjon@gmail.com", })
    @IsString()
    @Length(3, 50)
    email: string;

    @ApiProperty({ example: "admin123!", })
    @Length(8, 200)
    @IsString()
    password: string;
}


export class Verify {
    @ApiProperty({ example: "123456", })
    @Min(100000)
    @Max(999999)
    @IsString()
    otp: string;

    @ApiProperty({ example: "rahmatjon@gmail.com", })
    @Length(3, 50)
    @IsString()
    email: string;
}
