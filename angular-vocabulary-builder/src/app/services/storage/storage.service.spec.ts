import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  const localStorage = window.localStorage;
  let service: StorageService;
  const key = 'ru-en';
  let storedData;

  const testData = [{word: 'мир', translate: 'world'}];


  beforeEach(() => {
    TestBed.configureTestingModule({providers: [StorageService]});
    service = TestBed.get(StorageService);
    storedData = localStorage.getItem(key);
    localStorage.removeItem(key)
  });

  afterEach(() => {
    localStorage.removeItem(key)
  });

  afterAll(() => {
    localStorage.removeItem(key);
    localStorage.setItem(key, storedData)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should add "${JSON.stringify(testData)}" to localStorage`, () => {
    service.addDictItems(testData);
    const data = localStorage.getItem(key);
    expect(data).toEqual(JSON.stringify(testData));
  });

  it(`should get "${JSON.stringify(testData)}" from localStorage`, () => {
    localStorage.setItem(key, JSON.stringify(testData));
    const data = service.getDictFromStorage();
    expect(data).toEqual(testData);
  });
});
