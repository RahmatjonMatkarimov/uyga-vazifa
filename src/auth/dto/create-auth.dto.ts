import { IsEmail, IsString, Length, Max, Min } from "class-validator";

export class Register {
    @IsString()
    @Length(3, 50)
    username: string;

    @IsEmail()
    @Length(3, 200)
    email: string;

    @IsString()
    @Length(8, 200)
    password: string;
}
export class Login {
    @IsString()
    @Length(3, 50)
    email: string;
    
    @Length(8, 200)
    @IsString()
    password: string;
}
export class Verify {
    @Min(100000)
    @Max(999999)
    @IsString()
    otp: string;
    
    @Length(3, 50)
    @IsString()
    email: string;
}
