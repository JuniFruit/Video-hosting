import { IsBoolean, IsNumber, IsString, ValidateIf } from "class-validator";

export class VideoDto {
    @IsString()
    name!: string

    @IsString()
    description!: string

    @IsString()
    videoPath!: string

    @IsString()
    thumbnailPath!: string

    @ValidateIf(o => o.isPublic !== undefined)
    @IsBoolean()
    isPublic?: boolean

    @ValidateIf(o => o.duration !== undefined)
    @IsNumber()
    duration?: number;

    @ValidateIf(o => o.isProcessing !== undefined)
    @IsBoolean()
    isProcessing?: boolean
}