import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('urls')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

  @Post()
  @ApiTags('urls')
  @ApiOperation({ summary: 'Добавить URL' })
  async create(@Body() createUrlDto: CreateUrlDto) {
    return await this.urlsService.create(createUrlDto);
  }

  @Get('all')
  @ApiTags('urls')
  @ApiOperation({ summary: 'Получить все URL' })
  async findAll() {
    return await this.urlsService.findAll();
  }

  @Get(':id')
  @ApiTags('urls')
  @ApiOperation({ summary: 'Получить URL по ID' })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.urlsService.findOne(id);
  }

  @Patch(':id')
  @ApiTags('urls')
  @ApiOperation({ summary: 'Обновить информацию об URL' })
  async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return await this.urlsService.update(id, updateUrlDto);
  }

  @Delete(':id')
  @ApiTags('urls')
  @ApiOperation({ summary: 'Удалить URL' })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.urlsService.remove(id);
  }

  @Get(':id/clicks')
  @ApiTags('clicks')
  @ApiOperation({ summary: 'Получить количество кликов по URL' })
  async countClicks(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.urlsService.getCountOfClicks(id);
  }
}
