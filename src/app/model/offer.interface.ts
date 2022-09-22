export interface Offer {
  title: string;
  organization: Organization;
  description: string[];
  requirements?: string[];
  when?: string[];
  where?: string;
  contact?: Contact;
  sector?: string;
}

export interface Organization {
  name: string;
  link?: string;
}
export interface Contact {
  info?: string;
  phones?: string[];
}
