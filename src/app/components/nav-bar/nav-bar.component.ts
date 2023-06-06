import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  username: string | null = null;
  events: string[] = [];
  opened: boolean = false;
  role: number = 0;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Aquí puedes ejecutar el código que deseas cada vez que se cambia la ruta
        console.log('Se cambió la ruta');
        this.role = Number(sessionStorage.getItem('role'));
        this.username = sessionStorage.getItem('name');
        this.validadMostrar()
      }
    });

    this.role = Number(sessionStorage.getItem('role'));
    this.username = sessionStorage.getItem('name');
    window.addEventListener('storage', this.actualizarDato.bind(this));

    const btn = document.querySelector('.btn');
    const sidebar = document.querySelector('.sidebar');

    if (btn && sidebar) {
      btn.addEventListener('click', () => {
        btn.classList.toggle("click");
        sidebar.classList.toggle("show");
      });
    }

    const links = document.querySelectorAll('.sidebar ul li a');

    links.forEach(link => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('id');
        const item = document.querySelector(`nav ul li ul.item-show-${id}`);
        const span = document.querySelector(`nav ul li #${id} span`);

        if (item && span) {
          item.classList.toggle("show");
          span.classList.toggle("rotate");
        }
      });
    });

    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(navItem => {
      navItem.addEventListener('click', () => {
        navItem.classList.add("active");
        navItems.forEach(item => {
          if (item !== navItem) {
            item.classList.remove("active");
          }
        });
      });
    });
  }

  actualizarDato(event: StorageEvent) {
    if (event.storageArea === sessionStorage) {
      location.reload();
    }
  }

  validadMostrar(){
    return this.role!=0
  }

  logout() {
    this.router.navigate([`login`]).then(r => r);
    sessionStorage.clear();
    console.log("perro")
    this.role = 0
  }
}
