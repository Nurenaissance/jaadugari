import { IMAGES } from '../lib/media'

// ============================================
// VENUES
// --------------------------------------------
// One record per Jaadugari property. Anything the
// client has not supplied yet is left null / empty
// on purpose — the pages render a "coming soon"
// panel instead of borrowing or inventing content.
//
// TO FILL IN LATER, per venue:
//   heroImage      → Google Drive file id (see src/lib/media.js)
//   aboutImage     → Google Drive file id
//   galleryImages  → [{ id: '<drive id>', label: 'Caption' }, ...]
//   menu.items     → [{ name, desc, price, tag? }, ...] per category
//   hours          → [{ label, time }, ...]
//   phones, email
// ============================================

export const VENUES = [
  {
    key: 'morjim',
    name: 'Jaadugari',
    shortName: 'Morjim',
    kind: 'Indian Resto & Bar',
    tagline: 'Indian Resto & Bar',
    place: 'Lamrin · Morjim · Goa',
    path: '/',
    heroImage: IMAGES.hero,
    addressLines: [
      'Jaadugari Indian Resto & Bar',
      'Lamrin Morjim, 664/A',
      'Munugwada, Malekarwada',
      'Morjim, Goa 403512',
    ],
    mapsQuery: 'Jaadugari Indian Resto & Bar, Lamrin Morjim, Morjim, Goa 403512',
    // TODO(client): confirm — these are placeholders inherited from the original build
    phones: ['+91 98765 43210', '+91 98765 43211'],
    email: 'hello@jaadugari.com',
    hours: [
      { label: 'Lunch', time: '12:00 PM — 3:30 PM' },
      { label: 'Dinner', time: '7:00 PM — 11:30 PM' },
      { label: 'Bar', time: '12:00 PM — 12:00 AM' },
    ],
    takesReservations: true,
  },
  {
    key: 'bakehouse',
    name: 'Jaadugari Bakehouse',
    shortName: 'Bakehouse',
    kind: 'Bakery & Café',
    tagline: 'Bakery & Café',
    place: 'Vithaldas Waddo · Morjim · Goa',
    path: '/bakehouse',
    heroImage: null,
    aboutImage: null,
    addressLines: [
      'Jaadugari Bakehouse',
      'Glav Fish, H. No. 943',
      'Vithaldas Waddo, Morjim',
      'Pernem, North Goa 403512',
    ],
    mapsQuery: 'Glav Fish, H No 943, Vithaldas Waddo, Morjim, Pernem, North Goa 403512',
    intro: [
      'A short walk from the sand at Morjim, the Bakehouse is the quieter side of Jaadugari — an all-day counter built around the oven, where the day starts with coffee and the smell of something just out of it.',
      'The same hands and the same care behind our kitchen at Lamrin, turned toward bread, pastry and the small pleasures of a slow Goan morning.',
    ],
    galleryImages: [],
    phones: [],
    email: null,
    hours: null,
    // Category shells only — items and prices to come.
    menu: {
      categories: [
        { key: 'bakes', label: 'Bakes & Breads' },
        { key: 'pastry', label: 'Pastry & Cakes' },
        { key: 'coffee', label: 'Coffee & Tea' },
        { key: 'plates', label: 'All-Day Plates' },
      ],
      items: {
        bakes: [],
        pastry: [],
        coffee: [],
        plates: [],
      },
    },
    takesReservations: false,
  },
  {
    key: 'palampur',
    name: 'Jaadugari Palampur',
    shortName: 'Palampur',
    kind: 'Restaurant',
    tagline: 'Restaurant · Himachal Pradesh',
    place: 'Lamrin Norwood Green · Palampur',
    path: '/palampur',
    heroImage: null,
    aboutImage: null,
    addressLines: [
      'Jaadugari Palampur',
      'Ground Floor, Lamrin Norwood Green',
      'Village Lohna, Palampur',
      'Himachal Pradesh 176061',
    ],
    mapsQuery: 'Lamrin Norwood Green, Village Lohna, Palampur, Himachal Pradesh 176061',
    intro: [
      'Set on the ground floor of Lamrin Norwood Green, our Palampur restaurant looks out across the tea gardens of the Kangra valley to the Dhauladhar range beyond.',
      'The magic travels north. Here it meets the Himalayan pantry — mountain grains, valley produce and the slow, warming cooking these hills have always done best.',
    ],
    galleryImages: [],
    phones: [],
    email: null,
    hours: null,
    // Category shells only — dishes and prices to come.
    menu: {
      categories: [
        { key: 'himachali', label: 'Himachali Specials' },
        { key: 'mains', label: 'Mains' },
        { key: 'breads', label: 'Breads & Rice' },
        { key: 'hotDrinks', label: 'Tea & Coffee' },
        { key: 'bar', label: 'Bar' },
      ],
      items: {
        himachali: [],
        mains: [],
        breads: [],
        hotDrinks: [],
        bar: [],
      },
    },
    takesReservations: true,
  },
]

export const getVenue = (key) => VENUES.find((v) => v.key === key)

export const mapsUrl = (venue) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`
