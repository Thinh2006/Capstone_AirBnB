import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class BinhLuanDto {
  @ApiProperty()
  id: number;

  @IsNumber({}, { message: 'Mã phòng phải là số' })
  @ApiProperty()
  ma_phong: number;

  @IsNumber({}, { message: 'Mã người bình luận phải là số' })
  @ApiProperty()
  ma_nguoi_binh_luan: number;

  @IsDateString(
    {},
    {
      message: 'Ngày phải đúng định dạng (VD: 2023-11-10)',
    },
  )
  @ApiProperty({ example: '2023-12-05' })
  ngay_binh_luan: string;

  @ApiProperty()
  noi_dung: string;

  @IsNumber({}, { message: 'Sao bình luận phải là số' })
  @ApiProperty()
  sao_binh_luan: number;
}
