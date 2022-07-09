import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SchoolService } from 'src/app/service/school.service';
import { School } from '../../../api/school';
import { saveAs } from 'file-saver';
import { Image } from '../../../api/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-school-crud',
  templateUrl: './school-crud.component.html',
  styleUrls: ['./school-crud.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class SchoolCRUDComponent implements OnInit {
  productDialog!: boolean;

  uploadFile!: FormData;
  uploadFiles: any[] = [];
  imageType: number = 10;
  uploadDialog: boolean = false;

  deleteSchoolDialog: boolean = false;

  deleteSchoolsDialog: boolean = false;

  products!: School[];

  product!: School;

  selectedProducts?: School[];

  submitted!: boolean;

  cols!: any[];

  statuses!: any[];

  rowsPerPageOptions = [5, 10, 20];

  schools: School[] = [];
  school!: School;
  images: Image[] = [];
  selectedSchool?: School[];
  selectedImage!: Image;
  schoolDialog: boolean = false;

  constructor(
    private schoolService: SchoolService,
    private imageService: ImageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.imageService.getImages().subscribe((data) => (this.images = data));
    this.schoolService.getProducts().then((data) => (this.products = data));
    this.schoolService.getSchools().subscribe((data) => (this.schools = data));
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' },
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  statusText(p: number, max: number): string {
    if (p / max < 0.25) {
      return '空位较多';
    } else if (p / max < 0.5) {
      return '可选';
    } else if (p / max < 0.75) {
      return '火热';
    } else if (p === max) {
      return '不可选';
    } else {
      return '空位较少';
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.schools);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, '学校');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  onBeforeUpload(event: any) {
    this.uploadDialog = true;
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadFiles.push(file);
    }
    console.log(this.uploadFiles);

    this.messageService.add({
      severity: 'info',
      summary: '图片上传',
      detail: '图片' + this.uploadFiles[0].name + '上传成功',
    });
  }

  onRowSelect(event: { data: { name: any } }) {
    this.school.imageId = (event.data as Image).id;
    this.messageService.add({
      severity: 'info',
      summary: '您选择了图片',
      // @ts-ignore
      detail: (event.data as Image).imageName.substring(0, 28) + '...',
    });
  }

  openNew() {
    // @ts-ignore
    this.school = {};
    this.submitted = false;
    this.schoolDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteSchoolsDialog = true;
  }

  editSchool(school: School) {
    this.school = { ...school };
    this.product = { ...school };
    this.schoolDialog = true;
    console.log(school);
  }

  deleteSchool(school: School) {
    this.deleteSchoolDialog = true;
    this.school = { ...school };
  }

  deleteProduct(product: School) {
    this.deleteSchoolDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteSchoolsDialog = false;
    // @ts-ignore
    this.products = this.products.filter(
      // @ts-ignore
      (val) => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteSchoolDialog = false;
    // this.products = this.products.filter((val) => val.id !== this.product.id);

    this.schoolService.deleteSchool(this.school.id!).subscribe(() => {
      this.schools = this.schools.filter((val) => val.id !== this.school.id);
      this.messageService.add({
        severity: 'success',
        summary: '成功',
        detail: '学校' + this.school.schoolName + '已删除',
        life: 3000,
      });
    });
  }

  hideDialog() {
    this.schoolService.getSchools().subscribe((data) => (this.schools = data));
    this.productDialog = false;
    this.schoolDialog = false;
    this.uploadDialog = false;
    this.submitted = false;
  }

  saveImage() {
    this.uploadDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: '修改图片类型成功',
      detail: '图片类型已修改为：' + this.imageType,
      life: 3000,
    });
  }

  saveSchool() {
    console.log(this.school);
    this.submitted = true;
    this.schoolDialog = false;
    if (this.school.id) {
      this.schoolService.updateSchool(this.school).subscribe((data) => {
        this.schools = this.schools.map((val) => {
          if (val.id === this.school.id) {
            return this.school;
          }
          return val;
        });
      });
      this.messageService.add({
        severity: 'success',
        summary: '修改成功',
        detail: '成功修改学校' + this.school.schoolName,
        life: 3000,
      });
    } else {
      this.schoolService.createSchool(this.school).subscribe((data) => {
        this.schools.push(data);
        this.schoolDialog = false;
      });
      this.messageService.add({
        severity: 'success',
        summary: '新建成功',
        detail: '成功新建学校' + this.school.schoolName,
        life: 3000,
      });
    }
    this.schoolService.getSchools().subscribe((data) => (this.schools = data));
  }
}
