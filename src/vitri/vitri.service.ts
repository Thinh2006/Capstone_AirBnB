import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ViTriDTO } from './dto/vitri.dto';

@Injectable()
export class VitriService {
  prisma = new PrismaClient();

  async findAll(): Promise<any> {
    return await this.prisma.viTri.findMany();
  }

  async create(body: ViTriDTO, nguoiTaoId: number): Promise<any> {
    return await this.prisma.viTri.create({
      data: { ...body, NguoiDung: { connect: { id: nguoiTaoId } } },
    });
  }

  async getAllAndPaging(
    pageIndex: number | null,
    pageSize: number | null,
    keyword: string | null,
  ): Promise<any> {
    const skip = pageIndex ? (pageIndex - 1) * pageSize : 0;
    const take = pageSize ? pageSize : undefined;

    const where = keyword
      ? {
          OR: [
            { tinh_thanh: { contains: keyword } },
            { quoc_gia: { contains: keyword } },
            { ten_vi_tri: { contains: keyword } },
          ],
        }
      : {};

    const vitris = await this.prisma.viTri.findMany({
      take,
      skip,
      where,
    });

    return vitris;
  }

  async getById(vitriId: number): Promise<any> {
    const checkVitri = await this.prisma.viTri.findUnique({
      where: { id: vitriId },
    });
    if (!checkVitri) {
      throw new NotFoundException('không có vị trí này trong hệ thống');
    } else {
      return checkVitri;
    }
  }

  async editById(
    body: ViTriDTO,
    vitriId: number,
    nguoiDungId: number,
  ): Promise<any> {
    const checkVitri = await this.prisma.viTri.findUnique({
      where: { id: vitriId },
    });
    if (!checkVitri) {
      throw new NotFoundException('không có vị trí này trong hệ thống');
    }

    if (checkVitri.nguoi_tao_id !== nguoiDungId) {
      throw new ForbiddenException('You are not allowed to edit this Vi tri');
    }

    return await this.prisma.viTri.update({
      where: { id: vitriId },
      data: { ...body },
    });
  }

  async deleteById(vitriId: number, nguoiDungId: number): Promise<any> {
    const checkVitri = await this.prisma.viTri.findUnique({
      where: { id: vitriId },
    });
    if (!checkVitri) {
      throw new NotFoundException('không có vị trí này trong hệ thống');
    }

    if (checkVitri.nguoi_tao_id !== nguoiDungId) {
      throw new ForbiddenException('You are not allowed to delete this vi tri');
    }

    return await this.prisma.viTri.delete({
      where: { id: vitriId },
    });
  }

  async upload(file: any, vitriId: number): Promise<any> {
    const imagePath = `uploads/${file.filename}`;
    const checkVitri = await this.prisma.viTri.findUnique({
      where: { id: vitriId },
      include: { NguoiDung: true },
    });

    if (!checkVitri) {
      throw new NotFoundException(`vitri with ID ${vitriId} not found`);
    }

    const updateVitri = await this.prisma.viTri.update({
      where: { id: vitriId },
      data: { hinh_anh: imagePath } as any,
    });
    return updateVitri;
  }
}
