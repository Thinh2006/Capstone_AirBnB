import { Module } from '@nestjs/common';
import { NguoidungController } from './nguoidung.controller';
import { NguoidungService } from './nguoidung.service';

@Module({
  controllers: [NguoidungController],
  providers: [NguoidungService],
})
export class NguoidungModule {}
