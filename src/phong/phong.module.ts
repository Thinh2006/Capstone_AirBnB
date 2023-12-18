import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { multerConfig } from './multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [PhongController],
  providers: [PhongService],
})
export class PhongModule {}
