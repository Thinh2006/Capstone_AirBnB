import { Module } from '@nestjs/common';
import { VitriService } from './vitri.service';
import { VitriController } from './vitri.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer/multer.config';

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [VitriController],
  providers: [VitriService],
})
export class VitriModule {}
