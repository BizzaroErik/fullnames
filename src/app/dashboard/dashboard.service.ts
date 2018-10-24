import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  searchHistory: any[];
  constructor(private loginService: LoginService, private db: AngularFireDatabase) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.searchHistory = [];
  }

  addNamesToHistory(first: string, last: string) {
    this.searchHistory.push({firstName: first, lastName: last});
  }

  searchFirst(first: string) {
    return this.db.object(`names/firstNames/${first}`).snapshotChanges();
  }
  searchLast(last: string){
    return this.db.object(`names/lastNames/${last}`).snapshotChanges();
  }

  addNameToDB(first:string, last:string){
    this.db.list(`names/firstNames`).set(first, true);
    this.db.list(`names/lastNames`).set(last,true);
  }


  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
}
