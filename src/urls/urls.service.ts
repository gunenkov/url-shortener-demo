import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Click, Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { CountOfClicksDto } from './dto/count-of-clicks.dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private readonly urlsRepository: Repository<Url>,
    @InjectRepository(Click)
    private readonly clicksRepository: Repository<Click>
  ) { }

  async create(createUrlDto: CreateUrlDto) {
    const url = { ...createUrlDto } as Url;
    await this.urlsRepository.save(url);
    return url;
  }

  async findAll() {
    const urls = await this.urlsRepository.find();
    return urls;
  }

  async findOne(id: string) {
    let url = await this.urlsRepository.findOne({ where: { id: id } });
    if (!url) {
      throw new NotFoundException('URL не найдена');
    }
    return url;
  }

  async update(id: string, updateUrlDto: UpdateUrlDto) {
    let url = await this.urlsRepository.findOne({ where: { id: id } });
    if (!url) {
      throw new NotFoundException('URL не найдена');
    }
    url = Object.assign(url, updateUrlDto) as Url;
    await this.urlsRepository.save(url);
    return url;
  }

  async remove(id: string) {
    const url = await this.urlsRepository.findOne({ where: { id: id } });
    if (!url) {
      throw new NotFoundException('URL не найдена');
    }
    await this.urlsRepository.remove(url);
  }

  async getCountOfClicks(id: string) {
    const url = await this.urlsRepository.findOne({ where: { id: id } });
    if (!url) {
      throw new NotFoundException('URL не найдена');
    }
    const countOfMobileClicks = (await this.clicksRepository.find({ where: { url: url, isMobile: true } })).length;
    const countOfWebClicks = (await this.clicksRepository.find({ where: { url: url, isMobile: false } })).length;
    return {
      mobileClicks: countOfMobileClicks,
      webClicks: countOfWebClicks
    } as CountOfClicksDto;
  }

  async getUrlByToken(token: string) {
    const url = await this.urlsRepository.findOne({ where: { token: token } });
    if (!url) {
      throw new NotFoundException('URL не найдена');
    }
    if (!url.isActive) {
      throw new NotFoundException('URL не найдена');
    }
    return url;
  }

  async saveClick(url: Url, userAgent: string): Promise<Click> {
    const isMobile = userAgent.includes('Android'); // чисто пример
    const click = { isMobile: isMobile, url: url } as Click;
    await this.clicksRepository.save(click);
    return click;
  }
}
