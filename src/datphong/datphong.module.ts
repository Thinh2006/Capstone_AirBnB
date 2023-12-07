import { Module } from '@nestjs/common';
import { DatphongController } from './datphong.controller';
import { DatphongService } from './datphong.service';

@Module({
  controllers: [DatphongController],
  providers: [DatphongService],
})
export class DatphongModule {}
