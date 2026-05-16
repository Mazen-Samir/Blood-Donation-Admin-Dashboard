import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from "../../../layout/components/side-bar/side-bar";
import { NavBar } from "../../../layout/components/nav-bar/nav-bar";

@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, SideBar, NavBar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  sideNavStatus: boolean = false;

}
