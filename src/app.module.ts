import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { DatphongModule } from './datphong/datphong.module';
import { NguoidungModule } from './nguoidung/nguoidung.module';
import { PhongModule } from './phong/phong.module';
import { VitriModule } from './vitri/vitri.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BinhluanModule,
    DatphongModule,
    NguoidungModule,
    PhongModule,
    VitriModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
