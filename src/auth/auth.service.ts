import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { LoginInput, RegisterInput, ResetPasswordInput, VerifyInput } from './dto/create-auth.input';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private mailerService: MailerService,
  ) { }

  login(data: LoginInput) {
    return 'fsa'
  }

  async register(data: RegisterInput) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_time = new Date().toISOString();

    const newUser = new this.authModel({
      email: data.email,
      password: data.password,
      otp,
      otp_time,
      isVerified: false,
    });

    await newUser.save();

    await this.mailerService.sendMail({
      to: data.email,
      subject: "devBook tasdiqlash kodi",
      html: `<b>Tasdiqlash kodi - ${otp}</b>`,
    });

    return newUser;
  }

  async verify(data: VerifyInput) {
    const user = await this.authModel.findOne({ email:data.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.otp !== data.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.authModel.updateOne({ email: data.email }, { $set: { isVerified: true } });

    return user;
  }

  async resetPassword(data: ResetPasswordInput) {
    const user = await this.authModel.findOne({ email: data.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.authModel.updateOne({ email: data.email }, { $set: { password: data.password } });

    return 'asdf'
  }
}
