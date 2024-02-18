import { Controller, Get, Param, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { UrlsService } from './urls/urls.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly urlsService: UrlsService,
    @InjectQueue('clicks') private readonly clicksQueue: Queue) { }

  @Get()
  @ApiExcludeEndpoint()
  getHello() {
    return this.appService.getHello();
  }

  @Get(':token')
  @Redirect()
  @ApiExcludeEndpoint()
  async redirect(@Req() req, @Param('token') token: string) {
    const url = await this.urlsService.getUrlByToken(token);
    await this.clicksQueue.add('click', {
      url: url,
      userAgent: req.headers['user-agent']
    });
    return { url: url.longUrl, statusCode: 301 };
  }
}
