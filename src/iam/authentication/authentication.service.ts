import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { pgUniqueViolationErrorCode } from '../../common/constants';
import { SignInDto } from './dto/sign-in.dto';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.firstName = signUpDto.firstName;
      user.middleName = signUpDto.middleName;
      user.lastName = signUpDto.lastName;
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.accountType = signUpDto.accountType;

      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('User with this email already exists!');
      }
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    const isPasswordValid = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        accountType: user.accountType,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
}
