import { Component, OnInit } from '@angular/core';
import { AuthService } from '#/services/auth.service';
import { Subscription } from 'rxjs';


class Menu {
  tipo: string;
  inscricao: boolean;
}

const ADMIN_MENU: Menu = {
  tipo: 'admin',
  inscricao: true
};
const DM_MENU: Menu = {
  tipo: 'dm',
  inscricao: true
};
const ARBITER_MENU: Menu = {
  tipo: 'arbiter',
  inscricao: false
};
const WATCHER_MENU: Menu = {
  tipo: 'watcher',
  inscricao: false
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: Menu;

  subscMenu: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.subscMenu = this.auth.permission().subscribe(
      data => this.chooseMenu(data)
    );
  }

  chooseMenu(permission: string) {
    switch (permission) {
      case 'admin':
        this.menu = ADMIN_MENU;
        break;
      case 'dm':
        this.menu = DM_MENU;
        break;
      case 'arbiter':
        this.menu = ARBITER_MENU;
        break;
      default:
        this.menu = WATCHER_MENU;
    }
  }

}
