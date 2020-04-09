import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  avatarSub: Subject<any> = new Subject();
  array: Array<{ id: string, value: { id: string, type: string, array: Array<{ label: string, value: string }> } }> = [];
  arraySubject: Array<{ id: string, value: Subject<{ id: string, type: string, array: Array<{ label: string, value: string }> }> }> = [];
  constructor() { }
  set(key: string, val: { id: string, type: string, array: Array<{ label: string, value: string }> }) {
    if (!this.array.find(e => e.id === key)) {
      this.array.push({ id: key, value: val });
    } else {
      this.array.find(e => e.id === key).value = val;
    }
  }
  get(key: string): { id: string, type: string, array: Array<{ label: string, value: string }> } {
    return this.array.find(e => e.id === key) ? this.array.find(e => e.id === key).value : null;
  }
  setSubject(key: string) {
    if (!this.arraySubject.find(e => e.id === key)) {
      this.arraySubject
        .push({ id: key, value: new Subject<{ id: string, type: string, array: Array<{ label: string, value: string }> }>() });
    }
  }
  transferSubject(key: string, data: { id: string, type: string, array: Array<{ label: string, value: string }> }): any {
    if (this.arraySubject.find(e => e.id === key)) {
      this.arraySubject.find(e => e.id === key).value.next(data);
    } else {
      this.setSubject(key);
      this.arraySubject.find(e => e.id === key).value.next(data);
    }
  }
  getSubject(key: string): Subject<{ id: string, type: string, array: Array<{ label: string, value: string }> }> {
    return this.arraySubject.find(e => e.id === key) ? this.arraySubject.find(e => e.id === key).value : null;
  }
  initAvatar() {
    this.avatarSub = new Subject();
  }
  getAvatar() {
    return this.avatarSub;
  }
  transferAvatar(data: any) {
    this.avatarSub.next(data);
  }
  unsubAvatar() {
    this.avatarSub.unsubscribe();
  }
}
