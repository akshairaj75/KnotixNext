import { BusinessContact, HeroBannerContent } from './types';

export const SITE_CONFIG = {
  favicon: '/static/favicon.png',
};

export const HERO_BANNER: HeroBannerContent = {
  badge: 'KNOTIX ATELIER • 2026 CAMPAIGN',
  title: 'COLLECTIONS',
  subtitle: 'Carry more than style. Distinctive designs crafted with character.',
  buttonText: 'Explore Creations',
  buttonLink: '#catalog-section',
  // Local path (in public/ folder, e.g. '/static/hero4.jpeg') or external URL:
  backgroundImage: '/static/hero1.jpeg',
  // Layout mode: 'split' (optimal for portrait/editorial posters) or 'fullscreen' (for wide landscape banners)
  layout: 'split',
};

export const BUSINESS_CONTACT: BusinessContact = {
  brandName: 'Knotix',
  legalEntity: 'Knotix Crafted with charecter Private Limited',
  owner: 'Knotix admin',
  address: {
    line1: 'Building No. XII/450,',
    line2: 'Crafts Plaza, MG Road,',
    line3: 'Malappuram , Kerala - 682016,',
    country: 'India',
    full: 'Building No. XII/450, Crafts Plaza, MG Road, Ernakulam, Kerala - 682016, India'
  },
  phone: '+91 9744802218',
  phoneRaw: '+919744802218',
  email: 'contact.knotix@gmail.com',
  whatsapp: '+9197448 02218',
  whatsappLink: 'https://wa.me/919744802218',
  grievanceEmail: 'grievance@knotixcrafts.com',
  instagram: 'https://www.instagram.com/knotix_official',
  instagramHandle: '@knotix_official',
  supportHours: {
    days: 'Monday – Saturday',
    timings: '9:00 AM – 6:00 PM (IST)'
  }
};
