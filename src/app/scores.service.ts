import { Injectable } from '@angular/core';
import { Scores } from 'src/app/scores.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor(private firestore: AngularFirestore) {

  }

  getScores() {
    return this.firestore.collection('scores').snapshotChanges();
  }

  createScores(scores: Scores){
    return this.firestore.collection('scores').add(JSON.parse(JSON.stringify(scores)));
  }

  getData(score:Scores): object {
    const result = {};
    Object.keys(score).map(key => result[key] = score[key]);
    return result;
  }

  getToken() {
    return this.firestore.collection('token').snapshotChanges();
  }
}
