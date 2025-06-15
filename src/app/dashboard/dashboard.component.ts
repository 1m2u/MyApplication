// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navItems: NavItem[] = [
    {
      icon: 'home',
      label: 'Home',
      route: '/form',
      active: true,
    },
    {
      icon: 'assignment',
      label: 'Form',
      route: './form',
    },
    {
      icon: 'reports',
      label: 'Reports',
      route: 'overview',
    },
  ];

  settingsItem: NavItem = {
    icon: 'settings',
    label: 'Settings',
    route: 'settings',
  };

  onNavItemClick(item: NavItem): void {
    // Remove active state from all items
    this.navItems.forEach((navItem) => (navItem.active = false));
    this.settingsItem.active = false;

    // Set clicked item as active
    item.active = true;

    // Navigate to route
    this.router.navigate([item.route]);
  }

  onSettingsClick(): void {
    // Remove active state from all nav items
    this.navItems.forEach((navItem) => (navItem.active = false));

    // Set settings as active
    this.settingsItem.active = true;

    // Navigate to settings
    this.router.navigate([this.settingsItem.route]);
  }
}
