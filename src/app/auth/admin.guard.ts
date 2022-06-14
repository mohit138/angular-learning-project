import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(this.tokenStorageService.getUser().roles);
    if (this.tokenStorageService.getToken()) {
      var adminFlag=0;
      this.tokenStorageService.getUser().roles.forEach((role: string) => {
        if(role==="ROLE_ADMIN"){
          adminFlag=1;
        }
      }); 
      console.log(adminFlag);
      if(adminFlag===1){
        return true;
      }     
    }
    // Store the attempted URL for redirecting
    // this.tokenStorageService.redirectUrl = url;
  
    // Navigate to the login page with extras
    alert("Only admin can visit this page!");
    this.router.navigate(['/']);
    return false;
  }
  
}
