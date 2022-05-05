import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from 'src/config/api.config';
import { Credenciais } from '../modules/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  authenticate(creds: Credenciais){
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })

  }

  sucessfullLogin(authToken: string){
    localStorage.setItem('token', authToken)
  }

  isAuthenticated(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout(){
    localStorage.clear()
  }
}
