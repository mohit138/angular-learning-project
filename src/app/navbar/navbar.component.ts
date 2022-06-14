import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router:Router) { }

  scrolled = 0;
  currentUrl = this.router.url;

  isLoggedIn = false;
  isAdminLoggedIn = false;

  ngOnInit(): void {
    this.checkLogin();
    console.log(this.isLoggedIn,this.isAdminLoggedIn);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 10) {
      this.scrolled=1;
    }else{
      this.scrolled=0;
    }

  }

  checkLogin():void{
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      var roles = this.tokenStorageService.getUser().roles;
      this.isAdminLoggedIn = false;
      roles.forEach((element: string) => {
        if(element === 'ROLE_ADMIN'){
          this.isAdminLoggedIn = true;
        }   
      });
    }
  }

  logout(): void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
