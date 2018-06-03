import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from "rxjs/internal/Observable";
import { tap, catchError } from 'rxjs/operators';
import {IUserAccountModel} from "./userAccount.model";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable()
export class UserAccountService {
  uuid: string;
  userProfile: Observable<IUserAccountModel>;
  private _userProfile: BehaviorSubject<IUserAccountModel>;
  private dataStore: {
    userProfile: IUserAccountModel
  }
  constructor(private _http: HttpClient) {
    this.uuid = '';
    this.dataStore = { userProfile: {}}
    this._userProfile = <BehaviorSubject<IUserAccountModel>>new BehaviorSubject( {});
    this.userProfile = this._userProfile.asObservable();
  }
  syncSocialLoginToDB(iUserAccount : IUserAccountModel) {
    this.uuid = iUserAccount.uuid;
    const headers = new HttpHeaders();
    this._http
      .post('/api/v1/userAccount/handleSocialLogin', iUserAccount, {headers : headers} )
      .subscribe( data => {
        console.log('Synced User Data');
          console.log(data)
      }, error => console.log('Error', error));
  }
}
