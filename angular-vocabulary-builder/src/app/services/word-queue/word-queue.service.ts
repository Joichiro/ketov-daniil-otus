import { Injectable } from '@angular/core';
import {TranslateService} from '../translate/translate.service';
import {from, Observable, of, pipe} from 'rxjs';
import {catchError, concatMap, filter, map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordQueueService {

  constructor(
    private translateService: TranslateService
  ) {}

  getDictItemsFromInput(input: string): Observable<{word: string, translate: string}> {
    return from(input.split('.'))
      .pipe(
        map(item => item.trim()),
        filter(item => item.length > 0),
        concatMap(item => this.translateService.getDictItem(item))
      );
  }
}
