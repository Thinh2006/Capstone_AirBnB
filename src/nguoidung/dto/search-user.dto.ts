import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  name: string;
}
