import { TestBed } from '@angular/core/testing';
import { TranslateService } from './translate.service';
import {StorageService} from "../storage/storage.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('TranslateService', () => {
  let service: TranslateService;

  const testData = 'мир';
  const expectedData = {word: 'мир', translate: 'world'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateService, StorageService, HttpClient, HttpHandler]
    });
    service = TestBed.get(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should http post to translate "${testData}" and return "${JSON.stringify(expectedData)}"`, () => {
    service.getDictItem(testData).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
  });
});
