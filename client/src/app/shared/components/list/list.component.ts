import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {
  BaseEntityModel,
  QueryOptions,
} from '../../../core/models/api.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataSourceSubjData } from '~core/models/app.interface';
import { UtilsService } from '../../../core/services/utils.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Pipe } from '@angular/compiler/src/core';

export interface ListDataSource<T extends BaseEntityModel>
  extends DataSource<T> {
  dataSourceSubjData$: Observable<DataSourceSubjData>;
  loadData(options: QueryOptions);
}

export interface ItemAction {
  name: string;
  action: (event) => void;
  icon: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent<T extends BaseEntityModel>
  implements AfterViewInit, OnInit, OnDestroy {
  @Output() listDataLoaded = new EventEmitter<boolean>();
  subscriptions: Subscription[] = [];
  datePipe: DatePipe = new DatePipe('en-US');
  listLength: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(MatSort) multiSorts!: QueryList<MatSort>;
  @ViewChild('input') searchInput: ElementRef;
  @Input() cols: [{ key: string; value: string; pipe?: Pipe; flex: string }];
  @Input() displayedCols: string[];
  @Input() actions: ItemAction[];
  @Input() mainButton: ItemAction;
  @Input() datasource: ListDataSource<T>;
  @Input() listFilter: QueryOptions;

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.datasource.dataSourceSubjData$.subscribe(
        (subjectData: DataSourceSubjData) => {
          this.utilsService.loading(subjectData.loading);
          if (!subjectData.hasErrors()) {
            this.listLength = subjectData.count;
            this.listDataLoaded.emit(true);
          } else {
            this.listLength = 0;
            this.utilsService.loading(subjectData.loading);
            this.listDataLoaded.emit(false);
          }
        },
      ),
    );
    this.datasource.loadData(this.listFilter);
  }

  ngAfterViewInit(): void {
    // Search filter event
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        }),
      )
      .subscribe();
    // Paginator page event
    this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
  }
  ngOnDestroy(): void {
    this.unsubscribeObservable();
  }

  sortData(sort: Sort) {
    if (sort.direction === '') {
      delete this.listFilter.sortColumns[sort.active];
    } else {
      this.listFilter.sortColumns[sort.active] = sort.direction;
    }

    this.paginator.pageIndex = 0;
    this.loadPage();
  }

  loadPage() {
    this.datasource.loadData({
      itemsPerPage: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      searchColumns: this.listFilter.searchColumns,
      searchValue: this.searchInput.nativeElement.value,
      sortColumns: this.listFilter.sortColumns,
    });
  }

  getCol(row, key) {
    const keyLevel = key.split('.');
    if (keyLevel.length === 1) {
      return row[key];
    } else {
      return this.getColValue(row, keyLevel);
    }
  }

  getColValue(row, keys: string[]) {
    if (!keys || !keys.length) {
      return row;
    }

    return this.getColValue(row[keys[0]], keys.slice(1, keys.length));
  }

  getSearchParams() {
    return this.listFilter.searchColumns.join(', ');
  }

  getCellColStyle(colName: string) {
    return colName.replace(/\./g, '-');
  }

  unsubscribeObservable() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
