import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register, Verify } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  register(@Body() register: Register) {
    return this.authService.register(register);
  }

  @Post("login")
  login(@Body() login: Login) {
    return this.authService.login(login);
  }

  @Post("verify")
  verify(@Body() verify: Verify) {
    return this.authService.verify(verify);
  }
}
