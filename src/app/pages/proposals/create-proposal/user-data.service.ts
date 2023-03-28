import { Injectable } from '@angular/core';
import { userData } from 'src/app/constants/users';
import { HttpClient } from '@angular/common/http';
import {tap, map, Observable, pipe, catchError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
private Iurl = 'https://jsonplaceholder.typicode.com/todos'

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
};
  constructor(private http : HttpClient) { }

  getData() : Observable<userData[]>{
    return this.http.get<userData[]>(this.Iurl)
    .pipe(
      tap(_=> console.log('fetched users')
      )
    )
  }

  getID(id: number): Observable<userData> {
    const url = `${this.Iurl}/${id}`;
    return this.http.get<userData>(url)
    .pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
    );
  }

  updateUser(user : userData) : Observable<any>{
    return this.http.put(this.Iurl , user , this.httpOptions)
  }
  
  addUser(user : userData) : Observable<userData>{
    console.log('addUser called with user:', user);
    return this.http.post<userData>(this.Iurl , user , this.httpOptions)
  }

  deleteUser(id:number) : Observable<userData> {
    const url = `${this.Iurl}/${id}`
    return this.http.delete<userData>(url , this.httpOptions)
  }
}
