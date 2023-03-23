import { HttpClient } from '@angular/common/http';
import { ConsoleLogPublisher } from './console-log-publisher.class';
import { LogPublisher } from './log-publisher.class';

export class LogPublishersFactory {

  private publishers: LogPublisher[] = [];

  constructor() { }

  create(httpClient: HttpClient): LogPublisher[] {
    // this.publishers = [...this.publishers, new ConsoleLogPublisher(), new HttpLogPublisher(httpClient)]
    this.publishers = [...this.publishers, new ConsoleLogPublisher()]
    return this.publishers
  }
}
