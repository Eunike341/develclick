import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ScoresService } from 'src/app/scores.service';
import { Scores} from 'src/app/scores.model';
@Component({
  selector: 'app-mouse2',
  templateUrl: './mouse2.component.html',
  styleUrls: ['./mouse2.component.css']
})
export class Mouse2Component implements OnInit {

  correctAnswers=[];
  score= 0;
  submitted = false;

  wrongAnsers=[1,2,3,4,5,6,7,8,9,10];
  fullName='';
  fullNameValidator = new FormControl('', [Validators.required]);

  mobileDetected = false;

  getErrorMessage() {
    return this.fullNameValidator.hasError('required') ? 'You must enter a value' :'';
  }
  onRightClick(event, questionIndex) {
    console.log('clicked');
    this.updateScore(questionIndex, true);
    return false;
  }

  onLeftClick(event, questionIndex) {
    console.log('left clicked, ' + questionIndex);
    this.updateScore(questionIndex, true);
    return false;
  }

  onDblClick(event, questionIndex) {
    console.log('double clicked');
    this.updateScore(questionIndex, true);
    return false;
  }

  constructor(private scoresService: ScoresService) { }

  ngOnInit() {
    console.log('templateoninit');
  }

  submitScore () {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.mobileDetected = true;
      return;
    }

    var totalQuestions = 10;
    for(var i=0; i < totalQuestions; i++) {
      if(this.correctAnswers.indexOf(i+1) != -1) {
        this.score=this.score+1;
      }
    }
    console.log('score:' + this.score);
    this.submitted = true;
    /*this.scoresService.getScores().subscribe(data => {
      console.log(data);
    });*/
    let scores = new Scores();
    scores.id = "mouse2";
    scores.score = this.score;
    scores.fullname = this.fullName;
    scores.submitdate = new Date().toISOString();
    console.log(scores.score+", " + scores.id +", date:" + scores.submitdate
      +", this name:" + this.fullName+", this score:" + this.score
      +", score:" + scores.score);
    //console.log('convert:' + this.scoresService.getData(scores));
    //console.log('stringify:' + JSON.parse(JSON.stringify(scores)))
    this.scoresService.createScores(scores);
    console.log("saved");
  }


  updateScore (questionIndex, isCorrect) {
    if(isCorrect) {
      let index = this.correctAnswers.indexOf(questionIndex);
      if (index == -1) this.correctAnswers.push(questionIndex);
      index = this.wrongAnsers.indexOf(questionIndex);
      if (index !== -1) this.wrongAnsers.splice(index, 1);
    } else {
      let index = this.wrongAnsers.indexOf(questionIndex);
      if (index == -1) this.wrongAnsers.push(questionIndex);
      index = this.correctAnswers.indexOf(questionIndex);
      if (index !== -1) this.correctAnswers.splice(index, 1);
    }
  }

  reset () {
    this.correctAnswers=[];
    this.score= 0;
    this.submitted = false;
    this.wrongAnsers=[1,2,3,4,5,6,7,8,9,10];
  }

}
