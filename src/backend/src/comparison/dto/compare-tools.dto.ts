import { IsArray, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CompareToolsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  toolIds!: string[];
}
