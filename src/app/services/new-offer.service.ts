import { Injectable } from '@angular/core';
import { Contact, Offer, OfferType } from '../model/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class NewOfferService {

  private id!: string;
  private title!: string;
  private organization!: string;
  private link!: string;
  private description!: string[];
  private requirements!: string[];
  private when!: string[];
  private where!: string;
  private contact!: Contact;
  private sector!: string;
  private type!: OfferType;
  private filters!: string[];

  constructor() { }

  setOffer(offer: Offer): void {
    this.title = offer.title;
    this.organization = offer.organization;
    this.type = offer.type;
    if (offer.id !== null && offer.id !== '' && offer.id !== undefined) {
      this.id = offer.id;
    }
    if (offer.link !== undefined && offer.link !== null && offer.link !== '') {
      this.link = offer.link
    }
    if (offer.description !== null && offer.description !== undefined && offer.description.length > 0) {
      this.description = offer.description;
    }
    if (offer.requirements !== null && offer.requirements !== undefined && offer.requirements.length > 0) {
      this.requirements = offer.requirements;
    }
    if (offer.when !== null && offer.when !== undefined && offer.when.length > 0) {
      this.when = offer.when;
    }
    if (offer.where !== null && offer.where !== undefined && offer.where !== '') {
      this.where = offer.where;
    }
    if (
      (offer.contact && offer.contact.info !== undefined && offer.contact.info !== '') ||
      (offer.contact && offer.contact.phones !== null)
    ) {
      this.contact = offer.contact;
    }
    if (offer.sector !== null && offer.sector !== undefined && offer.sector !== '') {
      this.sector = offer.sector;
    }
    if (offer.filters !== null && offer.filters !== undefined && offer.filters.length > 0) {
      this.filters = offer.filters;
    }
  }

  getType(): OfferType {
    return this.type;
  }

  clearAll(): void {
    this.id = '';
    this.title = '';
    this.organization = '';
    this.link= '';
    this.description = [],
    this.requirements = [],
    this.when = [];
    this.where = '';
    this.contact = {phones: [], info: ''};
    this.sector = '';
    this.filters = [];
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
      sector: this.sector,
      type: this.type,
      filters: this.filters
    }
    return offer;
  }

  setType(type: OfferType): void {
    this.type = type;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setOrganization(_name: string, _link?: string): void {
    this.organization = _name;
    this.link = _link ?? '';
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

  setFilters(filters: []): void {
    this.filters = filters ?? null;
  }
}
