import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { pgUniqueViolationErrorCode } from '../../common/constants';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
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
}
