
export interface Test {
  id: number,
  offer: Offer
}

export interface Offer {
  id?: string;
  title: string;
  organization: string;
  description: string[];
  requirements?: string[];
  when?: string[];
  where?: string;
  contact?: Contact;
  sector?: string;
  link?: string;
  type: OfferType;
}

export enum OfferTypesEnum {
  workshop = 'workshop',
  scholarship = 'scholarship'
}

export type OfferType = 'workshop' | 'scholarship';
export interface Contact {
  info?: string;
  phones?: string[];
}
