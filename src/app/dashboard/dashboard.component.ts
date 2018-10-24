import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  missingFirst: boolean;
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.missingFirst = false;
  }

  /*
  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }*/

  searchName(first: HTMLInputElement, last: HTMLInputElement){
    this.dashboardService.addNamesToHistory(first.value, last.value);
    this.dashboardService.searchFirst(first.value).subscribe(firstName =>{
      if(firstName.key === first.value){
        this.dashboardService.searchLast(last.value).subscribe( lastName => {
          if(lastName.key === last.value){
            let fullName = first.value + " " + last.value;
            this.searches.push("Found: " + fullName);
          }
          else{
            //add function/button to decide if you want to add the name
            console.log("not found" + lastName.key);
          }
        });
      }
      else{
        console.log("first Name not found");
        this.missingFirst = true;
      }
    });
    
  }

  addName(first: HTMLInputElement, last: HTMLInputElement){
    this.dashboardService.addNameToDB(first.value, last.value);
  }

  ngOnInit() {
  }

}
