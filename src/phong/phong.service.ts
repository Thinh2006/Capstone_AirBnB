import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPhongDTO } from './dto/create-phong.dto';
import { updatePhongDTO } from './dto/update-phong.dto';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();
  async findAll(): Promise<any> {
    const data = this.prisma.phong.findMany();
    return data;
  }

  async createPhong(
    createPhongDto: createPhongDTO,
    nguoiDungId: number,
  ): Promise<any> {
    const newPhong = await this.prisma.phong.create({
      data: {
        ...createPhongDto,
        ViTri: { connect: { id: createPhongDto.ViTri } },
        NguoiDung: { connect: { id: nguoiDungId } },
      } as any,
    });
    return newPhong;
  }

  async getPhongWithViTriById(viTriId: number): Promise<any> {
    const phongWithViTri = await this.prisma.phong.findMany({
      where: {
        vitri: viTriId,
      },
      include: {
        ViTri: true,
      },
    });
    return phongWithViTri;
  }

  async getPhongWithPagingAndSearch(
    pageIndex: number | null,
    pageSize: number | null,
    keyword: string | null,
  ): Promise<any> {
    const skip = pageIndex ? (pageIndex - 1) * pageSize : 0;
    const take = pageSize ? pageSize : undefined;

    const where = keyword
      ? {
          OR: [
            { ten_phong: { contains: keyword } },
            { mo_ta: { contains: keyword } },
          ],
        }
      : {};

    const phongs = await this.prisma.phong.findMany({
      take,
      skip,
      where,
      include: {
        ViTri: true,
      },
    });

    return phongs;
  }

  async getPhongById(phongId: number): Promise<any> {
    const phong = await this.prisma.phong.findUnique({
      where: { id: phongId },
    });

    if (!phong) {
      throw new NotFoundException(`Phong with ID ${phongId} not found`);
    }

    return phong;
  }

  async editPhongById(
    phongId: number,
    updatePhongDto: updatePhongDTO,
    nguoidungId: number,
  ): Promise<any> {
    const existingPhong = await this.prisma.phong.findUnique({
      where: { id: phongId },
      include: { NguoiDung: true }, // Include NguoiDung relation
    });

    if (!existingPhong) {
      throw new NotFoundException(`Phong with ID ${phongId} not found`);
    }

    if (existingPhong.nguoi_dung_id !== nguoidungId) {
      throw new ForbiddenException('You are not allowed to edit this Phong');
    }

    const updatedPhong = await this.prisma.phong.update({
      where: { id: phongId },
      data: updatePhongDto as any,
    });

    return updatedPhong;
  }
  async deletePhongById(phongId: number, nguoidungId: number): Promise<void> {
    const existingPhong = await this.prisma.phong.findUnique({
      where: { id: phongId },
      include: { NguoiDung: true }, // Include NguoiDung relation
    });

    if (!existingPhong) {
      throw new NotFoundException(`Phong with ID ${phongId} not found`);
    }

    if (existingPhong.nguoi_dung_id !== nguoidungId) {
      throw new ForbiddenException('You are not allowed to delete this Phong');
    }

    await this.prisma.phong.delete({
      where: { id: phongId },
      include: { NguoiDung: true },
    });
  }
  async uploadPhongImage(file: any, phongId: number): Promise<any> {
    const imagePath = `uploads/${file.filename}`;
    const existingPhong = await this.prisma.phong.findUnique({
      where: { id: phongId },
      include: { NguoiDung: true }, // Include NguoiDung relation
    });

    if (!existingPhong) {
      throw new NotFoundException(`Phong with ID ${phongId} not found`);
    }

    // Update the avatar field in Phong
    const updatedPhong = await this.prisma.phong.update({
      where: { id: phongId },
      data: { hinh_anh: imagePath } as any,
    });
    return updatedPhong;
  }
}
