import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Click, Url } from './urls/entities/url.entity';
import { AuthModule } from './auth/auth.module';
import { UrlsService } from './urls/urls.service';
import { BullModule } from '@nestjs/bullmq';
import { ClickProcessor } from './click.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Url, Click],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Url, Click]),
    UrlsModule,
    AuthModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: 6379 // обычно порт также конфигурируется в переменных окружения
          // также с Redis может использоваться пароль, но мы в этот раз без него
        }
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'clicks',
    })
  ],
  controllers: [AppController],
  providers: [AppService, UrlsService, ClickProcessor],
})
export class AppModule { }
