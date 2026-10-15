/* ReFurnish demo data. Replace with API calls when a backend exists. */
window.RF_DATA = (function () {
  var CATEGORIES = ['Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Lighting'];
  var CONDITIONS = [
    { label: 'Like new', hint: 'No visible wear' },
    { label: 'Very good', hint: 'Light signs of use' },
    { label: 'Good', hint: 'Some marks, sturdy' },
    { label: 'Needs love', hint: 'Repair or refinish' }
  ];
  var AREAS = ['Gulshan', 'Banani', 'Dhanmondi', 'Uttara', 'Mirpur', 'Bashundhara', 'Mohammadpur', 'Baridhara'];
  var CITIES = ['Dhaka', 'Chattogram', 'Sylhet', 'Khulna', 'Rajshahi'];

  var SELLERS = {
    nadia:   { id: 'nadia',   name: 'Nadia Rahman',     area: 'Gulshan',     rating: 4.9, reviews: 32, sold: 12, since: 'March 2024', replies: 'Usually replies within an hour', verified: true },
    tanvir:  { id: 'tanvir',  name: 'Tanvir Ahmed',     area: 'Dhanmondi',   rating: 4.8, reviews: 14, sold: 6,  since: 'June 2024',  replies: 'Usually replies within a few hours', verified: true },
    farhana: { id: 'farhana', name: 'Farhana Islam',    area: 'Banani',      rating: 4.7, reviews: 9,  sold: 4,  since: 'January 2025', replies: 'Usually replies within a day', verified: false },
    sabbir:  { id: 'sabbir',  name: 'Sabbir Hossain',   area: 'Mirpur',      rating: 4.9, reviews: 21, sold: 10, since: 'November 2023', replies: 'Usually replies within an hour', verified: true },
    mithila: { id: 'mithila', name: 'Mithila Chowdhury', area: 'Bashundhara', rating: 5.0, reviews: 7,  sold: 3,  since: 'April 2025', replies: 'Usually replies within a few hours', verified: true },
    rafiq:   { id: 'rafiq',   name: 'Rafiq Hasan',      area: 'Uttara',      rating: 4.6, reviews: 11, sold: 5,  since: 'August 2024', replies: 'Usually replies within a day', verified: false },
    arif:    { id: 'arif',    name: 'Arif Karim',       area: 'Baridhara',   rating: 4.8, reviews: 18, sold: 8,  since: 'February 2024', replies: 'Usually replies within a few hours', verified: true }
  };

  function L(o) {
    return Object.assign({ delivery: true, verified: false, photos: [], sold: false, wasPrice: null, sub: o.cat }, o);
  }

  var LISTINGS = [
    L({ id: 'linen-sofa', name: 'Linen three-seater sofa', price: 38000, cat: 'Sofas', area: 'Gulshan', cond: 'Like new', ageHours: 48, seller: 'nadia', verified: true,
        desc: 'Oatmeal linen over a solid wood frame. Cushion covers zip off for washing. Gently used — a small pull on the back of the left cushion (photo 4). Smoke-free home. Selling because we\'re moving.',
        dims: '210 × 90 × 80 cm', material: 'Linen, solid wood', age: 'About 1½ years' }),
    L({ id: 'teak-lounge', name: 'Teak lounge chair', price: 14500, cat: 'Chairs', area: 'Dhanmondi', cond: 'Good', ageHours: 5, seller: 'tanvir', verified: true,
        desc: 'Solid teak frame with a cotton seat pad. Some surface scratches on the left arm, otherwise sturdy and comfortable.', dims: '70 × 80 × 85 cm', material: 'Teak, cotton', age: 'About 4 years' }),
    L({ id: 'oak-dining', name: 'Round oak dining table', price: 22000, cat: 'Tables', area: 'Banani', cond: 'Very good', ageHours: 24, seller: 'farhana',
        desc: 'Seats four comfortably. Oiled oak top with a few faint ring marks. Pedestal base, very stable.', dims: '110 cm diameter, 75 cm high', material: 'Oak', age: 'About 3 years' }),
    L({ id: 'platform-bed', name: 'Low platform bed, queen', price: 27000, cat: 'Beds', area: 'Mirpur', cond: 'Good', ageHours: 72, seller: 'sabbir', verified: true,
        desc: 'Queen-size platform bed in mahogany. Comes apart into four pieces for transport. Mattress not included.', dims: '160 × 210 × 30 cm', material: 'Mahogany', age: 'About 5 years' }),
    L({ id: 'cane-armchair', name: 'Cane armchair', price: 6500, cat: 'Chairs', area: 'Uttara', cond: 'Very good', ageHours: 6, seller: 'rafiq', delivery: false,
        desc: 'Handwoven cane on a mango wood frame. Light and easy to move. Cushion included.', dims: '65 × 70 × 80 cm', material: 'Cane, mango wood', age: 'About 2 years' }),
    L({ id: 'velvet-loveseat', name: 'Velvet loveseat', price: 24000, cat: 'Sofas', sub: 'Loveseats', area: 'Bashundhara', cond: 'Like new', ageHours: 24, seller: 'mithila', verified: true,
        desc: 'Emerald velvet two-seater with brass legs. Used in a guest room, barely sat on.', dims: '150 × 80 × 78 cm', material: 'Velvet, brass', age: 'About 1 year' }),
    L({ id: 'mango-coffee', name: 'Mango wood coffee table', price: 9800, cat: 'Tables', area: 'Mohammadpur', cond: 'Good', ageHours: 96, seller: 'rafiq', verified: true,
        desc: 'Chunky mango wood top with a lower shelf. A couple of small dents on one corner.', dims: '110 × 60 × 45 cm', material: 'Mango wood', age: 'About 3 years' }),
    L({ id: 'single-bed', name: 'Single bed with drawers', price: 15000, cat: 'Beds', area: 'Baridhara', cond: 'Very good', ageHours: 48, seller: 'arif',
        desc: 'Single bed with two deep drawers underneath. Great for a kid\'s room.', dims: '100 × 200 × 40 cm', material: 'Engineered wood', age: 'About 2 years' }),
    L({ id: 'corner-sofa', name: 'Modular corner sofa', price: 52000, cat: 'Sofas', area: 'Banani', cond: 'Very good', ageHours: 6, seller: 'farhana', verified: true,
        desc: 'L-shaped modular sofa in grey wool blend. The chaise can sit on either side.', dims: '280 × 180 × 82 cm', material: 'Wool blend, pine', age: 'About 2 years' }),
    L({ id: 'cotton-two', name: 'Cotton two-seater', price: 16500, cat: 'Sofas', sub: 'Loveseats', area: 'Mirpur', cond: 'Good', ageHours: 72, seller: 'sabbir',
        desc: 'Compact two-seater in washed blue cotton. Some fading on one arm from sunlight.', dims: '145 × 82 × 80 cm', material: 'Cotton, pine', age: 'About 4 years' }),
    L({ id: 'chesterfield', name: 'Leather Chesterfield', price: 45000, cat: 'Sofas', area: 'Dhanmondi', cond: 'Very good', ageHours: 120, seller: 'tanvir', verified: true,
        desc: 'Classic buttoned Chesterfield in tan leather. Leather has softened nicely, no tears.', dims: '200 × 90 × 75 cm', material: 'Leather, hardwood', age: 'About 6 years' }),
    L({ id: 'rattan-set', name: 'Rattan sofa set', price: 21000, cat: 'Sofas', area: 'Uttara', cond: 'Good', ageHours: 24, seller: 'rafiq',
        desc: 'Three-seater plus two armchairs in natural rattan, with cushions. Ideal for a balcony.', dims: 'Sofa 180 × 75 × 80 cm', material: 'Rattan', age: 'About 3 years' }),
    L({ id: 'sofa-bed', name: 'Sofa bed, grey', price: 12000, cat: 'Sofas', sub: 'Sofa beds', area: 'Mohammadpur', cond: 'Needs love', ageHours: 48, seller: 'rafiq', delivery: false,
        desc: 'Folds out into a double bed. Mechanism works, but the fabric has stains and needs a cover.', dims: '190 × 90 × 85 cm', material: 'Polyester, steel', age: 'About 5 years' }),
    L({ id: 'midcentury', name: 'Mid-century three-seater', price: 33000, cat: 'Sofas', area: 'Baridhara', cond: 'Very good', ageHours: 4, seller: 'arif', verified: true,
        desc: 'Mustard tweed with tapered walnut legs. Firm seat, recently reupholstered.', dims: '195 × 85 × 78 cm', material: 'Tweed, walnut', age: 'About 3 years' }),
    L({ id: 'boucle', name: 'Boucle accent sofa', price: 29500, cat: 'Sofas', area: 'Gulshan', cond: 'Like new', ageHours: 168, seller: 'nadia', verified: true,
        desc: 'Cream boucle with rounded arms. Kept in a pet-free, smoke-free home.', dims: '170 × 85 × 72 cm', material: 'Boucle, beech', age: 'About 8 months' }),
    L({ id: 'walnut-sideboard', name: 'Walnut sideboard', price: 28000, wasPrice: 31500, cat: 'Storage', area: 'Gulshan', cond: 'Very good', ageHours: 120, seller: 'nadia', verified: true,
        desc: 'Four-door walnut veneer sideboard with adjustable shelves. Minor wear on the top edge.', dims: '180 × 45 × 75 cm', material: 'Walnut veneer', age: 'About 4 years' }),
    L({ id: 'rattan-pendant', name: 'Rattan pendant lamp', price: 3800, cat: 'Lighting', area: 'Gulshan', cond: 'Like new', ageHours: 168, seller: 'nadia', verified: true,
        desc: 'Large woven rattan shade with a 1.2 m fabric cord. Bulb included.', dims: '50 cm diameter', material: 'Rattan', age: 'About 1 year' }),
    L({ id: 'pine-bookshelf', name: 'Pine bookshelf', price: 7500, cat: 'Storage', area: 'Gulshan', cond: 'Good', ageHours: 72, seller: 'nadia', verified: true,
        desc: 'Five-shelf pine bookcase. A few pin holes on the back panel.', dims: '80 × 30 × 180 cm', material: 'Pine', age: 'About 5 years' }),
    L({ id: 'cane-chairs', name: 'Set of four cane chairs', price: 18000, cat: 'Chairs', area: 'Mohammadpur', cond: 'Good', ageHours: 300, seller: 'rafiq', sold: true,
        desc: 'Four matching cane-back dining chairs.', dims: '45 × 50 × 90 cm each', material: 'Cane, teak', age: 'About 6 years' }),
    L({ id: 'floor-lamp', name: 'Brass floor lamp', price: 5200, cat: 'Lighting', area: 'Bashundhara', cond: 'Very good', ageHours: 30, seller: 'mithila', verified: true,
        desc: 'Arched brass floor lamp with a linen shade. Works perfectly.', dims: '160 cm high', material: 'Brass, linen', age: 'About 2 years' }),
    L({ id: 'wardrobe', name: 'Two-door wardrobe', price: 19500, cat: 'Storage', area: 'Uttara', cond: 'Good', ageHours: 50, seller: 'rafiq',
        desc: 'Solid wood wardrobe with hanging rail and three shelves. Comes apart for moving.', dims: '100 × 55 × 190 cm', material: 'Gamari wood', age: 'About 7 years' }),
    L({ id: 'desk-chair', name: 'Wooden desk chair', price: 4500, cat: 'Chairs', area: 'Banani', cond: 'Very good', ageHours: 10, seller: 'farhana',
        desc: 'Simple bentwood desk chair. Sturdy, no wobble.', dims: '45 × 50 × 85 cm', material: 'Beech', age: 'About 2 years' })
  ];

  /* Seed data for the signed-in demo user (stored in the browser on first visit). */
  var MY_LISTINGS = [
    { id: 'my-desk', name: 'Oak writing desk', price: 12500, cat: 'Tables', area: 'Gulshan', cond: 'Very good', ageHours: 50, status: 'Active', views: 142, chats: 4, delivery: true,
      desc: 'Solid oak desk with one drawer. Light marks on the top, legs are perfect.', dims: '120 × 60 × 75 cm', material: 'Oak', age: 'About 3 years' },
    { id: 'my-shoe', name: 'Shoe cabinet', price: 5500, cat: 'Storage', area: 'Gulshan', cond: 'Good', ageHours: 120, status: 'Active', views: 61, chats: 1, delivery: false,
      desc: 'Slim two-door shoe cabinet, holds about 16 pairs.', dims: '80 × 30 × 100 cm', material: 'Engineered wood', age: 'About 4 years' },
    { id: 'my-bamboo', name: 'Bamboo floor lamp', price: 2800, cat: 'Lighting', area: 'Gulshan', cond: 'Like new', ageHours: 168, status: 'Active', views: 40, chats: 0, delivery: true,
      desc: 'Tall bamboo lamp with a paper shade. Warm, soft light.', dims: '150 cm high', material: 'Bamboo, paper', age: 'About 6 months' },
    { id: 'my-lamp-table', name: 'Glass-top side table', price: 4000, cat: 'Tables', area: 'Gulshan', cond: 'Good', ageHours: 300, status: 'Sold', soldTo: 'Farhana I.', soldOn: '2 Oct', views: 87, chats: 3 },
    { id: 'my-teak', name: 'Teak rocking chair', price: 14500, cat: 'Chairs', area: 'Gulshan', cond: 'Very good', ageHours: 200, status: 'Sold', soldTo: 'Tanvir A.', soldOn: '12 Oct', views: 320, chats: 9 },
    { id: 'my-bunk', name: 'Wooden bunk bed', price: null, cat: 'Beds', area: 'Gulshan', cond: 'Good', ageHours: 20, status: 'Draft', views: 0, chats: 0, photoCount: 3 }
  ];

  var THREADS = [
    { id: 't-linen', listing: 'linen-sofa', with: 'nadia', role: 'buying', unread: true, msgs: [
      { me: false, text: 'Hi! Yes, the sofa is still available.', time: '10:02' },
      { me: true, text: 'Great. Is the small pull on the cushion very noticeable?', time: '10:05' },
      { me: false, text: 'Not really — it’s on the back side. I can send a close-up.', time: '10:06' },
      { me: false, text: 'You’re welcome to come see it this weekend.', time: '10:06' }
    ] },
    { id: 't-desk', listing: 'my-desk', with: 'mithila', role: 'selling', unread: true, msgs: [
      { me: false, text: 'Hi! Is the desk still available? Could I come and see it on Friday?', time: '09:41' }
    ] },
    { id: 't-teak', listing: 'teak-lounge', with: 'tanvir', role: 'buying', unread: true, msgs: [
      { me: true, text: 'Would you take ৳ 13,000 for the chair?', time: 'Yesterday' },
      { me: false, text: 'I could do ৳ 13,500 if you pick up this week.', time: 'Yesterday' }
    ] },
    { id: 't-oak', listing: 'oak-dining', with: 'farhana', role: 'buying', unread: false, msgs: [
      { me: true, text: 'Is the table still for sale?', time: 'Mon' },
      { me: false, text: 'It is! Pickup from Banani.', time: 'Mon' }
    ] },
    { id: 't-bed', listing: 'platform-bed', with: 'sabbir', role: 'buying', unread: false, msgs: [
      { me: false, text: 'Thanks for buying! Hope the bed got there safely.', time: 'Sun' }
    ] }
  ];

  var REVIEWS = {
    nadia: [
      { who: 'Tanvir A.', item: 'a teak lounge chair', when: '12 Oct 2026', n: 5, text: 'Exactly as in the photos. Nadia helped carry it down to the car too.' },
      { who: 'Farhana I.', item: 'a glass side table', when: '2 Oct 2026', n: 5, text: 'Quick replies and a very easy pickup. Would buy from her again.' },
      { who: 'Sabbir H.', item: 'a floor lamp', when: 'Sep 2026', n: 4, text: 'Lamp works well. Shade had a small mark she’d mentioned, so no surprises.' }
    ]
  };
  var GENERIC_REVIEWS = [
    { who: 'Mahin K.', item: 'a side table', when: 'Sep 2026', n: 5, text: 'Smooth handover and the piece was exactly as described.' },
    { who: 'Priya D.', item: 'a dining chair', when: 'Aug 2026', n: 4, text: 'Friendly and on time. Small scuff that wasn’t in the photos, but fair price.' }
  ];

  var SAVED_SEED = ['linen-sofa', 'walnut-sideboard', 'rattan-pendant', 'cane-chairs', 'mango-coffee', 'boucle'];

  return {
    CATEGORIES: CATEGORIES, CONDITIONS: CONDITIONS, AREAS: AREAS, CITIES: CITIES,
    SELLERS: SELLERS, LISTINGS: LISTINGS, MY_LISTINGS: MY_LISTINGS, THREADS: THREADS,
    REVIEWS: REVIEWS, GENERIC_REVIEWS: GENERIC_REVIEWS, SAVED_SEED: SAVED_SEED
  };
})();
