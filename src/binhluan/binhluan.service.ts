import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Binhluan } from './entities/binhluan.entity';
import { BinhLuanDto } from './dto/binhluan.dto';

@Injectable()
export class BinhluanService {
  prisma = new PrismaClient();

  async getAll(): Promise<Binhluan[]> {
    const data = await this.prisma.binhLuan.findMany();
    return data;
  }

  async postComment(binhLuanDto: BinhLuanDto): Promise<Binhluan> {
    const data = await this.prisma.binhLuan.create({
      data: {
        ma_phong: binhLuanDto.ma_phong,
        ma_nguoi_binh_luan: binhLuanDto.ma_nguoi_binh_luan,
        ngay_binh_luan: new Date(binhLuanDto.ngay_binh_luan).toISOString(),
        noi_dung: binhLuanDto.noi_dung,
        sao_binh_luan: binhLuanDto.sao_binh_luan,
      },
    });
    return data;
  }

  async putComment(id: number, binhLuanDto: BinhLuanDto): Promise<Binhluan> {
    const checkID = await this.prisma.binhLuan.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      throw new NotFoundException(`Không tìm thấy bình luận với id: ${id}`);
    }

    const data = await this.prisma.binhLuan.update({
      where: {
        id: +id,
      },
      data: {
        ma_phong: binhLuanDto.ma_phong,
        ma_nguoi_binh_luan: binhLuanDto.ma_nguoi_binh_luan,
        ngay_binh_luan: new Date(binhLuanDto.ngay_binh_luan).toISOString(),
        noi_dung: binhLuanDto.noi_dung,
        sao_binh_luan: binhLuanDto.sao_binh_luan,
      },
    });
    return data;
  }

  async removeComment(id: number): Promise<string> {
    const checkID = await this.prisma.binhLuan.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      throw new NotFoundException(`Không tìm thấy bình luận với id: ${id}`);
    }
    return 'Xóa comment thành công';
  }

  async getCommentByMP(maPhong: number): Promise<Binhluan[]> {
    const data = await this.prisma.binhLuan.findMany({
      where: {
        ma_phong: +maPhong,
      },
    });
    if (!data) {
      throw new NotFoundException(
        `Không tìm thấy bình luận với mã phòng: ${maPhong}`,
      );
    }
    return data;
  }
}
