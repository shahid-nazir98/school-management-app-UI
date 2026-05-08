import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,MatToolbarModule,MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor( private router: Router, private route: ActivatedRoute){}
   pageTitle = '';
  username: string = '';
 ngOnInit() {
  const email = localStorage.getItem('email');

  if (email && email.includes('@')) {
    this.username = email.split('@')[0];
  } else {
    this.username = 'User';
  }
  // dynamic title
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        this.pageTitle = currentRoute.snapshot.data['title'] || 'Dashboard';
      });
  }
  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/']);
}
}
