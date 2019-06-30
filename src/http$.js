import { ajax } from 'rxjs/ajax';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';

export default class Http {

    token = localStorage.getItem('auth_token');

    static get(url){

        return ajax({
            url: url,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
             // 'Authorization': token
            }
          }).pipe(
            catchError(val => of(`I caught: ${val}`))
          );

    }

    static post(url , payload){

        return ajax({
            url: url,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             // 'Authorization': token
            },
            body: payload
          }).pipe(
            catchError(val => of(`I caught: ${val}`))
          );


    }



}