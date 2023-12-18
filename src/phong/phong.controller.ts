import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createPhongDTO } from './dto/create-phong.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { updatePhongDTO } from './dto/update-phong.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Phong')
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  findAll(): Promise<any> {
    return this.phongService.findAll();
  }
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPhongDto: createPhongDTO, @Req() req): Promise<any> {
    return this.phongService.createPhong(createPhongDto, req.user.data.id);
  }

  @Get('lay-phong-theo-vi-tri')
  async getPhongWithViTri(@Query('maViTri') vitriId: number) {
    const phongWithViTri = await this.phongService.getPhongWithViTriById(
      Number(vitriId),
    );
    return phongWithViTri;
  }

  @Get('phan-trang-tim-kiem')
  @ApiQuery({
    name: 'pageIndex',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    required: false,
  })
  async getPhongWithPagingAndSearch(
    @Query('pageIndex') pageIndex: string | null,
    @Query('pageSize') pageSize: string | null,
    @Query('keyword') keyword: string | null,
  ): Promise<any> {
    const paginatedPhongs = await this.phongService.getPhongWithPagingAndSearch(
      pageIndex ? parseInt(pageIndex, 10) : null,
      pageSize ? parseInt(pageSize, 10) : null,
      keyword,
    );
    return paginatedPhongs;
  }

  @Get(':id')
  async getPhongById(@Param('id') id: number): Promise<any> {
    return await this.phongService.getPhongById(Number(id));
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async EditPhongById(
    @Body() updateDto: updatePhongDTO,
    @Param('id') phongId: number,
    @Req() req,
  ): Promise<any> {
    return await this.phongService.editPhongById(
      Number(phongId),
      updateDto,
      Number(req.user.data.id),
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Xoá phòng thành công' })
  async DeletePhong(@Param('id') phongId: number, @Req() req): Promise<any> {
    return await this.phongService.deletePhongById(
      Number(phongId),
      Number(req.user.data.id),
    );
  }

  @Post('upload-hinh-phong')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file,
    @Query('phongId') phongId: number,
  ): Promise<any> {
    return await this.phongService.uploadPhongImage(file, Number(phongId));
  }
}
