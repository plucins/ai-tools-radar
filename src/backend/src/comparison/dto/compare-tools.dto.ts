import {
  IsArray,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  MinLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CompareToolsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  toolIds!: string[];

  @IsOptional()
  @IsString()
  @MinLength(1)
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  temperature?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  top_p?: number;

  @IsOptional()
  @IsNumber()
  @Min(-2)
  @Max(2)
  frequency_penalty?: number;

  @IsOptional()
  @IsNumber()
  @Min(-2)
  @Max(2)
  presence_penalty?: number;
}
