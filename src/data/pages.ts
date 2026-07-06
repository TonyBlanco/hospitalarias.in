export type Locale = 'en' | 'hi' | 'ml';

export type PageId =
  | 'home'
  | 'about'
  | 'mission-values'
  | 'founders'
  | 'benito-menni'
  | 'team'
  | 'what-we-do'
  | 'get-involved'
  | 'donate'
  | 'volunteer'
  | 'collaborate'
  | 'news'
  | 'gallery'
  | 'newsletter'
  | 'contact'
  | 'privacy-policy';

export type PageData = {
  id: PageId;
  title: string;
  description: string;
  eyebrow: string;
  oldUrls: string[];
  images: { src: string; alt: string }[];
  sections: { heading: string; body: string[]; items?: string[] }[];
  ctas: { label: string; href: string; variant?: 'primary' | 'secondary' }[];
};

export const routes: Record<Locale, Record<PageId, string>> = {
  en: {
    home: '/',
    about: '/en/about/',
    'mission-values': '/en/about/mission-values/',
    founders: '/en/about/founders/',
    'benito-menni': '/en/about/founders/benito-menni/',
    team: '/en/about/team/',
    'what-we-do': '/en/what-we-do/',
    'get-involved': '/en/get-involved/',
    donate: '/en/get-involved/donate/',
    volunteer: '/en/get-involved/volunteer/',
    collaborate: '/en/get-involved/collaborate/',
    news: '/en/news/',
    gallery: '/en/gallery/',
    newsletter: '/en/newsletter/',
    contact: '/en/contact/',
    'privacy-policy': '/en/privacy-policy/',
  },
  hi: {
    home: '/hi/',
    about: '/hi/humare-baare/',
    'mission-values': '/hi/humare-baare/mission/',
    founders: '/hi/humare-baare/sansthapak/',
    'benito-menni': '/hi/humare-baare/sansthapak/benito-menni/',
    team: '/hi/humare-baare/team/',
    'what-we-do': '/hi/ham-kya-karte/',
    'get-involved': '/hi/jude/',
    donate: '/hi/jude/daan/',
    volunteer: '/hi/jude/sewa/',
    collaborate: '/hi/jude/sahyog/',
    news: '/hi/samachar/',
    gallery: '/hi/gallery/',
    newsletter: '/hi/newsletter/',
    contact: '/hi/sampark/',
    'privacy-policy': '/hi/privacy/',
  },
  ml: {
    home: '/ml/',
    about: '/ml/njangale-kurichu/',
    'mission-values': '/ml/njangale-kurichu/mission/',
    founders: '/ml/njangale-kurichu/sthapakar/',
    'benito-menni': '/ml/njangale-kurichu/sthapakar/benito-menni/',
    team: '/ml/njangale-kurichu/team/',
    'what-we-do': '/ml/njangal-entha-cheyunnath/',
    'get-involved': '/ml/chanthidam/',
    donate: '/ml/chanthidam/danam/',
    volunteer: '/ml/chanthidam/seva/',
    collaborate: '/ml/chanthidam/sahyogam/',
    news: '/ml/varthakal/',
    gallery: '/ml/gallery/',
    newsletter: '/ml/newsletter/',
    contact: '/ml/bandhappedam/',
    'privacy-policy': '/ml/privacy/',
  },
};

