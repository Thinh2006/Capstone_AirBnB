import { SignUpDto } from './../auth/dto/register.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NguoidungService } from './nguoidung.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('NguoiDung')
@Controller('users')
export class NguoidungController {
  constructor(private readonly nguoiDungService: NguoidungService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.nguoiDungService.getAll();
  }

  @Post()
  postUser(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.nguoiDungService.postUser(signUpDto);
  }

  @Delete()
  removeUser(@Query('id') id: number): Promise<string> {
    return this.nguoiDungService.removeUser(id);
  }

  @Get('phan-trang-tim-kiem')
  searchUserPagination(@Query() searchUserDto: SearchUserDto): Promise<User[]> {
    return this.nguoiDungService.searchUserPagination(searchUserDto);
  }

  @Get(':id')
  getByID(@Param('id') id: number): Promise<User[]> {
    return this.nguoiDungService.getByID(id);
  }

  @Put(':id')
  putUser(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserDto,
  ): Promise<any> {
    return this.nguoiDungService.putUser(id, updateDto);
  }

  @Get('search/:TenNguoiDung')
  searchUser(@Param('TenNguoiDung') name: string): Promise<User[]> {
    return this.nguoiDungService.searchUser(name);
  }
}
