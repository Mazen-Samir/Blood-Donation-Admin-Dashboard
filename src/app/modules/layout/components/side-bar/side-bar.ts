import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [NgClass, RouterLink, RouterModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {

    @Output() sindeNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SindeNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sindeNavToggled.emit(this.menuStatus);
    console.log(this.menuStatus);
  }

}
