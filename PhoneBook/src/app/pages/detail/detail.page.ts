import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  phoneNumber!:string;
  contacDetails!: any;


  constructor(private route: ActivatedRoute, public dash: DashboardPage) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.phoneNumber = params['phoneNumber'];
    })

    this.contacDetails = this.dash.getContactByNumber(this.phoneNumber);
  }


}
