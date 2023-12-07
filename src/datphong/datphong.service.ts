import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatPhongDto } from './dto/datphong.dto';
import { DatPhong } from './entities/datphong.entity';

@Injectable()
export class DatphongService {
  prisma = new PrismaClient();

  async getAllDatPhong(): Promise<DatPhong[]> {
    const data = await this.prisma.datPhong.findMany();
    return data;
  }

  async postDatPhong(datPhongDto: DatPhongDto): Promise<DatPhong> {
    const newdata = await this.prisma.datPhong.create({
      data: {
        ma_phong: datPhongDto.ma_phong,
        ngay_den: new Date(datPhongDto.ngay_den).toISOString(),
        ngay_di: new Date(datPhongDto.ngay_di).toISOString(),
        so_luong_khach: datPhongDto.so_luong_khach,
        ma_nguoi_dat: datPhongDto.ma_nguoi_dat,
      },
    });
    return newdata;
  }

  async getByID(id: number): Promise<DatPhong> {
    const data = await this.prisma.datPhong.findFirst({
      where: {
        id: +id,
      },
    });
    if (!data) {
      throw new NotFoundException(
        `Không tìm thấy dữ liệu đặt phòng với id: ${id}`,
      );
    }
    return data;
  }

  async putDatPhong(id: number, datPhongDto: DatPhongDto): Promise<any> {
    const checkID = await this.prisma.datPhong.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      throw new NotFoundException(
        `Không tìm thấy dữ liệu đặt phòng với id: ${id}`,
      );
    }
    const data = await this.prisma.datPhong.update({
      where: {
        id: +id,
      },
      data: {
        ma_phong: datPhongDto.ma_phong,
        ngay_den: new Date(datPhongDto.ngay_den).toISOString(),
        ngay_di: new Date(datPhongDto.ngay_di).toISOString(),
        so_luong_khach: datPhongDto.so_luong_khach,
        ma_nguoi_dat: datPhongDto.ma_nguoi_dat,
      },
    });
    return data;
  }

  async removeDatPhong(id: number): Promise<string> {
    const checkID = await this.prisma.datPhong.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      throw new NotFoundException(
        `Không tìm thấy dữ liệu đặt phòng với id: ${id}`,
      );
    }
    return 'Xóa dữ liệu thành công';
  }

  async getByUserID(userID: number): Promise<DatPhong[]> {
    const data = await this.prisma.datPhong.findMany({
      where: {
        ma_nguoi_dat: +userID,
      },
    });
    if (!data) {
      throw new NotFoundException(
        `Không tìm thấy dữ liệu đặt phòng với mã người dùng: ${userID}`,
      );
    }
    return data;
  }
}
