import { Module } from '@nestjs/common';
import { BinhluanController } from './binhluan.controller';
import { BinhluanService } from './binhluan.service';

@Module({
  controllers: [BinhluanController],
  providers: [BinhluanService],
})
export class BinhluanModule {}
