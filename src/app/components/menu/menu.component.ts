import { Component, OnInit } from '@angular/core';
import { AuthService } from '#/services/auth.service';
import { Subscription } from 'rxjs';


class Menu {
  tipo: string;
  criar: boolean;
  inscricao: boolean;
}

const ADMIN_MENU: Menu = {
  tipo: 'admin',
  criar: true,
  inscricao: true
};
const DM_MENU: Menu = {
  tipo: 'dm',
  criar: true,
  inscricao: true
};
const ARBITER_MENU: Menu = {
  tipo: 'arbiter',
  criar: false,
  inscricao: false
};
const WATCHER_MENU: Menu = {
  tipo: 'watcher',
  criar: false,
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
