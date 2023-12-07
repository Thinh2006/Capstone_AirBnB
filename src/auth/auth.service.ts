import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SignUpDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configServive: ConfigService,
  ) {}
  prisma = new PrismaClient();

  async signUp(signUpDto: SignUpDto): Promise<any> {
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
          role: Role.USER,
        },
      });
      return newData;
    }
  }

  async logIn(logInDto: LogInDto): Promise<string> {
    const data = await this.prisma.nguoiDung.findFirst({
      where: {
        email: logInDto.email,
      },
    });

    if (data) {
      const isPassword = bcrypt.compareSync(logInDto.pass_word, data.pass_word);
      if (isPassword) {
        const token = this.jwtService.sign(
          { data: data },
          {
            expiresIn: this.configServive.get('EXPIRE_IN'),
            secret: this.configServive.get('SECRET_KEY'),
          },
        );
        return token;
      } else {
        return 'Password không đúng';
      }
    } else {
      return 'Email không tồn tại';
    }
  }
}
