import {
  IsArray,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  MinLength,
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
}
