import { Component, OnInit } from '@angular/core';
import {Contacts, ContactsPlugin} from '@capacitor-community/contacts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  contactsList! : any[];

  constructor(private contacts: ContactsPlugin) { }

  ngOnInit() {
  }

}
