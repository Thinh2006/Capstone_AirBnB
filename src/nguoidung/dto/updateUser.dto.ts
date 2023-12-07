import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Số điện thoại không được để trông' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Ngày sinh không được để trông' })
  birth_day: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsBoolean({ message: 'Giới tính phải có giá trị boolean (true hoặc false)' })
  gender: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'Loại người dùng không được để trống' })
  role: Role;
}
