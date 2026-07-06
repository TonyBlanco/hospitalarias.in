import type { Locale } from './pages';

const strings = {
  en: {
    // Nav
    navLabel: 'Main navigation',
    home: 'Home',
    about: 'About',
    missionValues: 'Mission & Values',
    founders: 'Founders',
    team: 'Team',
    whatWeDo: 'What We Do',
    getInvolved: 'Get Involved',
    donate: 'Donate',
    volunteer: 'Volunteer',
    collaborate: 'Collaborate',
    news: 'News',
    contact: 'Contact',
    languageHi: 'HI',
    languageMl: 'ML',

    // Footer
    tagline: 'Compassionate care, rehabilitation and hospitality.',
    quickLinks: 'Quick links',
    contactInfo: 'Contact Info',
    privacyPolicy: 'Privacy Policy',
    newsletter: 'Newsletter',
    newsletterText: 'Receive updates from the centre when the newsletter service is connected.',
    copyright: 'All rights reserved.',

    // Home
    homeEyebrow: 'Compassionate care and rehabilitation',
    whatWeDoEyebrow: 'What we do',
    whatWeDoTitle: 'Holistic circle of care',
    whatWeDoDesc: 'The centre provides foundational support, professional treatment, rehabilitation and reintegration.',
    shelterTitle: 'Shelter & Treatment',
    shelterDesc: 'Secure shelter, nutritious food, clothing and professional medical and psychiatric care with continuous follow-up.',
    rehabTitle: 'Rehabilitation',
    rehabDesc: 'Individual and group psychotherapy, occupational therapy, vocational training and activities of daily living.',
    reintTitle: 'Reintegration',
    reintDesc: 'Community participation, cultural programs, pastoral care and support for a meaningful life reconnected with society.',
    impactResidents: 'Residents served',
    impactCare: 'Continuous care',
    impactYears: 'Years of mission',
    impactVision: 'Shared vision',
    foundersEyebrow: 'Our roots',
    foundersTitle: 'Founded on compassion',
    foundersDesc: 'The Hospitaller mission is rooted in compassionate service, care for people living with illness and a commitment to restore dignity. Saint Benedict Menni founded the Sisters Hospitallers with a vision of hospitality and healing.',
    foundersCta: 'Read about Benito Menni',
    foundersAlt: 'Founders of the Hospitaller community',
    getInvolvedEyebrow: 'Get involved',
    getInvolvedTitle: 'Three ways to help',
    donateTitle: 'Donate',
    donateDesc: 'Your donation supports food, shelter, treatment and rehabilitation programs for women in vulnerable situations.',
    donateCta: 'Donate now',
    volunteerTitle: 'Volunteer',
    volunteerDesc: 'Offer your time, skills and presence to support residents through human connection and community participation.',
    volunteerCta: 'Learn more',
    collaborateTitle: 'Collaborate',
    collaborateDesc: 'Partner with us through shared responsibility, services and community alliances.',
    collaborateCta: 'Start a conversation',

    // Gallery
    galleryTitle: 'Gallery',
    galleryDesc: 'Images of rehabilitation activities, community life and services.',
    galleryIntro: 'The gallery contains images of therapy, vocational activities, cultural programs, outings and daily life at the centre.',
    lightboxLabel: 'Image viewer',
    lightboxClose: 'Close',
    lightboxPrev: 'Previous',
    lightboxNext: 'Next',
    viewImage: 'View',

    // News
    newsTitle: 'News',
    newsDesc: 'Discover the stories, events, and daily life that bring our mission to life.',
    newsEmpty: 'No news articles yet. Check back soon for updates.',

    // Accessibility
    skipToContent: 'Skip to content',

    // Home CTAs
    heroCtaDonate: 'Donate and change a life',
    heroCtaLearn: 'Learn more about our programs',
  },
  hi: {
    // Nav
    navLabel: 'मुख्य नेविगेशन',
    home: 'होम',
    about: 'हमारे बारे में',
    missionValues: 'मिशन और मूल्य',
    founders: 'संस्थापक',
    team: 'टीम',
    whatWeDo: 'हम क्या करते हैं',
    getInvolved: 'जुड़ें',
    donate: 'दान करें',
    volunteer: 'सेवा',
    collaborate: 'सहयोग',
    news: 'समाचार',
    contact: 'संपर्क',
    languageEn: 'EN',
    languageMl: 'ML',

    // Footer
    tagline: 'करुणामय देखभाल, पुनर्वास और अतिथि सेवा।',
    quickLinks: 'त्वरित लिंक',
    contactInfo: 'संपर्क जानकारी',
    privacyPolicy: 'गोपनीयता नीति',
    newsletter: 'न्यूज़लेटर',
    newsletterText: 'न्यूज़लेटर सेवा जुड़ने पर केंद्र से अपडेट प्राप्त करें।',
    copyright: 'सर्वाधिकार सुरक्षित।',

    // Home
    homeEyebrow: 'करुणामय देखभाल और पुनर्वास',
    whatWeDoEyebrow: 'हम क्या करते हैं',
    whatWeDoTitle: 'समग्र देखभाल का चक्र',
    whatWeDoDesc: 'केंद्र मौलिक सहायता, व्यावसायिक उपचार, पुनर्वास और पुनर्स्थापन प्रदान करता है।',
    shelterTitle: 'आश्रय और उपचार',
    shelterDesc: 'सुरक्षित आश्रय, पौष्टिक भोजन, कपड़े और निरंतर अनुवर्ती के साथ पेशेवर चिकित्सा और मनोचिकित्सा देखभाल।',
    rehabTitle: 'पुनर्वास',
    rehabDesc: 'व्यक्तिगत और समूह मनोचिकित्सा, व्यावसायिक चिकित्सा, व्यावसायिक प्रशिक्षण और दैनिक जीवन की गतिविधियाँ।',
    reintTitle: 'पुनर्स्थापन',
    reintDesc: 'सामुदायिक भागीदारी, सांस्कृतिक कार्यक्रम, आध्यात्मिक देखभाल और समाज से जुड़े सार्थक जीवन के लिए सहायता।',
    impactResidents: 'सेवा प्राप्त करने वाले निवासी',
    impactCare: 'निरंतर देखभाल',
    impactYears: 'मिशन के वर्ष',
    impactVision: 'साझा दृष्टि',
    foundersEyebrow: 'हमारी जड़ें',
    foundersTitle: 'करुणा में स्थापित',
    foundersDesc: 'हॉस्पिटैलर मिशन करुणामय सेवा, बीमारी से जी रहे लोगों की देखभाल और गरिमा बहाल करने की प्रतिबद्धता में निहित है।',
    foundersCta: 'बेनिटो मेन्नी के बारे में पढ़ें',
    foundersAlt: 'हॉस्पिटैलर समुदाय के संस्थापक',
    getInvolvedEyebrow: 'जुड़ें',
    getInvolvedTitle: 'मदद के तीन तरीके',
    donateTitle: 'दान करें',
    donateDesc: 'आपका दान खाद्य, आश्रय, उपचार और संवेदनशील स्थितियों में महिलाओं के लिए पुनर्वास कार्यक्रमों का समर्थन करता है।',
    donateCta: 'अभी दान करें',
    volunteerTitle: 'सेवा',
    volunteerDesc: 'निवासियों का समर्थन करने के लिए अपना समय, कौशल और उपस्थिति प्रदान करें।',
    volunteerCta: 'और जानें',
    collaborateTitle: 'सहयोग',
    collaborateDesc: 'साझा जिम्मेदारी, सेवाओं और सामुदायिक गठबंधनों के माध्यम से हमसे जुड़ें।',
    collaborateCta: 'बात शुरू करें',

    // Gallery
    galleryTitle: 'गैलरी',
    galleryDesc: 'पुनर्वास गतिविधियों, सामुदायिक जीवन और सेवाओं की छवियाँ।',
    galleryIntro: 'गैलरी में चिकित्सा, व्यावसायिक गतिविधियों, सांस्कृतिक कार्यक्रमों, भ्रमणों और केंद्र में दैनिक जीवन की छवियाँ हैं।',
    lightboxLabel: 'छवि दर्शक',
    lightboxClose: 'बंद करें',
    lightboxPrev: 'पिछला',
    lightboxNext: 'अगला',
    viewImage: 'देखें',

    // News
    newsTitle: 'समाचार',
    newsDesc: 'हमारे मिशन को जीवन देने वाली कहानियों, कार्यक्रमों और दैनिक जीवन की खोज करें।',
    newsEmpty: 'अभी कोई समाचार नहीं। जल्द ही अपडेट के लिए देखें।',

    // Accessibility
    skipToContent: 'सामग्री पर जाएँ',

    // Home CTAs
    heroCtaDonate: 'दान करें और जीवन बदलें',
    heroCtaLearn: 'हमारे कार्यक्रमों के बारे में जानें',
  },
  ml: {
    // Nav
    navLabel: 'പ്രധാന നാവിഗേഷൻ',
    home: 'ഹോം',
    about: 'ഞങ്ങളെ കുറിച്ച്',
    missionValues: 'ദൗത്യം & മൂല്യങ്ങൾ',
    founders: 'സ്ഥാപകർ',
    team: 'ടീം',
    whatWeDo: 'ഞങ്ങൾ എന്താണ് ചെയ്യുന്നത്',
    getInvolved: 'ബന്ധപ്പെടുക',
    donate: 'സംഭാവന ചെയ്യുക',
    volunteer: 'സേവനം',
    collaborate: 'സഹകരണം',
    news: 'വാർത്തകൾ',
    contact: 'ബന്ധപ്പെടുക',
    languageEn: 'EN',
    languageHi: 'HI',

    // Footer
    tagline: 'കരുണയോടെയുള്ള പരിചരണം, പുനഃസ്ഥാപനം & അതിഥി സേവനം.',
    quickLinks: 'ദ്രുത ലിങ്കുകൾ',
    contactInfo: 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ',
    privacyPolicy: 'സ്വകാര്യതാ നയം',
    newsletter: 'ന്യൂസ്‌ലെറ്റർ',
    newsletterText: 'ന്യൂസ്‌ലെറ്റർ സേവനം ബന്ധിപ്പിക്കുമ്പോൾ കേന്ദ്രത്തിൽ നിന്ന് അപ്‌ഡേറ്റുകൾ നേടുക.',
    copyright: 'എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.',

    // Home
    homeEyebrow: 'കരുണയോടെയുള്ള പരിചരണം & പുനഃസ്ഥാപനം',
    whatWeDoEyebrow: 'ഞങ്ങൾ എന്താണ് ചെയ്യുന്നത്',
    whatWeDoTitle: 'സമഗ്ര പരിചരണത്തിന്റെ ചക്രം',
    whatWeDoDesc: 'കേന്ദ്രം അടിസ്ഥാന പിന്തുണ, പ്രൊഫഷണൽ ചികിത്സ, പുനഃസ്ഥാപനം & പുനഃസ്ഥാപനം നൽകുന്നു.',
    shelterTitle: 'ആശ്രയം & ചികിത്സ',
    shelterDesc: 'സുരക്ഷിത ആശ്രയം, പോഷകാഹാരം, വസ്ത്രങ്ങൾ & തുടർച്ചയായ ഫോളോ-അപ്പോടെ പ്രൊഫഷണൽ മെഡിക്കൽ & മാനസിക പരിചരണം.',
    rehabTitle: 'പുനഃസ്ഥാപനം',
    rehabDesc: 'വ്യക്തിഗത & ഗ്രൂപ്പ് മനോചികിത്സ, തൊഴിൽ ചികിത്സ, തൊഴിൽ പരിശീലനം & ദൈനംദിന ജീവിത പ്രവർത്തനങ്ങൾ.',
    reintTitle: 'പുനഃസ്ഥാപനം',
    reintDesc: 'സമുദായ പങ്കാളിത്വം, സാംസ്കാരിക പരിപാടികൾ, ആത്മീയ പരിചരണം & സമൂഹവുമായി ബന്ധിപ്പിച്ച അർത്ഥവത്തായ ജീവിതത്തിനുള്ള പിന്തുണ.',
    impactResidents: 'സേവനം ലഭിച്ച താമസക്കാർ',
    impactCare: 'തുടർച്ചയായ പരിചരണം',
    impactYears: 'ദൗത്യ വർഷങ്ങൾ',
    impactVision: 'പങ്കിട്ട ദർശനം',
    foundersEyebrow: 'ഞങ്ങളുടെ വേരുകൾ',
    foundersTitle: 'കരുണയിൽ സ്ഥാപിതം',
    foundersDesc: 'ഹോസ്പിറ്റലർ ദൗത്യം കരുണയോടെയുള്ള സേവനത്തിലും രോഗികളെ പരിചരിക്കുന്നതിലും ഗരിമ പുനഃസ്ഥാപിക്കുന്നതിലും വേരൂന്നിയിരിക്കുന്നു.',
    foundersCta: 'ബെനിറ്റോ മെന്നിയെ കുറിച്ച് വായിക്കുക',
    foundersAlt: 'ഹോസ്പിറ്റലർ സമൂഹത്തിന്റെ സ്ഥാപകർ',
    getInvolvedEyebrow: 'ബന്ധപ്പെടുക',
    getInvolvedTitle: 'സഹായിക്കാനുള്ള മൂന്ന് വഴികൾ',
    donateTitle: 'സംഭാവന ചെയ്യുക',
    donateDesc: 'നിങ്ങളുടെ സംഭാവന ഭക്ഷണം, ആശ്രയം, ചികിത്സ & സെൻസിറ്റീവ് സാഹചര്യങ്ങളിലുള്ള സ്ത്രീകൾക്കുള്ള പുനഃസ്ഥാപന പരിപാടികളെ പിന്തുണയ്ക്കുന്നു.',
    donateCta: 'ഇപ്പോൾ സംഭാവന ചെയ്യുക',
    volunteerTitle: 'സേവനം',
    volunteerDesc: 'താമസക്കാരെ പിന്തുണയ്ക്കാൻ നിങ്ങളുടെ സമയം, കഴിവുകൾ & സാന്നിധ്യം നൽകുക.',
    volunteerCta: 'കൂടുതൽ അറിയുക',
    collaborateTitle: 'സഹകരണം',
    collaborateDesc: 'പങ്കിട്ട ഉത്തരവാദിത്തം, സേവനങ്ങൾ & സമുദായ സഖ്യങ്ങളിലൂടെ ഞങ്ങളുമായി ബന്ധപ്പെടുക.',
    collaborateCta: 'സംഭാഷണം ആരംഭിക്കുക',

    // Gallery
    galleryTitle: 'ഗാലറി',
    galleryDesc: 'പുനഃസ്ഥാപന പ്രവർത്തനങ്ങൾ, സമുദായ ജീവിതം & സേവനങ്ങളുടെ ചിത്രങ്ങൾ.',
    galleryIntro: 'ഗാലറിയിൽ ചികിത്സ, തൊഴിൽ പ്രവർത്തനങ്ങൾ, സാംസ്കാരിക പരിപാടികൾ, പുറത്തുപോക്കുകൾ & കേന്ദ്രത്തിലെ ദൈനംദിന ജീവിതത്തിന്റെ ചിത്രങ്ങൾ ഉണ്ട്.',
    lightboxLabel: 'ചിത്ര വ്യൂവർ',
    lightboxClose: 'അടയ്ക്കുക',
    lightboxPrev: 'മുമ്പത്തേത്',
    lightboxNext: 'അടുത്തത്',
    viewImage: 'കാണുക',

    // News
    newsTitle: 'വാർത്തകൾ',
    newsDesc: 'ഞങ്ങളുടെ ദൗത്യത്തിന് ജീവൻ നൽകുന്ന കഥകൾ, പരിപാടികൾ & ദൈനംദിന ജീവിതം കണ്ടെത്തുക.',
    newsEmpty: 'ഇപ്പോൾ വാർത്തകളൊന്നുമില്ല. അപ്‌ഡേറ്റുകൾക്കായി ഉടൻ തന്നെ വീണ്ടും സന്ദർശിക്കുക.',

    // Accessibility
    skipToContent: 'ഉള്ളടക്കത്തിലേക്ക് പോകുക',

    // Home CTAs
    heroCtaDonate: 'സംഭാവന ചെയ്യുക & ജീവിതം മാറ്റുക',
    heroCtaLearn: 'ഞങ്ങളുടെ പരിപാടികളെ കുറിച്ച് അറിയുക',
  },
} satisfies Record<Locale, Record<string, string>>;

export function t(locale: Locale, key: string): string {
  const localeStrings = strings[locale] as Record<string, string> | undefined;
  return localeStrings?.[key] ?? (strings.en as Record<string, string>)[key] ?? key;
}

export type I18nKey = keyof typeof strings.en;
