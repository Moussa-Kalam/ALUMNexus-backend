import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveUser } from '../decorators/active-user-decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { OtpAuthenticationService } from './otp-authentication.service';
import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Verify2faDto } from './dto/verify-2fa.dto';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Auth(AuthType.Bearer)
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly optAuthenticationService: OtpAuthenticationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Auth(AuthType.None)
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }

  @Post('logout')
  async logout(@ActiveUser() activeUser: ActiveUserData) {
    return this.authenticationService.logout(activeUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshTokens(refreshTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generateQrCode(
    @ActiveUser() activeUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { uri, secret } = await this.optAuthenticationService.generateSecret(
      activeUser.email,
    );

    // Store the temporary secret in the user's record in the database
    await this.optAuthenticationService.storeTemporarySecret(
      activeUser.email,
      secret,
    );

    response.type('png');

    return toFileStream(response, uri);
  }

  @HttpCode(HttpStatus.OK)
  @Post('2fa/verify')
  async verifyTfaCode(
    @Body() tfaCodeDto: Verify2faDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: activeUser.email },
    });

    if (!user || !user.temporaryTfaSecret) {
      throw new UnauthorizedException('2FA not enabled for this user');
    }

    // Verify the code using tfaCode from the client and the temporaryTfaSecret from the database
    const isValid = this.optAuthenticationService.verifyCode(
      tfaCodeDto.tfaCode,
      user.temporaryTfaSecret,
    );

    if (!isValid) throw new UnauthorizedException('Invalid 2FA code');

    // Enable 2FA for the user
    await this.optAuthenticationService.enableTfaForUser(
      activeUser.email,
      user.temporaryTfaSecret,
    );

    return { message: '2FA enabled successfully!' };
  }

  @Patch('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.authenticationService.changePassword(
      activeUser.email,
      changePasswordDto,
    );
  }

  // TODO: Forgot Password
  // TODO: Reset Password
}
