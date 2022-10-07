import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private titleBs = new BehaviorSubject<string>('');
  title$ = this.titleBs.asObservable();

  setTitle(title: string): void {
    this.titleBs.next(title);
  }

}
