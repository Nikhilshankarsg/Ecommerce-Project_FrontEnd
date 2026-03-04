import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignUpRequest } from '../models/signup-request.model';
import { Observable } from 'rxjs';
import { SignupResponse } from '../models/signup-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private BASEURL = environment.baseUrl;

  constructor(private http : HttpClient) { }

signup(data: SignUpRequest) : Observable<SignupResponse>{
  return this.http.post<SignupResponse>(
    `${this.BASEURL}/signUp`,data
  )
  }
}
