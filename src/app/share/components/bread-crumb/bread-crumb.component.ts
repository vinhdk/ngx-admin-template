import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbItem } from '../../models/bread-crumb.model';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input() menu: BreadCrumbItem[];
  @Input() home: BreadCrumbItem;
  // tslint:disable-next-line:no-output-native
  @Output() click: EventEmitter<string> = new EventEmitter<string>();
  constructor(private routerService: Router) { }

  ngOnInit() {
  }
  router(item: BreadCrumbItem) {
    this.click.emit(item.routerLink);
    this.routerService.navigate([item.routerLink], { replaceUrl: item.replaceUrl });
  }
}
