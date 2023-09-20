import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Contacts,} from '@capacitor-community/contacts';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  contactsList! : any[];

  isSupported = false;

  barcodes:Barcode[] = [];

  constructor(public router: Router, private alertController: AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported= result.supported;
    })
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
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
          postalAddresses: true
        },
      });
      this.contactsList = result.contacts;
    }
    catch (error){
      console.error(error)
    }
  }

  navigateToDetail(phoneNumber: string){
    this.router.navigate(['/detail', phoneNumber]);
  }

  getContact(){
      return this.contactsList;
  }

  getContactByNumber(phoneNumber:string){
    window.alert('contact by number taked succesfully');
    return this.contactsList.find((c) => c.phoneNumber === phoneNumber);
  }



}
