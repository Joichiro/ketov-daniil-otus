import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {Word} from "../app.interfaces";

@Component({
  selector: 'app-go-page',
  templateUrl: './go-page.component.html',
  styleUrls: ['./go-page.component.css']
})
export class GoPageComponent implements OnInit {
  wordList: Word[];
  currentWord: Word;
  placeholder: string;
  userInput: string;
  disableInput: boolean;
  turn: number;
  result: number;
  message: string;
  level: number;

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.setInitState()
  }

  onNextClick() {
    this.turn++;

    if (this.userInput === this.currentWord.translate) {
      this.result++
    }

    if (this.turn === this.level) {
      this.message = `Ваш результат ${this.result} из ${this.level}`;
      this.placeholder = '';
      this.userInput = '';
      this.disableInput = true;
      return
    }

    if (this.turn > this.level) {
      this.setInitState()
    }

    this.userInput = '';
    this.currentWord = this.getRandomWord();
    this.message = this.currentWord.word;
  }

  setInitState() {
    this.turn = 0;
    this.result = 0;
    this.placeholder = 'Ваш вариант перевода';
    this.level = this.storage.getLevel();
    this.wordList = this.storage.getDictFromStorage();
    this.currentWord = this.getRandomWord();
    this.message = this.currentWord.word;
    this.disableInput = false;
  }

  getRandomWord() {
    const index = Math.floor(Math.random() * this.wordList.length);
    return this.wordList[index]
  }
}
