import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { authenticator } from 'otplib';
import * as crypto from 'crypto';

@Injectable()
export class OtpAuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async generateSecret(email: string) {
    const secret = authenticator.generateSecret();
    const appName = this.configService.getOrThrow('TFA_APP_NAME');
    const uri = authenticator.keyuri(email, appName, secret);

    return {
      uri,
      secret,
    };
  }

  async storeTemporarySecret(email: string, secret: string) {
    const { id } = await this.userRepository.findOneOrFail({
      where: { email },
      select: { id: true },
    });

    // Encrypt the secret before storing it in the database
    const encryptedSecret = this.encryptSecret(secret);

    await this.userRepository.update(
      { id },
      { temporaryTfaSecret: encryptedSecret },
    );
  }

  verifyCode(code: string, secret: string) {
    const decryptedSecret = this.decryptSecret(secret);

    return authenticator.verify({
      token: code,
      secret: decryptedSecret,
    });
  }

  async enableTfaForUser(email: string, secret: string) {
    const { id } = await this.userRepository.findOneOrFail({
      where: { email },
      select: { id: true },
    });

    await this.userRepository.update(
      { id },
      { tfaSecret: secret, isTfaEnabled: true },
    );
  }

  private encryptSecret(secret: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(
      this.configService.getOrThrow('JWT_SECRET'),
      'salt',
      32,
    );
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  private decryptSecret(encryptedSecret: string): string {
    const [iv, encrypted] = encryptedSecret.split(':');
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(
      this.configService.getOrThrow('JWT_SECRET'),
      'salt',
      32,
    );
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
