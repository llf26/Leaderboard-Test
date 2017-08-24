import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){this.getStuff()}
  
  constructor(private http: HttpClient){
  }
  people = [];
  title = 'the leaderboard';
  everyone = {};
  name = ''
  getStuff(){
    
    
    this.http.get('http://hakron.io/arcade/api/nfc').subscribe(data => {
    
      //  console.log(data);
      var result = JSON.stringify(data);
      this.everyone = JSON.parse(result);

      console.log(this.people)
    });
  };
}
