import { Component, OnInit } from '@angular/core';
import { School } from '../../../api/school';
import { SelectItem } from 'primeng/api';
import { SchoolService } from '../../../service/school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
})
export class SchoolComponent implements OnInit {
  schools: School[] = [];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  sourceCities!: any[];

  targetCities!: any[];

  orderCities!: any[];

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.schoolService.getProducts().then((data) => (this.schools = data));
    console.log(this.schools);

    this.sourceCities = [
      { name: 'San Francisco', code: 'SF' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Berlin', code: 'BRL' },
      { name: 'Barcelona', code: 'BRC' },
      { name: 'Rome', code: 'RM' },
    ];
    this.targetCities = [];

    this.orderCities = [
      { name: 'San Francisco', code: 'SF' },
      { name: 'London', code: 'LDN' },
      { name: 'Paris', code: 'PRS' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Berlin', code: 'BRL' },
      { name: 'Barcelona', code: 'BRC' },
      { name: 'Rome', code: 'RM' },
    ];

    this.sortOptions = [
      { label: '价格降序', value: '!price' },
      { label: '价格升序', value: 'price' },
    ];
  }

  onSortChange(event: { value: any }) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
