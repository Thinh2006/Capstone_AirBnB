import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class createPhongDTO {
  @ApiProperty()
  ten_phong: string;
  @ApiProperty()
  @IsNumber()
  khach: number;
  @ApiProperty()
  phong_ngu: number;
  @ApiProperty()
  @IsNumber()
  giuong: number;
  @ApiProperty()
  @IsNumber()
  phong_tam: number;
  @ApiProperty()
  mo_ta: string;
  @ApiProperty()
  gia_tien: number;
  @ApiProperty()
  may_giat: boolean;
  @ApiProperty()
  ban_la: boolean;
  @ApiProperty()
  tivi: boolean;
  @ApiProperty()
  dieu_hoa: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  bep: boolean;
  @ApiProperty()
  do_xe: boolean;
  @ApiProperty()
  ho_boi: boolean;
  @ApiProperty()
  ban_ui: boolean;
  @ApiProperty()
  @IsNumber()
  ViTri: number;
  @ApiProperty()
  hinh_anh: string = 'hinhanh.img';
}
