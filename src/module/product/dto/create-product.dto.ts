import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "iPhone 16",
        description: "Mahsulot nomi",
    })
    title: string;

    @ApiProperty({
        example: "shunchaki",
        description: "Mahsulot haqida to‘liq ma’lumot",
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 1000,
        description: "Mahsulot narxi",
    })
    @IsNotEmpty()
    @IsNumber()
    prise: number;
}
