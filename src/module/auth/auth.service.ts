import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    const { username, password, email } = register
    const user = await this.authModel.findOne({ where: { email } })

    if (user) throw new NotFoundException('user already exits')

    const hashPassword = await bcrypt.hash(password, 12)
    const otp_time = Date.now() + 120000
    const randomNum = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")

    const data = {
      username,
      email,
      password: hashPassword,
      otp: randomNum,
      otp_time
    }

    await this.authModel.create(data)

    await this.transporter.sendMail({
      from: "rahmatjon974@gmail.com",
      to: email,
      subject: "lesson",
      text: "shunchaki",
      html: `<b>${randomNum}</b>`
    })


    return { message: "registered please check your email." };
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