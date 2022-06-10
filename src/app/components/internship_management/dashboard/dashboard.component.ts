import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../service/school.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {}
}
