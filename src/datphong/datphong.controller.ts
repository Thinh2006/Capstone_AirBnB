import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DatphongService } from './datphong.service';
import { DatPhongDto } from './dto/datphong.dto';
import { DatPhong } from './entities/datphong.entity';

@ApiTags('DatPhong')
@Controller('dat-phong')
export class DatphongController {
  constructor(private readonly datPhongService: DatphongService) {}

  @Get()
  getAllDatPhong(): Promise<DatPhong[]> {
    return this.datPhongService.getAllDatPhong();
  }

  @Post()
  postComment(@Body() datPhongDto: DatPhongDto): Promise<DatPhong> {
    return this.datPhongService.postDatPhong(datPhongDto);
  }

  @Get(':id')
  getByID(@Param('id') id: number): Promise<DatPhong> {
    return this.datPhongService.getByID(id);
  }

  @Put(':id')
  putDatPhong(
    @Param('id') id: number,
    @Body() datPhongDto: DatPhongDto,
  ): Promise<any> {
    return this.datPhongService.putDatPhong(id, datPhongDto);
  }

  @Delete(':id')
  removeDatPhong(@Param('id') id: number): Promise<string> {
    return this.datPhongService.removeDatPhong(id);
  }

  @Get('/lay-theo-nguoi-dung/:MaNguoiDung')
  getByUserID(@Param('MaNguoiDung') userID: number): Promise<DatPhong[]> {
    return this.datPhongService.getByUserID(userID);
  }
}
