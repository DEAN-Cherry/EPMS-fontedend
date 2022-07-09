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
  pschools: School[] = [];

  schools: School[] = [];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  sourceCities!: any[];

  targetCities!: any[];

  orderCities!: any[];

  //TODO 这下面的都是CRUD所需
  productDialog!: boolean;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products!: School[];

  product!: School;

  selectedProducts!: School[];

  submitted!: boolean;

  cols!: any[];

  statuses!: any[];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.schoolService.getProducts().then((data) => (this.pschools = data));
    this.schoolService.getSchools().subscribe((data) => {
      this.schools = data;
      console.log(data);
    });
    // console.log(this.pschools);

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
      { label: '降序排序', value: '!schoolName' },
      { label: '升序排序', value: 'schoolName' },
    ];
  }

  loadData(event: { first: number; rows: number }) {
    event.first = 1;
    event.rows = 5;
    this.schoolService.getSchools().subscribe((data) => {
      this.schools = data;
      console.log(data);
    });
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

    console.log(this.sortOrder);
    console.log(this.sortField);
  }
}
