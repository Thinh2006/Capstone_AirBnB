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
import { VitriService } from './vitri.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ViTriDTO } from './dto/vitri.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Vi tri')
@Controller('vi-tri')
export class VitriController {
  constructor(private readonly vitriService: VitriService) {}
  @Get()
  findAll(): Promise<any> {
    return this.vitriService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() vitriDTO: ViTriDTO, @Req() req): Promise<any> {
    return this.vitriService.create(vitriDTO, req.user.data.id);
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
    const paginatedPhongs = await this.vitriService.getAllAndPaging(
      pageIndex ? parseInt(pageIndex, 10) : null,
      pageSize ? parseInt(pageSize, 10) : null,
      keyword,
    );
    return paginatedPhongs;
  }

  @Get(':id')
  async getPhongById(@Param('id') id: number): Promise<any> {
    return await this.vitriService.getById(Number(id));
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async EditPhongById(
    @Body() vitriDTO: ViTriDTO,
    @Param('id') vitriId: number,
    @Req() req,
  ): Promise<any> {
    return await this.vitriService.editById(
      vitriDTO,
      Number(vitriId),
      Number(req.user.data.id),
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async DeletePhong(@Param('id') vitriId: number, @Req() req): Promise<any> {
    return await this.vitriService.deleteById(
      Number(vitriId),
      Number(req.user.data.id),
    );
  }

  @Post('upload-hinh-vi-tri')
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
    @Query('vitriId') vitriId: number,
  ): Promise<any> {
    return await this.vitriService.upload(file, Number(vitriId));
  }
}
