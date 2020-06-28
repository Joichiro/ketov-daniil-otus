import { TestBed } from '@angular/core/testing';
import { WordQueueService } from './word-queue.service';
import {TranslateService} from "../translate/translate.service";


describe('WordQueueService', () => {
  let service: WordQueueService;
  const translateServiceStub = {
    send: () => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
        WordQueueService,
        {provide: TranslateService, useValue: translateServiceStub}
      ]});
    service = TestBed.get(WordQueueService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
