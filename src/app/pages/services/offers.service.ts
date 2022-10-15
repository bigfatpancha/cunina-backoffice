import { Injectable } from '@angular/core';
import { Offer, OfferTypesEnum } from '../../model/offer.interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private dbWorkshops = 'workshops';
  private dbScholarships = 'scholarships';

  workshopsRef: AngularFireList<Offer>;
  scholarshipsRef: AngularFireList<Offer>;

  constructor(private db: AngularFireDatabase) {
    this.workshopsRef = this.db.list(this.dbWorkshops);
    this.scholarshipsRef = this.db.list(this.dbScholarships);
  }

  addScholarship(offer: Offer): any {
    this.db.list(this.dbScholarships).push(offer)
  }
  addWorkshop(offer: Offer): any {
    this.db.list(this.dbWorkshops).push(offer)
  }


  workshops: Offer[] = [
    {
      type: OfferTypesEnum.workshop,
      id: '0',
      title: 'Propuesta lúdica educativa para Niñas/os y Familias',
      organization: 'CET Centro de Educación Temprana',
      description: [
        'Propuesta lúdica educativa para Niñas/os y Familias. Acompañamiento en la crianza y el desarrollo de nuestros hijas/os. Actividades planificadas para socializar, escucharnos y aprender.',
        'La Educación Temprana es fundante: ofrecemos un bloque lúdico, divididos por edades, desayuno compartido y talleres de Crianzas para las/os Adultas/os.'
      ],
      requirements: ['Desde los 45 días hasta los 3 años cumplidos.'],
      when: ['Sábados de 10.30 a 12.30hs'],
      where: 'Polo Educativo María Elena Walsh -- JIN "A" Escuela Infantil N*11 D.E. N*1 Carlos Perette s/n y Calle 10 Retiro Barrio 31',
      contact: {
        info: 'Inscripción abierta todo el año presentando DNI niña/o, Libreta de Vacunas , apto físico y DNI Adulta/o referente de crianza.',
        phones: [
          'cetemprana@bue.edu.ar',
          '4343-5591 /interno 608',
          'Coordinadora de Sede: Natalia Lassizuk'
        ]
      },
      sector: 'YPF'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '1',
      title: 'Atención a Niñez y Adolescencia en Situación de Vulnerabilidad Social',
      organization: 'Dirección General de NIñez y Adolescencia - Dirección General de Adicciones',
      description: ['Atención a Niñez y Adolescencia en Situación de Vulnerabilidad Social'],
      when: ['Lun a Vie de 9.30 a 14'],
      where: 'Centro "Somos Familia" Calle 14 Manzana 113 Casa 3 Villa 31 Retiro',
      contact: {
        phones: [
          '11-6807-0977'
        ]
      },
      sector: 'San Martín'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '2',
      title: 'Apoyo escolar, todos los niveles',
      organization: 'Voces de Barro Para la Inclusion Social',
      description: [
        'Apoyo escolar, todos los niveles.',
        'Taller de Masculinidades para adolescentes de 13 a 19 años (encuentros una vez al mes)',
        'Grupo de chicas: para adolescentes de 13 a 19 años, (encuentros una vez al mes)',
        'Almuerzo Adolescentes: encuentros una vez al mes para adolescentes de 12 a 17 años.',
        'Taller Literario: jóvenes y preadolescentes de 10 a 12 años.(encuentros una vez al mes)',
        'Taller de CVs para maternidades. taller que se coordina con las madres participantes.'
      ],
      when: [
        'Apoyo escolar Sabados 1030 a 12:30hs',
        'Taller de Masculinidades 1 Sabado al mes de 12:30 a 14:30hs',
        'Grupo de chicas: 1 domingo al mes de 13 a 15hs',
        'Almuerzo Adolescentes: 1 Sabado al mes de 12:30 a 14:30hs',
        'Taller Literario:1 Sabado al mes de 12:30 a 14:30 hs.',
        'Taller de CVs para maternidades. 1 Sabado al mes de 10:30 a 12hs'
      ],
      where: 'Alpaca 1035, Capilla Caacupé',
      contact: {
        phones: [
          'Apoyo Escolar: Nazarena: 1160561276 - Diego: 1144113912 - Nanu: 1167634008.',
          'Taller de masculinidades: Diego: 1144113912 - Tadeo: 1169146204.',
          'Grupo de Chicas: Nanu: 1167634008 - Jenny: 1165677103',
          'Almuerzo Adolescente: Delfi: 2357430315 - Mati: 1165301622 - Diego: 1144113912 - Nanu: 1167634008.',
          'Taller literario: Sofi: 1169976153 - Noe: 1165758342 - Vero: 1155802249',
          'Taller de cvs para maternidades: Ara: 3884375828 - Sofi Larriva: 1134352468 - Diego: 1144113912'
        ]
      },
      sector: 'Playón este'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '3',
      title: 'Bachillerato Popular Ernesto Che Guevara',
      organization: 'La Poderosa',
      description: [
        'Bachillerato Popular Ernesto Che Guevara',
        'Apoyo escolar y conectividad. Primaria y secundaria.',
        'Taller de lectoescritura Biblioteca infantil y juvenil.'
      ],
      when: [
        'Bachillerato popular lunes a jueves de 19 a 22',
        'Apoyo escolar. De lunes a viernes de 10 a 12.30 y de 14 a 19 hs. Sábados de 10.30 a 14 hs.',
        'Taller de lectoescritura , viernes de 14 a 15.30 hs',
        'Biblioteca circulante todos los días de 14 a 19.',
        'Nodo de conectividad'
      ],
      where: 'Manzana 3 casa 25',
      contact: {
        phones: [
          'Bachillerato popular: Lola 116943-6579',
          'Apoyo escolar y talleres: Daniela 1136266239',
        ]
      },
    },
    {
      type: OfferTypesEnum.workshop,
      id: '4',
      title: 'Talleres culturales para todas las edades',
      organization: 'Somos Fuego',
      description: [
        'Talleres culturales para todas las edades',
        'apoyo escolar',
        'biblioteca infantil',
        'promotoras de género y salud'
      ],
      when: [
        'talleres culturales: lunes a viernes por las tardes',
        'merendero: sábado 16hs'
      ],
      where: 'manzana 103, casa 60, Playón oeste',
      contact: {
        phones: [  
          'Espacio cultural: 1144058293 (Flora)',
          'Promotoras de género: 1159483852 (Ruth).',
          'Biblioteca: 1155090364 (Mari)'
        ]
      },
      sector: 'Playón Oeste'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '5',
      title: 'Programa Adolescencia, promueve el derecho a la recreación',
      organization: 'Ministerio de Desarrollo Humano y Habitat',
      description: ['Programa Adolescencia, promueve el derecho a la recreación'],
      requirements: ['Adolescentes entre 13 y 18 años'],
      when: ['Inscripción en enero vía web en la página www.adolescencia.com.ar Luego, en febrero y marzo desde el programa se les asignan instituciones.'],
      where: 'En el barrio funcionan Conviven (Conviven, Villa 31, Manzana 100 bis casa 35, Sector Ferroviario) y Racing, Av Ramón Castillo y Bajada autopista Illia (Parroquia Cristo obrero). Además de estás instituciones contamos con convenios con más de 35 instituciones en todo CABA.',
      contact: {
        info: 'La participación de adolescentes supone el pago de una beca de 650 pesos por adolescente. por otra parte cada taller cuenta con un docente referente de la actividad y un operador social con formación en ciencias sociales para promover derechos y alertar posibles vulneraciones. cada taller cuenta con el acompañamiento de un supervisor. para mas información me pueden contactar al 1532606986 (lic. Nahuel Bernardez, supervisor)'
      },
    },
    {
      type: OfferTypesEnum.workshop,
      id: '6',
      title: 'Taller de periodismo',
      organization: 'Mundo Villa',
      description: ['Taller de periodismo'],
      requirements: ['16 años en adelante'],
      when: ['sábados de 11 a 13'],
      where: 'Casa de la cultura, mza 99, casa 35 ',
      contact: {
        phones: [
          '1157599732'
        ]
      },
      sector: 'Playón Oeste'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '7',
      title: 'Imagen y Sonido',
      organization: 'Centro de actividades Juveniles',
      description: ['Imagen y Sonido'],
      where: 'Alpaca 2474',
      contact: {
        phones: [
          '1122360296',
          'Ig CFP38'
        ]
      },
      sector: 'Cristo Obrero'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '8',
      title: 'Telecomunicaciones',
      organization: 'Centro de actividades Juveniles',
      description: ['Telecomunicaciones'],
      where: 'Alpaca 2474',
      contact: {
        phones: [
          '1122360296',
          'Ig CFP38'
        ]
      },
      sector: 'Cristo Obrero'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '9',
      title: 'Terminalidad secundaria',
      organization: 'Centro de actividades Juveniles',
      description: ['Terminalidad secundaria'],
      requirements: ['16 a 18 años'],
      where: 'Alpaca 2474',
      contact: {
        phones: [
          '1122360296',
          'Ig CFP38'
        ]
      },
      sector: 'Cristo Obrero'
    },
    {
      type: OfferTypesEnum.workshop,
      id: '10',
      title: 'FUTVAL',
      organization: 'Scholas',
      description: ['FUTVAL'],
      requirements: ['niñas a partir de 12 años'],
      when: ['lunes de 14 a 15'],
      where: 'Dora Acosta y Colibrí (mza 104, casa 125 bis, bajo el puente peatonal)',
      contact: {
        phones: [
          'Pablo: 116621-6399',
        ]
      },
      sector: 'Cristo Obrero'
    },
    // {
    //   title: 'Taller de percusión',
    //   organization: 'Scholas',
    //   description: '',
    //   requirements: [''],
    //   when: '',
    //   where: '',
    //   contact: {
    //     info: '',
    //     phones: [
    //       '',
    //       '',
    //       ''
    //     ]
    //   },
    //   sector: ''
    // },
    // {
    //   title: 'Compañía de danza',
    //   organization: 'Scholas',
    //   description: '',
    //   requirements: [''],
    //   when: '',
    //   where: '',
    //   contact: {
    //     info: '',
    //     phones: [
    //       '',
    //       '',
    //       ''
    //     ]
    //   },
    //   sector: ''
    // },
    // {
    //   title: 'Compañía de teatro',
    //   organization: 'Scholas',
    //   description: '',
    //   requirements: [''],
    //   when: '',
    //   where: '',
    //   contact: {
    //     info: '',
    //     phones: [
    //       '',
    //       '',
    //       ''
    //     ]
    //   },
    //   sector: ''
    // },
    // {
    //   title: 'Taller de banda',
    //   organization: 'Scholas',
    //   description: '',
    //   requirements: [''],
    //   when: '',
    //   where: '',
    //   contact: {
    //     info: '',
    //     phones: [
    //       '',
    //       '',
    //       ''
    //     ]
    //   },
    //   sector: ''
    // }
  ];
  scholarships: Offer[] = [
    {
      type: OfferTypesEnum.scholarship,
      id: '0',
      title: 'Progresar',
      organization: 'Ministerio de Educación',
      description: [
        'El programa de becas Progresar depende del Ministerio de Educación del Gobierno de la Nación. El mismo consiste en un programa de becas para educación superior con montos estratificados según el año de avance en la carrera.',
        'Los montos varían desde $2250 hasta $6900 según el nivel de estudios (universitario o terciario) y teniendo en cuenta si la carrera elegida forma parte de las consideradas “estratégicas” o no.',
        'En comparación el Estudiar es Trabajar, este programa tiene criterios más estrictos de renovación, solamente se renueva la beca a aquellos jóvenes que aprobaron el 50% de las materias estipuladas por el plan de estudios.'
      ],
      requirements: [
        'Tener entre 18 y 24 años para ingresantes',
        'Ser Argentino/a nativo/a o por opción',
        'Residir en un hogar que no supere en ingresos la suma de tres salarios mínimos, vitales y móviles.',
        'Ser egresado de nivel medio'
      ]
    },
    {
      type: OfferTypesEnum.scholarship,
      id: '1',
      title: 'Estudiar es Trabajar',
      organization: 'Ministerio de Desarrollo Humano y Hábitat de la Ciudad de Buenos Aires',
      description: [
        'Estudiar es Trabajar es un programa complementario al programa Ciudadanía Porteña con Todo Derecho dependiente del Ministerio de Desarrollo Humano y Hábitat de la Ciudad de Buenos Aires.',
        'El mismo consiste en brindar un acompañamiento económico a personas de entre 18 a 40 años para que puedan finalizar sus estudios (abarca todos los niveles). El estipendio es de $1,100 pesos y se cobra a través de la Tarjeta para Jóvenes emitida por el Banco Ciudad.'
      ],
      requirements: ['Para aplicar a este programa es necesario residir en un hogar perteneciente a Ciudadanía Porteña, por lo tanto aplicaría solamente a jóvenes que habitan en la Ciudad de Buenos Aires hace al menos dos años y cuyos hogares se encuentran por debajo de la línea de pobreza. Además, es requisito ya estar inscripto en el sistema educativo formal.'],
    },
    {
      type: OfferTypesEnum.scholarship,
      id: '2',
      title: 'BA Joven (Potenciate)',
      organization: 'Dirección de Políticas de Juventud del Gobierno de la Ciudad',
      description: [''],
      requirements: [''],
      when: [''],
      where: '',
      contact: {
        info: '',
        phones: [
          '',
          '',
          ''
        ]
      },
      sector: ''
    },
    {
      type: OfferTypesEnum.scholarship,
      id: '3',
      title: 'Programa Aprendé Programando',
      organization: '',
      description: [''],
      requirements: [''],
      when: [''],
      where: '',
      contact: {
        info: '',
        phones: [
          '',
          '',
          ''
        ]
      },
      sector: ''
    },
    {
      type: OfferTypesEnum.scholarship,
      id: '4',
      title: 'Elegí Enseñar (Ministerio de Educación)',
      organization: 'Ministerio de Educación e Innovación del Gobierno de la Ciudad de Buenos Aires',
      description: [''],
      requirements: [''],
      when: [''],
      where: '',
      contact: {
        info: '',
        phones: [
          '',
          '',
          ''
        ]
      },
      sector: ''
    },
    {
      type: OfferTypesEnum.scholarship,
      id: '5',
      title: 'Carrera de enfermería',
      organization: 'Instituto Cecilia Grierson',
      description: [''],
      requirements: [''],
      when: [''],
      where: '',
      contact: {
        info: '',
        phones: [
          '',
          '',
          ''
        ]
      },
      sector: ''
    }
  ];

  getWorkshops(): Offer[] {
    return this.workshops;
  }

  getScholarships(): Offer[] {
    return this.scholarships;
  }

  getWorkshopById(id: string): Offer {
    return this.getElementByIdInArray(id, this.workshops);
  }

  getScholarshipById(id: string): Offer {
    return this.getElementByIdInArray(id, this.scholarships);
  }

  private getElementByIdInArray(id: string, array: Offer[]): Offer {
    const element = array.find((element: Offer) => element.id === id);
    if (element !== undefined) {
      return element;
    }
    throw Error(`el elemento buscado con id ${id} no existe`);
  }

}
