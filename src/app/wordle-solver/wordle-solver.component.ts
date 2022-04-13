import { Component, OnInit } from '@angular/core';
import { WordList } from './Constants';

@Component({
  selector: 'app-wordle-solver',
  templateUrl: './wordle-solver.component.html',
  styleUrls: ['./wordle-solver.component.css']
})
export class WordleSolverComponent implements OnInit {
  inputWord = "";
  inputWordColor: number[] = [];
  isSubmitted : boolean = false;

  possibleWords: string[] = [];
  a_z: string = "abcdefghijklmnopqrstuvwxyz";
  a_zAsterisks: string = "[a-z]*";
  inputValidation: string = "^[a-z]{5}$";
  openBracket: string = "[";
  closeBracket: string = "]";
  dollar: string = "$";

  listOfLists: string[] = [];
  answerCharSet = new Set();

  constructor() { }

  ngOnInit(): void {
    this.possibleWords = WordList;

    for (let i = 0; i < 5; i++) {
      this.listOfLists.push(this.a_z)
    }
  }

  onClickEnterWord(): void {
    this.isSubmitted = true;
  }

  onClickEnterColor(): void {
    let enteredWord = this.inputWord;
    for (let i = 0; i < 5; i++){
      var c = enteredWord.charAt(i);
      if (this.inputWordColor[i] == 1) {
        this.listOfLists[i] = c
        this.answerCharSet.add(c)
      }
      else if (this.inputWordColor[i] == 2) {
        this.listOfLists[i] = this.listOfLists[i].replace(c, "")
        this.answerCharSet.add(c)
      }
      else if (this.inputWordColor[i] == 3) {
        let flag = true;
        for (let j = 0; j < 5; j++) {
          if (enteredWord.charAt(i) == enteredWord.charAt(j) && i != j) {
            flag = false;
            break;
          }
        }

        if (flag) {
          for (let j = 0; j < this.listOfLists.length; j++) {
            this.listOfLists[j] = this.listOfLists[j].replace(c, "")
          }
        }
      }

    }

    let regexExp = this.openBracket + this.listOfLists[0] + this.closeBracket + this.openBracket + this.listOfLists[1] + this.closeBracket + this.openBracket + this.listOfLists[2] + this.closeBracket + this.openBracket + this.listOfLists[3] + this.closeBracket + this.openBracket + this.listOfLists[4] + this.closeBracket + this.dollar


    const regex = new RegExp(regexExp);
    this.possibleWords = this.possibleWords.filter(word => regex.test(word));

    if (this.answerCharSet.size!=0) {
      this.answerCharSet.forEach(element => {
        let regexExp = this.a_zAsterisks + element + this.a_zAsterisks;
        const regex = new RegExp(regexExp);
        this.possibleWords = this.possibleWords.filter(word => regex.test(word));
      });
    }

    this.inputWord = ''
    this.isSubmitted = false;
    this.inputWordColor = [];
  }

}
