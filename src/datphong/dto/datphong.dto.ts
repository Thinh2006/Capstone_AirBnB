import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class DatPhongDto {
  @ApiProperty()
  id: number;

  @IsNumber({}, { message: 'Mã phòng phải là số' })
  @ApiProperty()
  ma_phong: number;

  @IsDateString(
    {},
    {
      message: 'Ngày bình luận phải đúng định dạng (VD: 2023-11-10)',
    },
  )
  @ApiProperty()
  ngay_den: string;

  @IsDateString(
    {},
    {
      message: 'Ngày bình luận phải đúng định dạng (VD: 2023-11-10)',
    },
  )
  @ApiProperty()
  ngay_di: string;

  @IsNumber({}, { message: 'Số lượng khách phải là số' })
  @ApiProperty()
  so_luong_khach: number;

  @IsNumber({}, { message: 'Mã người đặt phải là số' })
  @ApiProperty()
  ma_nguoi_dat: number;
}
