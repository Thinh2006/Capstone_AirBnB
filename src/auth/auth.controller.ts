import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/register.dto';
import { LogInDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/logIn')
  logIn(@Body() logInDto: LogInDto): Promise<string> {
    return this.authService.logIn(logInDto);
  }
}
