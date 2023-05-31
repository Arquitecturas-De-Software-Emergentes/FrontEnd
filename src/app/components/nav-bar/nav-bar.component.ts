import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  events: string[] = [];
  opened: boolean = false;

  ngOnInit(): void {
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
}
