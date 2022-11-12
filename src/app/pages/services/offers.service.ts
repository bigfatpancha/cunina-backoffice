import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../../model/offer.interface';

export interface OfferIdKey {
  id: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private dbWorkshops = 'workshops';
  private dbScholarships = 'scholarships';
  private workshopsIdKey: Map<string, string> = new Map();
  private scholarshipsIdKey: Map<string, string> = new Map();

  workshops: Offer[] = [];
  scholarships: Offer[] = [];
  workshopsRef: AngularFireList<Offer>;
  scholarshipsRef: AngularFireList<Offer>;

  workshops$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  scholarships$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);

  constructor(private db: AngularFireDatabase) {
    this.workshopsRef = this.db.list(this.dbWorkshops);
    this.scholarshipsRef = this.db.list(this.dbScholarships);
  }

  addScholarship(offer: Offer): void {
    offer.id = `${new Date().getTime() + Math.floor(Math.random() * 100000)}`;
    this.db.list(this.dbScholarships).push(offer);
  }
  addWorkshop(offer: Offer): void {
    offer.id = `${new Date().getTime() + Math.floor(Math.random() * 100000)}`;
    this.db.list(this.dbWorkshops).push(offer);
  }
  updateScholarship(id: string, offer: Offer): Promise<void> {
    const key = this.scholarshipsIdKey.get(id.toString());
    if (key !== undefined) {
      return this.db.list(this.dbScholarships).update(key, offer);
    }
    return Promise.reject('no existe la oferta que se quiere actualizar: ' + id);
  }
  updateWorkshop(id: string, offer: Offer): Promise<void> {
    const key = this.workshopsIdKey.get(id.toString());
    if (key !== undefined) {
      return this.db.list(this.dbWorkshops).update(key, offer);
    }
    return Promise.reject('no existe la oferta que se quiere actualizar: ' + id);
  }
  removeScholarship(id: string): Promise<void> {
    const key = this.scholarshipsIdKey.get(id.toString());
    if (key !== undefined) {
      return this.db.list(this.dbScholarships).remove(key);
    }
    return Promise.reject('no existe la oferta que se quiere borrar: ' + id);
  }
  removeWorkshop(id: string): Promise<void> {
    const key = this.workshopsIdKey.get(id.toString());
    if (key !== undefined) {
      return this.db.list(this.dbWorkshops).remove(key);
    }
    return Promise.reject('no existe la oferta que se quiere borrar: ' + id);
  }

  initService(): void {
    this.workshopsRef.valueChanges().subscribe((offers: Offer[]) => {
      this.workshops = offers;
      this.workshops$.next(this.workshops);
      this.workshopsRef.query.once('value', (snapshot) => {
        snapshot.forEach((offerSnapshot) => {
          this.workshopsIdKey.set(offerSnapshot.val().id.toString(), offerSnapshot.key || '');
        });
      });
    })
    this.scholarshipsRef.valueChanges().subscribe((offers: Offer[]) => {
      this.scholarships = offers;
      this.scholarships$.next(this.scholarships);
      this.scholarshipsRef.query.once('value', (snapshot) => {
        snapshot.forEach((offerSnapshot) => {
          this.scholarshipsIdKey.set(offerSnapshot.val().id.toString(), offerSnapshot.key || '');
        });
      })
    })
  }

  getWorkshops(): Offer[] {
    return this.workshops;
  }

  getScholarships(): Offer[] {
    return this.scholarships;
  }

  getWorkshopById(id: string): Observable<Offer> {
    return this.workshopsRef.valueChanges().pipe(
      map((offers: Offer[]) => {
        this.workshops = offers;
        return this.getElementByIdInArray(id, this.workshops);
      })
    );
  }

  getScholarshipById(id: string): Observable<Offer> {
    return this.scholarshipsRef.valueChanges().pipe(
      map((offers: Offer[]) => {
        this.scholarships = offers;
        return this.getElementByIdInArray(id, this.scholarships);
      })
    );
  }

  private getElementByIdInArray(id: string, array: Offer[]): Offer {
    const element = array.find((_element: Offer) => _element.id == id);
    if (element !== undefined) {
      return element;
    }
    throw Error(`el elemento buscado con id ${id} no existe`);
  }

}
