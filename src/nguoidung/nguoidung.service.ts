import { SignUpDto } from './../auth/dto/register.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// import * as jwt from 'jsonwebtoken'

@Injectable()
export class NguoidungService {
  prisma = new PrismaClient();

  async getAll(): Promise<User[]> {
    const data = await this.prisma.nguoiDung.findMany();
    return data;
  }

  async postUser(signUpDto: SignUpDto): Promise<any> {
    const checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email: signUpDto.email,
      },
    });
    if (checkEmail) {
      return 'Email đã tồn tại';
    } else {
      const newData = await this.prisma.nguoiDung.create({
        data: {
          name: signUpDto.name,
          email: signUpDto.email,
          pass_word: bcrypt.hashSync(signUpDto.pass_word, 10),
          phone: signUpDto.phone,
          birth_day: signUpDto.birth_day,
          gender: signUpDto.gender ? 'Male' : 'Female',
          role: signUpDto.role.toLowerCase(),
        },
      });
      return newData;
    }
  }

  async removeUser(id: number): Promise<string> {
    const checkID = await this.prisma.nguoiDung.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      throw new NotFoundException(`Không tìm thấy người dùng có id: ${id}`);
    }

    await this.prisma.nguoiDung.delete({
      where: {
        id: +id,
      },
    });
    return 'Xóa người dùng thành công';
  }

  async searchUserPagination(searchUserDto: SearchUserDto): Promise<User[]> {
    const { pageIndex, pageSize, name } = searchUserDto;
    const index = (+pageIndex - 1) * +pageSize;
    const data = this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: +index,
      take: +pageSize,
    });
    return data;
  }

  async getByID(id: number): Promise<User[]> {
    const data = await this.prisma.nguoiDung.findMany({
      where: {
        id: +id,
      },
    });
    return data;
  }

  async putUser(id: number, updateDto: UpdateUserDto): Promise<any> {
    const checkID = await this.prisma.nguoiDung.findFirst({
      where: {
        id: +id,
      },
    });
    if (!checkID) {
      return `Không tồn tại người dùng với id: ${id}`;
    }

    if (updateDto.email !== checkID.email) {
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email: updateDto.email,
        },
      });
      if (checkEmail) {
        return 'Email đã tồn tại';
      }
    }

    const data = await this.prisma.nguoiDung.update({
      where: {
        id: +id,
      },
      data: {
        name: updateDto.name,
        email: updateDto.email,
        phone: updateDto.phone,
        birth_day: updateDto.birth_day,
        gender: updateDto.gender ? 'Male' : 'Female',
        role: updateDto.role,
      },
    });
    return data;
  }

  async searchUser(name: string): Promise<User[]> {
    const data = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return data;
  }
}
