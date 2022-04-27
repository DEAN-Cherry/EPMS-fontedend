import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, subscribeOn, Subscription } from 'rxjs';
import { MainComponent } from './app.main.component';
import { Router } from '@angular/router';
import { ChangeDetection } from '@angular/cli/lib/config/workspace-schema';
import { AppMenuService } from './service/app.menu.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-item',
  templateUrl: './app.menu-item.component.html',
  styleUrls: ['./app.menu-item.component.scss'],
  host: {
    '[class.active-menuitem]': 'true',
  },
  animations: [
    trigger('children', [
      state(
        'void',
        style({
          height: '0px',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'void => visibleAnimated, visibleAnimated => void',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index: number = 0;

  @Input() root: boolean = false;

  @Input() parentKey: string = '';

  active: boolean = false;

  key: string = '';

  menuSourceSubscription: Subscription = new Subscription();

  menuResetSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private app: MainComponent,
    private menuService: AppMenuService // private cd: ChangeDetection
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (key) => {
        if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
          this.active = false;
        }
      }
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
      .pipe(filter((event) => event.constructor.name == 'NavigationEnd'))
      .subscribe((_) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
        this.active = false;
      });
  }

  ngOnInit(): void {
    // for(let child in this.item.value()){
    //   this.childItems.push(child);
    // }
    console.log(this.item);
    console.log(typeof this.item);
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);
  }

  itemClick(event: MouseEvent) {
    event.stopPropagation();
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // notify other items
    this.menuService.onMenuStateChange(this.key);

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    } else {
      // activate item
      this.active = true;

      // // hide overlay menus
      // this.app.menuActiveMobile = false;
      //
      // if (this.app.isDesktop() && this.app.isOverlay()) {
      //   this.app.menuInactiveDesktop = true;
      // }
    }
  }

  updateActiveStateFromRoute() {
    this.active = this.router.isActive(
      this.item.routerLink[0],
      this.item.routerLink[1]
    );
    this.router.isActive(this.item.routerLink[0], !this.item.items);
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
