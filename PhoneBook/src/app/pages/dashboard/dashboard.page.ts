import { Component, OnInit } from '@angular/core';
import {Contacts,} from '@capacitor-community/contacts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  contactsList! : any[];

  constructor() { }

  ngOnInit() {
  }

  async requestPermission(){
    try{
      const permission: any = await Contacts.requestPermissions();
      if(permission === 'granted'){
        this.loadContacts();
      }
      else{
        console.warn('ContactsPermission Denied');
      }
    }
    catch(error){
      console.error(error);
    }
  }

  async loadContacts(){
    try{
      const result = await Contacts.getContacts({
        projection: {
          name:true,
          phones: true,
          postalAddresses: true,
        },
      });
      this.contactsList = result.contacts;
    }
    catch (error){
      console.error(error)
    }
  }
}
