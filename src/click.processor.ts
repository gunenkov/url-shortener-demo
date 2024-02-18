import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { UrlsService } from "./urls/urls.service";
import { Click } from "./urls/entities/url.entity";


@Processor('clicks')
export class ClickProcessor extends WorkerHost {
  constructor(
    private readonly urlsService: UrlsService
  ) {
    super();
  }

  async process(job: Job) {
    // TODO
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: Job) {
    const click = await this.urlsService.saveClick(job.data.url, job.data.userAgent);
    console.log(`Click ${click.id}; Is Mobile: ${click.isMobile}`);
  }
}