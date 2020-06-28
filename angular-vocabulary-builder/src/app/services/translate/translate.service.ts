import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, retry, switchMap} from 'rxjs/operators';
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private key = 'trnsl.1.1.20141203T154628Z.0c69e9e71acbc47b.1cd6959182275e618b08f714041b9188c17cf434';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getDictItem(word: string): Observable<{word: string, translate: string}> {
    const lang = this.storageService.getLang().value;
    return of(word)
      .pipe(
        switchMap(item => this.http.post(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.key}&lang=${lang}`,
          `text=${item}`,
          this.httpOptions
        )),
        retry(3),
        map((item: {text}) => ({
          word,
          translate: item.text[0]
        }))
      );
  }
}
