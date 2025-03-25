import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
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

@Auth(AuthType.Bearer)
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly optAuthenticationService: OtpAuthenticationService,
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
    const { secret, uri } = await this.optAuthenticationService.generateSecret(
      activeUser.email,
    );

    await this.optAuthenticationService.enableTfaForUser(
      activeUser.email,
      secret,
    );

    response.type('png');

    return toFileStream(response, uri);
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
