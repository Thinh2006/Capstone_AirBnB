import { BinhluanService } from './binhluan.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinhLuanDto } from './dto/binhluan.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enum/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Binhluan } from './entities/binhluan.entity';

@ApiTags('BinhLuan')
@Controller('binh-luan')
@ApiBearerAuth()
export class BinhluanController {
  constructor(private readonly binhluanService: BinhluanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(): Promise<Binhluan[]> {
    return this.binhluanService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({ status: 201, description: 'Tạo comment thành công' })
  postComment(@Body() binhLuanDto: BinhLuanDto): Promise<Binhluan> {
    return this.binhluanService.postComment(binhLuanDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Sửa comment thành công' })
  putComment(
    @Param('id') id: number,
    @Body() binhLuanDto: BinhLuanDto,
  ): Promise<Binhluan> {
    return this.binhluanService.putComment(id, binhLuanDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa comment thành công' })
  removeComment(@Param('id') id: number): Promise<string> {
    return this.binhluanService.removeComment(id);
  }

  @Get('lay-binh-luan-theo-phong/:MaPhong')
  getCommentByMP(@Param('MaPhong') maPhong: number): Promise<Binhluan[]> {
    return this.binhluanService.getCommentByMP(maPhong);
  }
}
