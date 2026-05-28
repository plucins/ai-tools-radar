import { IsArray, IsString, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class GetToolsQueryDto {
  // reserved for future filtering params
}

export class ToolIdDto {
  @IsString()
  id!: string;
}

export class ToolIdsDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  ids!: string[];
}
