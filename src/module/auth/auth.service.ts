import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Login, Register, Verify } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "rahmatjon974@gmail.com",
      pass: process.env.APP_PASS
    }
  })
  constructor(@InjectModel(Auth) private authModel: typeof Auth, private jwtService: JwtService) { }
  async register(register: Register) {
    const { username, firstName, lastName, email, password, avatar, bio } = register;

    const exists = await this.authModel.findOne({ where: { email } });
    if (exists) throw new ConflictException("User already exists");

    const hashed = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otp_time = Date.now() + 120000;

    await this.authModel.create({
      username,
      firstName,
      lastName,
      avatar,
      bio,
      email,
      password: hashed,
      otp,
      otp_time
    });

    await this.transporter.sendMail({
      from: "rahmatjon974@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `<b>Your OTP: ${otp}</b>`
    });

    return { message: "Registered. Please verify email." };
  }


  async verify(verify: Verify) {
    const { otp, email } = verify
    const user = await this.authModel.findOne({ where: { email } })
    const now = Date.now()

    if (!user) throw new NotFoundException('user not found')
    if (user.dataValues.otp_time < now) throw new UnauthorizedException("otp time expired")
    if (+user.dataValues.otp !== +otp) throw new UnauthorizedException("wrong otp")

    user.update({ isVerify: true, otp: null, otp_time: null })

    return { message: "verified" };
  }

  async login(login: Login) {
    const { email, password } = login
    const user = await this.authModel.findOne({ where: { email } })
    if (!user) throw new NotFoundException('user not found')
    if (user.dataValues.isVerify) throw new UnauthorizedException("not verify")

    const isMatch = await bcrypt.compare(password, user.dataValues.password)
    if (isMatch) {
      const payload = { sub: user.id, username: user.dataValues.username, role: user.dataValues.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException("wrong password")
    }
  }
}