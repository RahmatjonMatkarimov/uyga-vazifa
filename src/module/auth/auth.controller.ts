import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register, Verify } from './dto/create-auth.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({type:[Register]})
  @Post("register")
  register(@Body() register: Register) {
    return this.authService.register(register);
  }
  
  @ApiBody({type:[Login]})
  @Post("login")
  login(@Body() login: Login) {
    return this.authService.login(login);

  }
  
  @ApiBody({type:[Verify]})
  @Post("verify")
  verify(@Body() verify: Verify) {
    return this.authService.verify(verify);
  }
}
