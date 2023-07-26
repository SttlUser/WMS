import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private headerData = new BehaviorSubject<{ header: string; subheader: string }>({ header: '', subheader: '' });
  public headerData$ = this.headerData.asObservable();

  updateHeaderData(data: { header: string; subheader: string }) {
    this.headerData.next(data);
  }
}
