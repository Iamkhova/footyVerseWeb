import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from "rxjs/internal/Observable";
import { tap, catchError } from 'rxjs/operators';
import {IUserAccountModel} from "./userAccount.model";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {st} from "@angular/core/src/render3";

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

  loadUser(uuid: string) {
    this.uuid = uuid;
    const body = {uuid: uuid};
    const headers = new HttpHeaders();
    return this._http
      .post('/api/v1/userAccount/loadUUID', body, {headers : headers})
      .pipe(
        tap ( value => console.log(value)),
        catchError (this.handleError )
      )
  }

  checkForAccess(uuid: string, role: string[]) : Promise<boolean> {
    this.uuid = uuid;
    const packet = {uuid: uuid, role: role};
    const headers = new HttpHeaders();
    console.log('Checking for access', packet);
    return new Promise(((resolve, reject) => {
      this._http
        .post('/api/v1/userAccount/roleCheck', packet, {headers : headers} )
        .subscribe( data  => {
          console.log('data', data);
          console.log('User ' + this.uuid + ' access is ' + data['state'].toString());
          resolve(data['state']);
        }, error => {
          console.log('Error', error);
          reject(false);
        });
    }))

  }

  private handleError(error: Response) {
    const message = `Error status code ${error.status} at ${error.url}`;
    console.error(message + '|' + error);
    return Observable.throw(message);
  }
/*
  updateUserBlogPost(iBlogPost: IBlogPost, uuid: string, blogID: string, state: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http
      .post('/api/v1/app/modules/blog/' + uuid + '/' + blogID + '/' + state + '/updatePost', iBlogPost, {headers : headers})
      .pipe(
        tap (value => console.log(iBlogPost)),
        catchError(
          this.handleError))
  }
  */
}