const basePages: Record<PageId, PageData> = {
  home: {
    id: 'home',
    title: 'Benedict Menni Psycho-Social Rehabilitation Centre',
    description: 'A dedicated home where women rescued from crisis find compassionate care, professional treatment, and a path back to dignity.',
    eyebrow: 'Compassionate care and rehabilitation',
    oldUrls: ['/inicio/', '/about-us/'],
    images: [
      { src: '/images/2025/09/HOSPITALLER-FAMILY-scaled.jpg', alt: 'Hospitaller community gathered as a family' },
      { src: '/images/2025/09/INDOOR-GAMES.jpg', alt: 'A resident participating in indoor games as rehabilitation activity' },
    ],
    sections: [
      {
        heading: 'A haven for healing',
        body: [
          'Every day, the centre opens its doors to women facing the profound challenges of chronic mental illness.',
          'With capacity for 60 residents, it welcomes women rescued from the streets, referred by authorities, or brought by families in need of support.',
          'The goal is not only recovery, but a stable and meaningful life reconnected with society.',
        ],
      },
      {
        heading: 'Holistic circle of care',
        body: ['The centre provides foundational support, professional treatment, rehabilitation and reintegration.'],
        items: ['Secure shelter, nutritious food and clothing', 'Medical and psychiatric care with follow-up', 'Programs that restore self-worth and community connection'],
      },
    ],
    ctas: [
      { label: 'Donate and change a life', href: '/en/get-involved/donate/' },
      { label: 'Learn more about our programs', href: '/en/what-we-do/', variant: 'secondary' },
    ],
  },
  about: {
    id: 'about',
    title: 'About Us',
    description: 'A dedicated home where women rescued from crisis find compassionate care, professional treatment, and a path back to dignity.',
    eyebrow: 'Who we are',
    oldUrls: ['/about-us/'],
    images: [
      { src: '/images/2025/09/HOSPITALLER-FAMILY-scaled.jpg', alt: 'Hospitaller community gathered as a family' },
    ],
    sections: [
      {
        heading: 'A haven for healing',
        body: [
          'Every day, we open our doors to women facing the profound challenges of chronic mental illness. With a capacity for 60 residents, our home is a haven for those who have been rescued from the streets, referred by government authorities, or brought to us by families in desperate need of support.',
          'These women often arrive with nothing, having been left behind by society. Here, they are found, they are seen, and their journey toward healing begins.',
        ],
      },
      {
        heading: 'Nurturing the whole person',
        body: [
          'Functioning as a true community home, we believe in nurturing the whole person. Under the guidance of the devoted Sisters Hospitallers of the Sacred Heart of Jesus, we provide more than just a roof over their heads.',
          'Our ultimate goal is to see every woman we care for not just recover, but thrive — leading a stable, meaningful life, reconnected with society.',
        ],
      },
      {
        heading: 'A foundation of trust',
        body: [
          'The centre operates with full legal standing, registered under the Right of Person with Disabilities Act 2016 and the Orphanages and Other Charitable Homes Act, 1960. This ensures our commitment to providing a safe, structured, and professional environment where healing is prioritized.',
        ],
      },
    ],
    ctas: [
      { label: 'Donate now', href: '/en/get-involved/donate/' },
      { label: 'Partner with us', href: '/en/get-involved/collaborate/', variant: 'secondary' },
    ],
  },
  'mission-values': {
    id: 'mission-values',
    title: 'Mission & Values',
    description: 'Mission, vision and values of the Hospitaller approach.',
    eyebrow: 'Mission',
    oldUrls: ['/our-mission-values/'],
    images: [{ src: '/images/2025/09/PASTORAL-CARE-1.jpg', alt: 'Pastoral care activity at the centre' }],
    sections: [
      {
        heading: 'Mission',
        body: ['To provide compassionate, specialized care to persons with mental illness, always respecting their dignity regardless of religion, ideology or social class.'],
      },
      {
        heading: 'Values',
        body: ['Hospitality is the core value of the centre. It inspires welcome, service and healing for people excluded because of illness.'],
        items: ['Holistic health', 'Humanity in care', 'Ethics in all actions', 'Service to the sick and needy', 'Sensitivity for the excluded'],
      },
    ],
    ctas: [{ label: 'Support this mission', href: '/en/get-involved/donate/' }],
  },
  founders: {
    id: 'founders',
    title: 'Founders',
    description: 'The roots and founding spirit of the Sisters Hospitallers.',
    eyebrow: 'Founders',
    oldUrls: ['/our-founders/', '/our-founders-2/'],
    images: [
      { src: '/images/2025/07/FUNDADORAS-1920.jpg', alt: 'Founders banner' },
      { src: '/images/2025/07/FUNDADORAS-1920-1024x243.jpg', alt: 'Founders historical image' },
    ],
    sections: [
      {
        heading: 'The founding spirit',
        body: ['The Hospitaller mission is rooted in compassionate service, care for people living with illness and a commitment to restore dignity.'],
      },
      {
        heading: 'Content note',
        body: ['The old route /our-founders-2/ existed but did not contain useful published content. It is merged into this page.'],
      },
    ],
    ctas: [{ label: 'Read about Benito Menni', href: '/en/about/founders/benito-menni/' }],
  },
  'benito-menni': {
    id: 'benito-menni',
    title: 'Benito Menni',
    description: 'Saint Benedict Menni and the legacy of hospitality.',
    eyebrow: 'Legacy',
    oldUrls: ['/benito-menni/'],
    images: [{ src: '/images/2025/07/1920x456menni-768x182.jpg', alt: 'Benito Menni banner from the rescued media library' }],
    sections: [
      {
        heading: 'Prophet of hospitality',
        body: ['Saint Benedict Menni is presented in the recovered site as a model of hospitality, compassion and care for people in need.'],
      },
      {
        heading: 'Legacy',
        body: ['His legacy continues through the Hospitaller commitment to holistic healing, human dignity and service to those most vulnerable.'],
      },
    ],
    ctas: [{ label: 'Explore our mission', href: '/en/about/mission-values/' }],
  },
  team: {
    id: 'team',
    title: 'Our Team',
    description: 'The Sisters, staff and collaborators serving the centre.',
    eyebrow: 'Team',
    oldUrls: ['/our-team/'],
    images: [
      { src: '/images/2025/10/Sr-Soshy.jpg', alt: 'Sr. Soshy' },
      { src: '/images/2025/10/Sr-Sheeba.jpg', alt: 'Sr. Sheeba' },
      { src: '/images/2025/10/Geena-Nurse.jpg', alt: 'Geena, nurse' },
      { src: '/images/2025/10/Evelina-Social-worker.jpg', alt: 'Evelina, social worker' },
    ],
    sections: [
      {
        heading: 'A multidisciplinary community',
        body: ['The recovered WordPress content identifies Sisters, social workers, nursing staff, support staff and collaborators as part of the care community.'],
      },
    ],
    ctas: [{ label: 'Contact the centre', href: '/en/contact/' }],
  },
  'what-we-do': {
    id: 'what-we-do',
    title: 'What We Do',
    description: 'Therapeutic services, vocational formation, pastoral care, family support and holistic rehabilitation.',
    eyebrow: 'Programs and services',
    oldUrls: ['/what-we-do/', '/rehabilitation-services/', '/vocational-training/', '/family-community-support/', '/pastoral-care/', '/holistic-health/', '/humanity-in-care/', '/service-to-the-sick-and-needy/', '/sensitivity-for-the-excluded/'],
    images: [
      { src: '/images/2025/09/PHYSIOTHERAPY.jpg', alt: 'Physiotherapy activity' },
      { src: '/images/2025/09/ART-THERAPY.jpg', alt: 'Art therapy activity' },
      { src: '/images/2025/09/FLORICULTURE-ACTIVITY.jpg', alt: 'Floriculture activity' },
      { src: '/images/2025/07/SOAP-MAKING-1.jpg', alt: 'Soap making activity' },
    ],
    sections: [
      {
        heading: 'Therapeutic services',
        body: [
          'The Therapeutic Services Program plays a vital role in the holistic recovery of individuals with mental health conditions, addressing their emotional, psychological, and behavioural challenges through structured therapeutic interventions.',
          'Group Therapy fosters social connection, peer support, and emotional healing among residents, complementing individual therapy and other rehabilitation services.',
        ],
        items: ['Individual care plans (ICP)', 'Individual and group psychotherapy', 'Family support and psychoeducation', 'Activities of daily living (ADLs)'],
      },
      {
        heading: 'Vocational training',
        body: [
          'Our vocational programs help residents develop practical skills and a sense of purpose. Through structured activities, participants build confidence and prepare for meaningful community reintegration.',
        ],
        items: ['Floriculture and gardening', 'Soap making', 'Jewellery making', 'Exercise therapy', 'Cultural programs'],
      },
      {
        heading: 'Family and community support',
        body: [
          'For many of our residents, the greatest obstacle to recovery is not just their illness, but the profound sense of isolation and abandonment. Our programs are designed to rebuild these crucial ties.',
          'We work tirelessly to reconnect residents with their families, providing counseling and support to help mend broken relationships. Through shared activities, cultural celebrations, and daily moments of joy, we foster an environment of genuine connection.',
        ],
      },
      {
        heading: 'Pastoral and spiritual care',
        body: [
          'Caring for the person goes beyond the physical. Pastoral care is a fundamental pillar that complements all our programs, recognizing the person in their entirety.',
          'We offer a space of comfort, hope, and connection to the transcendent. Through prayer, meditation, and meaningful conversations, we help residents rediscover their worth and purpose.',
        ],
      },
      {
        heading: 'Holistic health',
        body: [
          'Our philosophy is based on the principle that true health is achieved when all parts of our being are in balance. Every therapy, every activity, and every moment of connection has a holistic purpose.',
          'Physical health is the basis of recovery. Through physiotherapy and guided exercise, we help residents regain strength and mobility. Our connection with nature, through gardening and outdoor activities, provides a sense of calm and purpose.',
        ],
      },
    ],
    ctas: [
      { label: 'Volunteer with us', href: '/en/get-involved/volunteer/' },
      { label: 'Support our mission', href: '/en/get-involved/donate/', variant: 'secondary' },
    ],
  },
  'get-involved': {
    id: 'get-involved',
    title: 'Get Involved',
    description: 'Donate, volunteer or collaborate with the centre.',
    eyebrow: 'Get involved',
    oldUrls: ['/get-involved/', '/donate/', '/volunteer-services/', '/collaborate-with-us/'],
    images: [{ src: '/images/2025/09/HOSPITALLER-FAMILY.jpg', alt: 'Hospitaller family community' }],
    sections: [
      {
        heading: 'Three ways to help',
        body: ['The recovered content groups involvement around donations, volunteer services and institutional collaboration.'],
        items: ['Donate to support care and rehabilitation', 'Volunteer time and skills', 'Collaborate through partnerships and alliances'],
      },
    ],
    ctas: [
      { label: 'Donate', href: '/en/get-involved/donate/' },
      { label: 'Volunteer', href: '/en/get-involved/volunteer/', variant: 'secondary' },
      { label: 'Collaborate', href: '/en/get-involved/collaborate/', variant: 'secondary' },
    ],
  },
  donate: {
    id: 'donate',
    title: 'Donate',
    description: 'Support compassionate care and rehabilitation.',
    eyebrow: 'Donate',
    oldUrls: ['/get-involved/donate/'],
    images: [{ src: '/images/2025/09/HOSPITALLER-FAMILY-2.jpg', alt: 'Hospitaller community support' }],
    sections: [
      {
        heading: 'Why donate',
        body: [
          'Donations support food, shelter, treatment, rehabilitation programs and the daily care of women living in vulnerable situations.',
          'Your contribution helps us provide secure shelter, nutritious food, professional medical and psychiatric care, and programs that restore self-worth and community connection.',
        ],
      },
      {
        heading: 'How to donate',
        body: [
          'Account Name: Benedict Menni Psycho Social Rehabilitation Centre',
          'Account Number: 086601001174',
          'IFSC: ICIC0000866',
          'Bank: ICICI Bank, Kazhakuttam Branch',
        ],
      },
      {
        heading: 'Transparency',
        body: ['The centre is registered and operates within a recognized legal framework for charitable and care institutions.'],
      },
    ],
    ctas: [{ label: 'Contact us to donate', href: '/en/contact/' }],
  },
  volunteer: {
    id: 'volunteer',
    title: 'Volunteer Services',
    description: 'Offer time, skills and presence to support residents.',
    eyebrow: 'Volunteer',
    oldUrls: ['/get-involved/volunteer-services/'],
    images: [
      { src: '/images/2025/09/INDOOR-GAMES.jpg', alt: 'Volunteer-supported activity' },
      { src: '/images/2025/09/OUTING.jpg', alt: 'Community outing activity' },
    ],
    sections: [
      {
        heading: 'How to participate',
        body: ['Volunteering supports human connection, community participation, cultural celebrations and daily moments of encouragement.'],
      },
    ],
    ctas: [{ label: 'Ask about volunteering', href: '/en/contact/' }],
  },
  collaborate: {
    id: 'collaborate',
    title: 'Collaborate with Us',
    description: 'Partnerships, alliances and institutional collaboration.',
    eyebrow: 'Collaborate',
    oldUrls: ['/get-involved/collaborate-with-us/'],
    images: [
      { src: '/images/2025/09/FAMILY-SUPPORT.jpg', alt: 'Family support activity' },
      { src: '/images/2025/09/CULTURAL-PROGRAMS.jpg', alt: 'Cultural program activity' },
    ],
    sections: [
      {
        heading: 'Partnerships',
        body: ['The recovered content invites collaborators to support the mission through shared responsibility, services and community partnerships.'],
      },
    ],
    ctas: [{ label: 'Start a conversation', href: '/en/contact/' }],
  },
  news: {
    id: 'news',
    title: 'News',
    description: 'Communications, updates and stories from the centre.',
    eyebrow: 'News',
    oldUrls: ['/communication/', '/communications/', '/news-events/'],
    images: [
      { src: '/images/2025/09/CULTURAL-PROGRAMS-2.jpg', alt: 'Cultural program' },
      { src: '/images/2025/09/UNITY.jpg', alt: 'Community unity activity' },
    ],
    sections: [
      {
        heading: 'Communications',
        body: ['The old communication routes are consolidated into this news area for future updates and stories.'],
      },
    ],
    ctas: [{ label: 'Subscribe to newsletter', href: '/en/newsletter/' }],
  },
  gallery: {
    id: 'gallery',
    title: 'Gallery',
    description: 'Images of rehabilitation activities, community life and services.',
    eyebrow: 'Gallery',
    oldUrls: ['/gallery/'],
    images: [
      { src: '/images/2025/09/ART-THERAPY.jpg', alt: 'Art therapy workshop' },
      { src: '/images/2025/09/PHYSIOTHERAPY.jpg', alt: 'Physiotherapy session' },
      { src: '/images/2025/09/FLORICULTURE-ACTIVITY.jpg', alt: 'Floriculture activity' },
      { src: '/images/2025/07/SOAP-MAKING-1.jpg', alt: 'Soap making workshop' },
      { src: '/images/2025/09/GARDENING-3.jpg', alt: 'Gardening activity' },
      { src: '/images/2025/09/INDOOR-GAMES.jpg', alt: 'Indoor games' },
      { src: '/images/2025/09/OUTDOOR-GAMES.jpg', alt: 'Outdoor games' },
      { src: '/images/2025/09/CULTURAL-PROGRAMS.jpg', alt: 'Cultural program' },
      { src: '/images/2025/09/OUTING.jpg', alt: 'Community outing' },
      { src: '/images/2025/09/EXERCISE.jpg', alt: 'Exercise therapy' },
      { src: '/images/2025/09/JWELLERY-MAKING-300x272.jpg', alt: 'Jewellery making' },
      { src: '/images/2025/07/ANIMAL-HUSBANDRY.jpg', alt: 'Animal husbandry' },
    ],
    sections: [
      {
        heading: 'Activities and community life',
        body: ['The recovered gallery contains images of therapy, vocational activities, cultural programs, outings and daily life at the centre.'],
      },
    ],
    ctas: [{ label: 'Contact us', href: '/en/contact/' }],
  },
  newsletter: {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'A future subscription point for updates from the centre.',
    eyebrow: 'Newsletter',
    oldUrls: ['/newsletter/'],
    images: [],
    sections: [
      {
        heading: 'Stay connected',
        body: ['The old WordPress included a newsletter route. The static rebuild keeps the route ready for an external newsletter provider.'],
      },
    ],
    ctas: [{ label: 'Contact us', href: '/en/contact/' }],
  },
  contact: {
    id: 'contact',
    title: 'Contact Us',
    description: 'Contact the Benedict Menni Psycho-Social Rehabilitation Centre.',
    eyebrow: 'Contact',
    oldUrls: ['/contact/'],
    images: [],
    sections: [
      {
        heading: 'We are here to listen',
        body: [
          'If you have questions, suggestions or need information about programs and services, we welcome you to reach out.',
          'Messages should be handled with hospitality, compassion and confidentiality.',
        ],
      },
      {
        heading: 'Donation information',
        body: [
          'Account Name: Benedict Menni Psycho Social Rehabilitation Centre',
          'Account Number: 086601001174',
          'IFSC: ICIC0000866',
          'Bank: ICICI Bank, Kazhakuttam Branch',
        ],
      },
    ],
    ctas: [{ label: 'Send an email', href: 'mailto:info@hospitalarias.in' }],
  },
  'privacy-policy': {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Privacy policy route preserved from the old WordPress site.',
    eyebrow: 'Legal',
    oldUrls: ['/policy/', '/privacy-policy-2/', '/privacy-policy/'],
    images: [],
    sections: [
      {
        heading: 'Privacy policy',
        body: ['The recovered WordPress contains both policy and privacy policy content. This route is preserved for legal review and RGPD/GDPR completion before final publication.'],
      },
    ],
    ctas: [{ label: 'Contact us', href: '/en/contact/' }],
  },
};

export function getPage(id: PageId, locale: Locale): PageData {
  const page = basePages[id];
  if (locale === 'en') return page;
  // For hi/ml, use English content for now (translations pending)
  return page;
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href;
  const id = (Object.keys(routes.en) as PageId[]).find((key) => routes.en[key] === href || routes.en[key] === href.replace(/\/$/, '/') || (key === 'home' && href === '/'));
  if (!id) return href;
  return routes[locale][id];
}

export function getPageByPath(pathname: string, locale: Locale): PageData | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const id = (Object.keys(routes[locale]) as PageId[]).find((key) => routes[locale][key] === normalized);
  return id ? getPage(id, locale) : undefined;
}

export const pageIds = Object.keys(basePages) as PageId[];
