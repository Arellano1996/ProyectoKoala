import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limite?: number

    @IsOptional()
    @Min(0)
    @Type( () => Number )
    skip?: number
}