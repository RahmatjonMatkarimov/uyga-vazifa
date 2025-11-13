import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  private users: any = []
  register(registerDto: RegisterDto) {
    const { email } = registerDto
    const foundedUser = this.users.find(item => item.email === email)

    if (foundedUser) {
      throw new BadRequestException("bu foydalanuvchi allaqachon mavjud")
    }

    this.users.push(registerDto)
    return 'foydalanuvchi yaratildi';
  }
  login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const foundedUser = this.users.find(item => item.username === username)
    const passwordVerify = this.users.find(item => item.password === password)

    if (!foundedUser || !passwordVerify) {
      throw new BadRequestException("parol yoki foydalanuvchi nomi xato")
    }
    return btoa(foundedUser.username);
  }
}
