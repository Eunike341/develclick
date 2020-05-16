import { Component, OnInit, ViewChild } from '@angular/core';
import {Scores} from '../scores.model';
import {ScoresService} from '../scores.service';
import {Observable} from 'rxjs';
import {catchError, tap, map, retry} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface Token {
  value: string;
}

export class SummarizeScore {
  exerciseName: string;
  studentName: string;
  noOfSubmission: number;
  status: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  allScores:Scores[] = [];
  userToken:string = '';
  responseField:string = '';
  hide = true;
  allScoresSumarized:SummarizeScore[]= [];
  scoreMap = new Map<String, SummarizeScore>();
  showSummary:boolean = false;
  tokenVerified:boolean = false;

  displayedColumns: string[] = ['id', 'fullname', 'score', 'submitdatelocal'];
  dataSource: MatTableDataSource<Scores>;
  displayedColumnsSummary: string[] = ['exerciseName', 'studentName', 'noOfSubmission', 'status'];
  dataSourceSummary: MatTableDataSource<SummarizeScore>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginatorSummary: MatPaginator;
  @ViewChild(MatSort, {static: true}) sortSummary: MatSort;

  constructor(private scoresService: ScoresService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    console.log("call cols");
    //this.viewScore();

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(this.allScores);

    console.log("call doc");
    //this.viewScoreScndTest()
  }

  applyFilter(filterValue: string) {
    if(this.showSummary) {
      this.dataSourceSummary.filter = filterValue.trim().toLowerCase();
      if (this.dataSourceSummary.paginator) {
        this.dataSourceSummary.paginator.firstPage();
      }
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;


  }

  viewScore () {
    this.scoresService.getScores().subscribe( (data:any[]) => {
      //console.log("viewScore data:" + JSON.stringify(data));
      //console.log("data size:" + data.length);
      data.map(score => {
        const data = score.payload.doc.data() as Scores;
        //const id = score.payload.id;
        //console.log('data.id:' + data.id);
        if(data.fullname && data.fullname != '' && data.fullname.indexOf('Guest')==-1 && data.submitdate) {
          //console.log('inserting:' + data.submitdate+"," + data.fullname);
          var localDate = new Date(data.submitdate);
          data.submitdatelocal = localDate;
          this.allScores.push(data);
        }
      });
      console.log("allScores size:" + this.allScores.length);
      this.dataSource = new MatTableDataSource(this.allScores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  summarizeScore () {
    this.scoreMap = new Map<String, SummarizeScore>();
    for(var i=0; i< this.allScores.length; i++) {
      let score:Scores = this.allScores[i];
      let fullnametrimmed = score.fullname.trim().toUpperCase();

      let summarizedScore:SummarizeScore = this.scoreMap.get(score.id +"::" + fullnametrimmed);
      if(!summarizedScore || summarizedScore==null) {
        summarizedScore = new SummarizeScore();
        summarizedScore.exerciseName = score.id;
        summarizedScore.studentName = score.fullname;
        summarizedScore.noOfSubmission = 1;
        summarizedScore.status = score.score==10?'Completed':'Retry';
        this.scoreMap.set(score.id +"::" + fullnametrimmed, summarizedScore);
      } else {
        summarizedScore.noOfSubmission = summarizedScore.noOfSubmission + 1;
        if(summarizedScore.status != 'Completed' && score.score==10) {
          summarizedScore.status = 'Completed';
        }
      }
    }
    for (let key of this.scoreMap.keys()) {
      this.allScoresSumarized.push(this.scoreMap.get(key));
    }

    this.dataSourceSummary = new MatTableDataSource(this.allScoresSumarized);
    this.dataSourceSummary.paginator = this.paginatorSummary;
    this.dataSourceSummary.sort = this.sortSummary;

    this.showSummary = true;
  }

  viewScoreScndTest () {
    this.scoresService.getScores().subscribe( (data:any[]) => {
      console.log("viewScoreScndTest data:" + data);
      data.map(score => {
        const data = score.payload.doc.data() as Scores;
        const id = score.payload.id;
        //console.log('data.id:' + data.id);
        this.allScores.push(data);
      })
    });
    console.log("allScores ScndTest size:" + this.allScores.length);
  }

  verifyToken () {
    this.scoresService.getToken().subscribe( (data:any[]) => {
      //console.log("viewScore data:" + JSON.stringify(data));
      //console.log("data size:" + data.length);
      data.map(token => {
        const data = token.payload.doc.data() as Token;
        if (this.userToken == data.value) {
          console.log("token match");
          this.responseField = '';
          this.viewScore();
          this.tokenVerified = true;
        } else {
          this.responseField = 'Invalid token';
        }

      });

    });

  }

  detailScore () {
    this.showSummary = false;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
