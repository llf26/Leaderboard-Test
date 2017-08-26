import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){this.getStuff()}
  
  constructor(private http: HttpClient, private modalService: NgbModal){
  }

  closeResult: string;
  
  open(content) {

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  people = [];
  found = [];
  title = 'the leaderboard';
  //everyone = {};
  lookupName = '';
  getStuff(){        
    this.http.get('http://hakron.io/arcade/api/nfc').subscribe(data => {
    
      //  console.log(data);
      var result = JSON.stringify(data);
      this.people = JSON.parse(result);
    });
  };
  nameLookup(content){
    if(this.lookupName)
      {
      console.log(this.people);
      
      for(let i = 0; i < this.people.length; i++)
        {        
          console.log('Lookup Name: ', this.lookupName);
          if(this.people[i].name === this.lookupName)
            {
            this.found.push(this.people[i]);      
            }
            
        }
        console.log(this.found[0].name);
        this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          this.found = [];
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.found = [];
        });
    }
  }
}
