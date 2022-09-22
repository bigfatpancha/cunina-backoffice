import { Injectable } from '@angular/core';
import { Contact, Offer, Organization } from '../model/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class NewOfferService {

  private title!: string;
  private organization!: Organization;
  private description!: string[];
  private requirements!: string[];
  private when!: string[];
  private where!: string;
  private contact!: Contact;
  private sector!: string;
  private type!: 'scholarship' | 'workshop' | null;

  constructor() { }

  getType(): 'scholarship' | 'workshop' | null {
    return this.type;
  }

  clearAll(): void {
    this.title = '';
    this.organization = { name: '', link: ''};
    this.description = [],
    this.requirements = [],
    this.when = [];
    this.where = '';
    this.contact = {phones: [], info: ''};
    this.sector = '';
    this.type = null;
  }

  getOffer(): Offer {
    const offer: Offer = {
      title: this.title,
      organization: this.organization,
      description: this.description,
      requirements: this.requirements,
      when: this.when,
      where: this.where,
      contact: this.contact,
      sector: this.sector
    }
    return offer;
  }

  setType(type: 'scholarship' | 'workshop'): void {
    this.type = type;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setOrganization(_name: string, _link?: string): void {
    this.organization = {
      name: _name,
      link: _link ?? ''
    }
  }

  setDescription(description: string[]): void {
    this.description = description;
  }

  setRequirements(requirements: string[]): void {
    this.requirements = requirements ?? null;
  }

  setWhen(when: string[]): void {
    this.when = when ?? null;
  }

  setWhere(where: string): void {
    this.where = where ?? '';
  }

  setSector(sector: string): void {
    this.sector = sector ?? '';
  }

  setContactInfo(phones: string[], info: string): void {
    this.contact = {
      phones: phones ?? null,
      info: info ?? ''
    }
  }
}
