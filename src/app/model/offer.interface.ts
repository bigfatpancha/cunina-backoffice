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
}

export interface Contact {
  info?: string;
  phones?: string[];
}
