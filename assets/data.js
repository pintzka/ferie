// Sommerferie 2026 — alle data om reisen.
// Denne filen er statisk. Brukerdata (rating, ønsker, dagbok, budsjett) lagres i data/ via GitHub Contents API.

const TRIP = {
  title: "Sommerferie 2026",
  travelers: [
    { id: "carl", name: "Carl", age: 41, role: "far", emoji: "🏃‍♂️" },
    { id: "anne", name: "Anne", age: 43, role: "mor", emoji: "🏃‍♀️" },
    { id: "miriam", name: "Miriam", age: 14, role: "barn", emoji: "👧" },
    { id: "daniel", name: "Daniel", age: 13, role: "barn", emoji: "🧒" },
    { id: "elias", name: "Elias", age: 10, role: "barn", emoji: "🧒" }
  ],
  car: {
    model: "Tesla Model Y Juniper",
    battery_kwh: 75,
    peak_kw: 250,
    real_range_km: 400,
    notes: "Reell rekkevidde fullastet familiebil 110 km/t i sommervarme."
  },
  totals: {
    km: 4035,
    drivetime_h: 43,
    charging_h: 3.4,
    nights_abroad: 21
  },
  countdown_target: "2026-06-21T08:00:00+02:00",
  end_date: "2026-07-15"
};

// Boliger med full adresse, verifiserte koordinater og maps-lenker
const LODGINGS = {
  "grelland": { name: "Familien Grelland", address: "Nordbergbakken 9, 0875 Oslo", lat: 59.9559, lng: 10.7420, gmaps: "https://maps.google.com/?q=Nordbergbakken+9+Oslo", url: null },
  "rekdal": { name: "Familien Rekdal", address: "Fossilveien 2, 1346 Gjettum (Bærum)", lat: 59.9050, lng: 10.5238, gmaps: "https://maps.google.com/?q=Fossilveien+2+Gjettum", url: null },
  "color-magic": { name: "MS Color Magic", address: "Color Line Terminal, Hjortnes, 0250 Oslo", lat: 59.911, lng: 10.685, gmaps: "https://maps.google.com/?q=Color+Line+Terminal+Hjortnes+Oslo", url: "https://www.colorline.no/" },
  "art-nouveau": { name: "Hotel Art Nouveau", address: "Leibnizstraße 59, 10629 Berlin", lat: 52.5028, lng: 13.3128, gmaps: "https://maps.google.com/?q=Hotel+Art+Nouveau+Leibnizstrasse+59+Berlin", url: "https://www.hotelartnouveau.de/" },
  "dresden-fam": { name: "Leilighet hos familie (Dresden)", address: "Adresse mangler — ber familien om presis", lat: 51.0504, lng: 13.7373, gmaps: null, url: null },
  "alpenparks": { name: "AlpenParks Chalet & Apartment Alpina", address: "Geigenbühelstraße 12, 6100 Seefeld in Tirol, Østerrike", lat: 47.3347, lng: 11.1873, gmaps: "https://maps.google.com/?q=Geigenb%C3%BChelstra%C3%9Fe+12+Seefeld", url: "https://www.alpenparks.at/de/chalet-apartment-alpina-seefeld" },
  "bardolino-airbnb": { name: "Airbnb \"Villa Venezia\" Bardolino", address: "Via Montavoletta 14, 37011 Bardolino VR, Italia", lat: 45.5517, lng: 10.7341, gmaps: "https://maps.google.com/?q=Via+Montavoletta+14+Bardolino", url: "https://www.airbnb.no/rooms/51456317" },
  "grado-airbnb": { name: "Airbnb Grado", address: "Riva Brioni 27, 34073 Grado GO, Italia", lat: 45.6826, lng: 13.3788, gmaps: "https://maps.google.com/?q=Riva+Brioni+27+Grado", url: "https://www.airbnb.no/rooms/847787569977003234" },
  "hotel-central-hof": { name: "Hotel Central Hof", address: "Kulmbacher Straße 2, 95030 Hof an der Saale, Tyskland", lat: 50.3206, lng: 11.9043, gmaps: "https://maps.google.com/?q=Hotel+Central+Hof+Kulmbacher+2", url: "https://hotel-central-hof.de/" },
  "hamburg-tbd": { name: "Hamburg — hotell ikke booket", address: "HafenCity / Speicherstadt anbefalt", lat: 53.5413, lng: 9.9999, gmaps: null, url: null },
  "hjemme": { name: "Hjemme", address: "Leiv Eirikssons vei 3a, 7040 Trondheim", lat: 63.4308, lng: 10.4574, gmaps: "https://maps.google.com/?q=Leiv+Eirikssons+vei+3a+Trondheim", url: null }
};

// Hver dag i ferien. city-slug peker inn i CITIES. lodging_id peker inn i LODGINGS.
const DAYS = [
  { date: "2026-06-21", weekday: "søndag", from: "Trondheim", to: "Oslo", city: "oslo",
    km: 500, drivetime_h: 6.5, lodging_id: "grelland",
    note: "Avreise morgen. Rv3 via Berkåk, Kvikne, Tynset, Elverum. Ladestopp Elverum West.", charging_leg: "trondheim-oslo" },
  { date: "2026-06-22", weekday: "mandag", from: "Oslo", to: "Kiel (Color Line)", city: "ferge",
    km: 0, drivetime_h: 0, lodging_id: "color-magic",
    note: "Kjør til Hjortnes-terminalen. Avgang Color Line 14:00. Spis ombord.", charging_leg: null },
  { date: "2026-06-23", weekday: "tirsdag", from: "Kiel (ferge ankomst)", to: "Berlin", city: "berlin",
    km: 350, drivetime_h: 4, lodging_id: "art-nouveau",
    note: "Ferge ankommer kl 10:00. Kort ladestopp Wittenburg. Ankomst Berlin ca 15:30.", charging_leg: "kiel-berlin" },
  { date: "2026-06-24", weekday: "onsdag", from: "Berlin", to: "Dresden", city: "dresden",
    km: 200, drivetime_h: 2.5, lodging_id: "dresden-fam",
    note: "Sjekk ut Berlin etter frokost. Direkte til Dresden uten lading.", charging_leg: "berlin-dresden" },
  { date: "2026-06-25", weekday: "torsdag", from: "Dresden", to: "Seefeld", city: "seefeld",
    km: 600, drivetime_h: 6.5, lodging_id: "alpenparks",
    note: "Lang etappe. To ladestopp: Bayreuth Nord + München OEZ.", charging_leg: "dresden-seefeld" },
  { date: "2026-06-26", weekday: "fredag", from: "Seefeld", to: "Seefeld", city: "seefeld",
    km: 0, drivetime_h: 0, lodging_id: "alpenparks",
    note: "Alpedag: Rosshütte funikulær, lunsj på fjellet, evt Mittenwald.", charging_leg: null },
  { date: "2026-06-27", weekday: "lørdag", from: "Seefeld", to: "Bardolino", city: "bardolino",
    km: 270, drivetime_h: 3.5, lodging_id: "bardolino-airbnb",
    note: "Brenner sør, ladestopp Bolzano. Ankomst Bardolino ettermiddag.", charging_leg: "seefeld-bardolino" },
  { date: "2026-06-28", weekday: "søndag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "Innstillingsdag." },
  { date: "2026-06-29", weekday: "mandag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "" },
  { date: "2026-06-30", weekday: "tirsdag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "" },
  { date: "2026-07-01", weekday: "onsdag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "" },
  { date: "2026-07-02", weekday: "torsdag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "Marked i Bardolino 08–13." },
  { date: "2026-07-03", weekday: "fredag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "" },
  { date: "2026-07-04", weekday: "lørdag", from: "Bardolino", to: "Bardolino", city: "bardolino",
    km: 0, drivetime_h: 0, lodging_id: "bardolino-airbnb", note: "Siste dag Bardolino." },
  { date: "2026-07-05", weekday: "søndag", from: "Bardolino", to: "Grado", city: "grado",
    km: 270, drivetime_h: 3, lodging_id: "grado-airbnb",
    note: "Direkte østover. Lad helt opp i Villesse på vei inn.", charging_leg: "bardolino-grado" },
  { date: "2026-07-06", weekday: "mandag", from: "Grado", to: "Grado", city: "grado",
    km: 0, drivetime_h: 0, lodging_id: "grado-airbnb", note: "" },
  { date: "2026-07-07", weekday: "tirsdag", from: "Grado", to: "Grado", city: "grado",
    km: 0, drivetime_h: 0, lodging_id: "grado-airbnb", note: "Sykkeltur til Aquileia anbefales." },
  { date: "2026-07-08", weekday: "onsdag", from: "Grado", to: "Grado", city: "grado",
    km: 0, drivetime_h: 0, lodging_id: "grado-airbnb", note: "Siste dag — evt Trieste." },
  { date: "2026-07-09", weekday: "torsdag", from: "Grado", to: "Hof", city: "hof",
    km: 780, drivetime_h: 9, lodging_id: "hotel-central-hof",
    note: "KJØREDAG MAXIMUS. Fire ladestopp. Ankomst Hof ca kl 19–20. Vurder å splitte med natt i Salzburg.", charging_leg: "grado-hof" },
  { date: "2026-07-10", weekday: "fredag", from: "Hof", to: "Hamburg", city: "hamburg",
    km: 500, drivetime_h: 5, lodging_id: "hamburg-tbd",
    note: "Ankomst Hamburg ettermiddag. Miniatur Wunderland åpent til 19:00.", charging_leg: "hof-hamburg" },
  { date: "2026-07-11", weekday: "lørdag", from: "Hamburg", to: "Kiel (Color Line)", city: "ferge",
    km: 100, drivetime_h: 1, lodging_id: "color-magic",
    note: "Speicherstadt på morgenen. Kjør Kiel etter lunsj. Avgang 14:00.", charging_leg: null },
  { date: "2026-07-12", weekday: "søndag", from: "Kiel-ankomst", to: "Oslo", city: "oslo",
    km: 0, drivetime_h: 0, lodging_id: "rekdal", note: "Ferge ankommer Oslo morgen." },
  { date: "2026-07-13", weekday: "mandag", from: "Oslo", to: "Oslo", city: "oslo",
    km: 0, drivetime_h: 0, lodging_id: "rekdal", note: "" },
  { date: "2026-07-14", weekday: "tirsdag", from: "Oslo", to: "Oslo", city: "oslo",
    km: 0, drivetime_h: 0, lodging_id: "rekdal", note: "" },
  { date: "2026-07-15", weekday: "onsdag", from: "Oslo", to: "Trondheim", city: "trondheim",
    km: 500, drivetime_h: 6.5, lodging_id: "hjemme",
    note: "Hjem. Rv3-ruten i revers via Elverum, Tynset, Kvikne, Berkåk.", charging_leg: "oslo-trondheim" }
];

// Byene. Inneholder all research.
const CITIES = {
  oslo: {
    name: "Oslo", country: "Norge", flag: "🇳🇴", lat: 59.913, lng: 10.752,
    color: "#1e40af",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Nationaltheatret_evening.jpg/330px-Nationaltheatret_evening.jpg",
    summary: "Transittstopp før Kiel-fergen og igjen etter hjemkomst. Familien bor hos slekt.",
    nights: 5,
    attractions: [
      { name: "Vigelandsparken", why: "Hvis det er en ledig ettermiddag — perfekt for å strekke beina etter kjøring.", distance: "10 min fra Frogner", kids: "Ja" },
      { name: "Holmenkollen", why: "Utsikt + skimuseet hvis været er dårlig.", distance: "20 min med bil", kids: "Ja" },
      { name: "Tjuvholmen / Aker Brygge", why: "Spasertur og is.", distance: "Sentrum", kids: "Ja" }
    ],
    restaurants: [],
    runningRoutes: [
      { name: "Sognsvann-runden", distance_km: 3.3, elevation_m: 30, surface: "grus", note: "Klassisk Oslo-løperute, lett." },
      { name: "Maridalsvannet rundt", distance_km: 13, elevation_m: 60, surface: "grus/asfalt", note: "Bra langtur." }
    ],
    practical: { charging: "Mange Tesla SC i Oslo-området." }
  },

  ferge: {
    name: "Color Line ferge", country: "Skagerrak", flag: "⛴️", lat: 58.55, lng: 10.5,
    color: "#0ea5e9",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/ColorMagic_Liegeplatz_Taufe_Kiel2007.jpg/330px-ColorMagic_Liegeplatz_Taufe_Kiel2007.jpg",
    summary: "Color Magic Oslo–Kiel. Avgang 14:00, ankomst 10:00 dagen etter. 20 timer over Skagerrak.",
    nights: 2,
    attractions: [
      { name: "Buffet eller à la carte ombord", why: "Reserver bord i forveien.", distance: "Ombord", kids: "Ja" },
      { name: "Spa / svømmebasseng", why: "Barna kan brenne energi før de skal sove i lugar.", distance: "Ombord", kids: "Ja" }
    ],
    practical: {
      charging: "Tesla destination charging på Color Line-fergene — ikke garantert, sjekk ved booking.",
      tips: "Vær tidlig ute med å booke lugar — store familielugarer er populære. Bring filmer/nedlastet musikk."
    }
  },

  berlin: {
    name: "Berlin", country: "Tyskland", flag: "🇩🇪", lat: 52.5028, lng: 13.3128,
    color: "#525252",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg/330px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29_b.jpg",
    summary: "Én natt i Charlottenburg. Hotel Art Nouveau ligger 200 m fra Ku'damm og 500 m fra Savignyplatz S-Bahn.",
    nights: 1,
    attractions: [
      { name: "Kaiser-Wilhelm-Gedächtniskirche", why: "Krigsruin fra 1895 + blå glasskirke (1961) ved siden av. Treffer hardt visuelt. Gratis.", distance: "850 m / 10 min gange", kids: "Ja" },
      { name: "Schloss Charlottenburg + slottshagen", why: "Største preussiske barokkslott. Hagen er gratis, 55 ha — perfekt for å strekke bena.", distance: "2 km / 25 min gange", kids: "Ja, særlig hagen" },
      { name: "Brandenburger Tor + Holocaust-Mahnmal + Reichstag", why: "Den klassiske aksen. NB: Reichstag-kuppelen er stengt 15.–19. juni 2026, sjekk om 23.06 er åpen. Bestilles 4–6 uker før.", distance: "6 km / 10 min med bil eller U-Bahn U2", kids: "Ja — Miriam vil sette pris på Holocaust-monumentet" },
      { name: "Tiergarten + Siegessäule", why: "Største bypark sentralt. Klatre 285 trinn opp Siegessäule for utsikt (8 €).", distance: "3 km til parkkant", kids: "Ja — Elias løper i parken" },
      { name: "Käthe-Kollwitz-Museum (Fasanenstraße 24)", why: "Lite, intimt museum — sterke verk om sorg, krig og moderskap.", distance: "600 m / 8 min gange", kids: "Best for Miriam (14)" }
    ],
    restaurants: [
      { name: "893 Ryōtei", address: "Kantstraße 135", type: "Japansk/sushi (Duc Ngo)", price: "€€€", must_try: "Yellowtail sashimi med jalapeño, black cod", kids: "Ok for tenåringer; voksen stemning" },
      { name: "Mr. Hai Kabuki", address: "Olivaer Platz 10", type: "Japansk/sushi", price: "€€", must_try: "Maki-utvalget; lyse lokaler", kids: "Ja — også Elias" },
      { name: "12 Apostoli", address: "Bleibtreustraße 49 (Savignyplatz S-Bahn-bue)", type: "Italiensk/pizza", price: "€€", must_try: "Tynne, ekstra-store pizzaer oppkalt etter apostlene", kids: "Ja — familievennlig" },
      { name: "Lubitsch", address: "Bleibtreustraße 47", type: "Tysk bistro/wienerschnitzel", price: "€€", must_try: "Wienerschnitzel med kartoffelsalat; ribbe", kids: "Ja" },
      { name: "Zwiebelfisch", address: "Savignyplatz 7", type: "Berlinsk kneipe, hjemmelaget", price: "€", must_try: "Goulasch, Maultaschen, kartoffelsuppe; fatøl", kids: "Casual; greit tidlig på kvelden" }
    ],
    rainy: [
      "Käthe-Kollwitz-Museum (Fasanenstraße 24) — 600 m, 11–18 daglig, 9 €",
      "Story of Berlin (Kurfürstendamm 207–208) — interaktivt historiemuseum med atombunker",
      "Berlin Aquarium / Zoo (Budapester Straße 32) — 1,8 km, krokodillehall og kvallesalong"
    ],
    runningRoutes: [
      { name: "Tiergarten–Spree-loop fra Brandenburger Tor", distance_km: 11.5, elevation_m: 20, surface: "70% grus, 30% asfalt", note: "Brandenburger Tor → Straße des 17. Juni → Siegessäule → nord til Schloss Bellevue → langs Spree forbi Kanzleramt og Reichstag." },
      { name: "Lietzenseepark-Schloss Charlottenburg-loop", distance_km: 6, elevation_m: 10, surface: "grus + asfalt", note: "Fra hotellet via Lewishamstraße — kortere oppvarmingsrunde." }
    ],
    evening: "Spaserkveld Savignyplatz → Kurfürstendamm → Gedächtniskirche (~1,5 km totalt). Kirken er belyst om kvelden. Avslutt med is på Caffè e Gelato (Tauentzienstraße 21) eller sen pizza på 12 Apostoli.",
    practical: {
      charging: "Tesla Supercharger Berlin-Charlottenburg, Kantstraße 17 (1,5 km fra hotell).",
      tips: "Hotellet har trolig parkering, men gateparkering rundt Leibnizstraße er typisk fri etter 20:00."
    },
    booking_priority: ["Reichstag-kuppel (4–6 uker før)"]
  },

  dresden: {
    name: "Dresden", country: "Tyskland", flag: "🇩🇪", lat: 51.0504, lng: 13.7373,
    color: "#525252",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/HFBK_Dresden_2024_Luftbild_Toni_Klemm_2500px.jpg/330px-HFBK_Dresden_2024_Luftbild_Toni_Klemm_2500px.jpg",
    summary: "Én natt hos familien. Antar 2–4 timer i Altstadt. Alt det viktige ligger innenfor 600 m radius.",
    nights: 1,
    attractions: [
      { name: "Frauenkirche", why: "Gjenoppbygget 1994–2005 etter bombingen i 1945. Stein-for-stein puslespill med originale mørke steiner i den lyse sandsteinen. Gratis inngang. 8 € til kuppelen (67 m).", distance: "Navet i Altstadt", kids: "Ja" },
      { name: "Zwinger", why: "Barokkomplekset med Gemäldegalerie Alte Meister (Raphael, Vermeer). Hagen og fontenene er gratis.", distance: "400 m fra Frauenkirche", kids: "Ja, hagen" },
      { name: "Fürstenzug", why: "102 m langt veggmaleri av 23 000 Meissen-porselensfliser. Gratis, utendørs.", distance: "200 m fra Neumarkt", kids: "Ja" },
      { name: "Brühlsche Terrasse", why: "\"Europas balkong\" — promenade over Elben.", distance: "Rett ved Frauenkirche", kids: "Ja" },
      { name: "Semperoper (Theaterplatz)", why: "Operabygningen utvendig er praktfull. Innomgang krever guidet tur (~13 € voksen, ~7 € barn).", distance: "500 m fra Frauenkirche", kids: "Ja, kort tur" }
    ],
    restaurants: [
      { name: "Sophienkeller im Taschenbergpalais", address: "Taschenberg 3", type: "Saksisk barokk-tema, hvelv", price: "€€", must_try: "Sauerbraten, Dresdner Eierschecke. Servitører i tidskostymer, barn får kroner.", kids: "Ja — designet for barn" },
      { name: "Augustiner an der Frauenkirche", address: "An der Frauenkirche 16–17", type: "Bayersk-saksisk bryggeri", price: "€€", must_try: "Schweinshaxe, weisswurst, ekte Augustiner fatøl. Terrasse mot Frauenkirche.", kids: "Ja — tre etasjer, livlig" },
      { name: "Kastenmeiers", address: "Tzschirnerplatz 3–5 (i Hilton-bygget)", type: "Fisk/regional fine dining", price: "€€€", must_try: "Forell fra Erzgebirge, hvit asparges i juni", kids: "Best uten Elias" },
      { name: "Brennnessel", address: "Schützengasse 18", type: "Vegetarisk i hvelvet kjeller", price: "€€", must_try: "Knödel-varianter, soppretter", kids: "Ja" },
      { name: "Pulverturm an der Frauenkirche", address: "An der Frauenkirche 12", type: "Saksisk mat under Coselpalais", price: "€€", must_try: "Hel svinestek skåret ved bordet; barn ser kjøkkenet", kids: "Ja — temarestaurant" }
    ],
    rainy: [
      "Mathematisch-Physikalischer Salon (Zwinger) — historiske måleinstrumenter, klokker, kloder. 45 min, 12 €. \"Datadrevet\" vinkel for Carl.",
      "Verkehrsmuseum (Augustusstraße 1) — tog, fly, biler, sjøfart. Ti–sø 10–18.",
      "Deutsches Hygiene-Museum (Lingnerplatz 1) — den gjennomsiktige glassmannen + \"Welt der Sinne\" for 5–12 år."
    ],
    runningRoutes: [
      { name: "Elbe-Loop til Blaues Wunder", distance_km: 13, elevation_m: 30, surface: "asfalt", note: "Start Augustusbrücke → kryss til Innere Neustadt → øst langs nordsiden → Blaues Wunder i Loschwitz → kryss tilbake → vest langs sørsiden forbi Brühlsche Terrasse → Augustusbrücke. Soloppgang ca 04:55." }
    ],
    quick_2h: "Frauenkirche → Brühlsche Terrasse → Fürstenzug → Zwinger. ~1,2 km totalt. Hvis kuppel åpen og klart vær, 8 € er verdt det.",
    evening: "Spis Augustiner med Frauenkirche-utsikt eller Sophienkeller (mer opplevelse). Gå over Augustusbrücke i tussmørket — Frauenkirche + Hofkirche-silhuett er kanskje byens beste fotomotiv.",
    practical: { charging: "Tesla Supercharger Dresden Elbepark eller Coschütz." }
  },

  seefeld: {
    name: "Seefeld i Tirol", country: "Østerrike", flag: "🇦🇹", lat: 47.3347, lng: 11.1873,
    color: "#16a34a",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Seefeld_%28133061911%29.jpeg/330px-Seefeld_%28133061911%29.jpeg",
    summary: "To netter. AlpenParks Chalet & Apartment Alpina. Fredag 26.06 er hele dagen \"alpesightseeing\".",
    nights: 2,
    attractions: [
      { name: "Bergbahnen Rosshütte + Härmelekopf", why: "Funikulær fra dalen til Rosshütte (1 760 m), så kabelbane til Härmelekopf (2 064 m). Sommer 23.05.–25.10.2026.", distance: "Dalstasjon 2 km fra sentrum", kids: "Ja — kabelbane = vinner" },
      { name: "Seekirchl & Wildsee", why: "Den åttekantede barokk-kirken (1666) er Seefelds postkort. Wildsee like ved er badbar (1,5 km rundt).", distance: "I sentrum", kids: "Ja — Elias kan bade" },
      { name: "Möserer See", why: "Liten alpinsjø med \"Friedensglocke\". Speilblank, fotogenisk.", distance: "4 km kjøring + 15 min gange", kids: "Ja" },
      { name: "Mittenwald (DE)", why: "Bayersk fjelldal-by 15 min unna. Fiolinbygging (museum), Lüftlmalerei-fasader, Karwendelbahn.", distance: "12 km / 15 min kjøring", kids: "Ja — annerledes opplevelse" },
      { name: "Innsbruck Altstadt + Nordkette", why: "Goldenes Dachl, Hofburg, Maximilianeum. Nordkettenbahn til Hafelekar (2 256 m) på 20 min fra sentrum.", distance: "25 km / 30 min kjøring", kids: "Ja — vill utsikt fra Hafelekar" }
    ],
    restaurants: [
      { name: "Strandperle am Wildsee", address: "Am Wildsee, Seefeld", type: "Alpin/mediterran ved vannet", price: "€€–€€€", must_try: "Forell, kveldsmeny med solnedgang over sjøen", kids: "Ja — om dagen casual badeplass" },
      { name: "Ritter-Oswald-Stube (Klosterbräu)", address: "Klosterstraße 30", type: "Tyrolsk fine dining i 500 år gammelt kloster", price: "€€€", must_try: "Smaksmenyen — familiens \"store middag\"", kids: "Tenåringer ok; ikke optimalt for Elias" },
      { name: "Max Restaurant (Alpin Resort Sacher)", address: "Bahnhofstraße 18", type: "Moderne tyrolsk, Kai Küpferle", price: "€€€", must_try: "Lett gourmet — voksen kveld", kids: "Ikke ideelt med yngste" },
      { name: "Waldgasthaus Triendlsäge", address: "Reitherjochstraße 11", type: "Klassisk tyrolsk i skogen", price: "€€", must_try: "Kaiserschmarrn, Tiroler Gröstl, Käsespätzle", kids: "Ja — familievennlig" },
      { name: "Rosshütte (på fjellet)", address: "Toppstasjon funikulær", type: "Tyrolsk hyttekjøkken", price: "€€", must_try: "Knödelsuppe, Schnitzel — fjellutsikt", kids: "Ja" }
    ],
    rainy: [
      "Olympiabad Seefeld — innendørs 25 m basseng, sklier, sauna, oppvarmet utebasseng",
      "Cinepoint Seefeld (Olympia Sport- & Kongresszentrum) — kino",
      "Dagstur Innsbruck: Tiroler Landesmuseum, Hofburg, Swarovski Kristallwelten i Wattens (2–3 timer)"
    ],
    runningRoutes: [
      { name: "Drei-Seen-Wanderung", distance_km: 12.9, elevation_m: 350, surface: "grus + skogssti", note: "Wildsee → Wildmoosalm → Wildmoossee → Lottensee → Möserer See (Friedensglocke) → tilbake. Soloppgang ca 05:15, ofte tåke som løfter seg." },
      { name: "Seefelder Spitze fra Rosshütte (utfordring)", distance_km: 10.5, elevation_m: 770, surface: "fjellsti", note: "Rosshütte (1 760 m) → Seefelder Joch (2 060 m) → Seefelder Spitze (2 221 m) → Reither Spitze (2 373 m) → Nördlinger Hütte → ned Härmelekopfbahn. Krever surefootedness." },
      { name: "Wildsee–Finnenbahn easy loop", distance_km: 5, elevation_m: 30, surface: "flat grus", note: "Perfekt restitusjon." }
    ],
    day_plan: {
      title: "Alpedag fredag 26.06",
      schedule: [
        { time: "08:30", what: "Frokost på hotellet" },
        { time: "09:30", what: "Bil 5 min til Bergbahnen Rosshütte dalstasjon. Parkering gratis" },
        { time: "09:45", what: "Funikulær opp til Rosshütte (1 760 m). 8 min. Dagsbillett Härmelekopf ca 32 € voksen, 16 € barn" },
        { time: "10:00", what: "Familien deler seg: Carl + Daniel mot Seefelder Spitze. Miriam + Elias panoramasti til Seefelder Joch" },
        { time: "13:00", what: "Felles lunsj på Rosshütte eller Seefelder Joch-Alm (Käsespätzle, Kaiserschmarrn)" },
        { time: "14:30", what: "Ned med funikulæren" },
        { time: "15:00", what: "15 min kjøring til Mittenwald. Spaser Obermarkt med Lüftlmalerei. Innom Geigenbaumuseum (~8 €, ti–sø 10–17)" },
        { time: "17:00", what: "Tilbake til Seefeld. Bad i Wildsee eller Olympiabad" },
        { time: "19:30", what: "Middag Strandperle (bestill bord) eller Waldgasthaus Triendlsäge" }
      ],
      bad_weather: "Snu og gjør Innsbruck: parker i Altstadt → Goldenes Dachl + Hofburg → Nordkettenbahn fra Congress (5 min fra Goldenes Dachl) til Hafelekar (2 256 m), 47,50 € voksen retur. Lunsj på Seegrube. Hjem via Mittenwald.",
      strong_weather: "Bytt Mittenwald med via ferrata \"Seefelder Panorama\" — Klettersteig B/C ved Härmelekopf-toppstasjonen, ~1,5 t klatretid. Carl + Daniel kan gjøre det, resten venter på Härmelekopf-restauranten. Sport Norz i Seefeld leier ut utstyr."
    },
    practical: {
      charging: "Tesla Supercharger Innsbruck (Bernhard-Höfel-Straße, 6 ladere 125 kW) eller destinasjonsladere ved hotellet/Olympia Sport- & Kongresszentrum.",
      tips: "Seefeld Card gir gratis kabelbane mai–oktober — sjekk om AlpenParks deltar."
    }
  },

  bardolino: {
    name: "Bardolino", country: "Italia", flag: "🇮🇹", lat: 45.5517, lng: 10.7341,
    color: "#c2410c",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bardolino_Porta_San_Giovanni.JPG/330px-Bardolino_Porta_San_Giovanni.JPG",
    summary: "Hovedstopp — 8 netter ved Gardasjøen. \"Villa Venezia\" Airbnb i Via Montavoletta 14, Pozzo-området ca 1,9 km via vei til Piazza Matteotti (4 min bil, 20 min gange). Bil eller sykkel anbefalt for sentrum og strender. Forvent 30–34 °C, vanntemperatur 23–25 °C.",
    nights: 8,
    beaches: [
      { name: "Lido Cisano", address: "Via Peschiera 2/A, Cisano di Bardolino", distance: "3,1 km / 5 min bil via SR450. 8 min på sykkel langs ciclopista", surface: "Gress og småstein, lang grunn sone", family: "Beste valg for Elias — vann grunt 20–30 m ut, lekeplass, store gressflater", price: "Gratis offentlig strand", parking: "Stor parkering bak stranden", facilities: "Bar/pizzeria, toaletter", best_for: "Hele dagen med barn, lange piknik-økter" },
      { name: "Lido Mirabello", address: "Lungolago Cipriani, sør for sentrum", distance: "2,4 km / 5 min bil via vei, 6 min på sykkel", surface: "Småstein + plener", family: "Ja, grunt vann, gressplen for picnic", price: "Gratis offentlig. Solseng + parasoll 15–20 €/dag", parking: "Betalt parkering rett ved (2 €/t)", facilities: "Restaurant, terrasse, dusjer", best_for: "Ettermiddag når sola står lavt — vest-eksponert" },
      { name: "Punta Cornicello", address: "Strada del Cornicello, 1,5 km nord for sentrum", distance: "2,4 km / 4 min bil, 6 min på sykkel", surface: "Småstein og gress, beskyttet odde", family: "Ja, lekeplass, beskyttet bukt", price: "Gratis", parking: "Gratis parkering rett ved", facilities: "Bar/restaurant", best_for: "Lite trengsel, fungerer morgen og kveld" },
      { name: "Bardolino Garda Beach (Passeggiata Rivalunga)", address: "Passeggiata Rivalunga, mellom Bardolino og Garda", distance: "2,5 km / 5 min bil", surface: "Småstein avbrutt av gressplener", family: "Middels — kan være trafikkert", price: "Gratis", parking: "Betalt langs lungolago (2 €/t)", facilities: "Bar, toaletter, dusjer, vannsportsutleie", best_for: "Kort sykkeltur, kombinere bading og spasertur" },
      { name: "Spiaggia La Cavalla", address: "Mellom Bardolino og Garda, like nord for Punta Cornicello", distance: "2,7 km / 5 min bil", surface: "Småstein, klart vann, gradvis dypere", family: "Ja, rolig bukt", price: "Gratis", parking: "Liten betalt parkering rett ved", facilities: "Liten kiosk-bar", best_for: "Minst trengsel av Bardolino-strender" },
      { name: "Baia delle Sirene (Punta San Vigilio)", address: "Località San Vigilio, 37016 Garda VR", distance: "5,3 km / 9 min bil", surface: "Småstein, krystallklart vann, olivenlund", family: "Ja — lekeplass, stelleplass, beskyttet bukt", price: "15–20 €/person inkl. parkering. Gratis etter solnedgang", parking: "Inkludert", facilities: "Restaurant, bar", best_for: "Én dag som \"spesiell strand\"" }
    ],
    restaurants: [
      { name: "La Veranda del Color", address: "Via Santa Cristina 5 (Color Hotel)", type: "Moderne italiensk, fine dining", price: "€€€", must_try: "Smaksmenyen 90–130 €/p uten vin. NB: Color Hotel ligger 850 m fra boligen — nærmeste fine dining-alternativ", kids: "Best uten", booking: "Obligatorisk, 2–4 uker før" },
      { name: "Il Giardino delle Esperidi", address: "Via Mameli 1, sentrum", type: "Sesong, lokalt, innsjøfisk", price: "€€€", must_try: "\"Aqua\"-menyen viet Garda-fisk (sardina, coregone, persico). 45–70 €/p", kids: "Voksenkonsept, tåler det 1 kveld", booking: "Ja, 1–2 uker før" },
      { name: "Al Porto Bardolino", address: "Lungolago Lenotti 1 (havnen)", type: "Sjømat og kjøtt, tradisjonell", price: "€€", must_try: "Risotto med tinca, grillet bavette. 18–28 €/hovedrett", kids: "Ja, barnemeny", booking: "Fredag/lørdag, 3–5 dager før" },
      { name: "Ristorante Aurora", address: "Piazza San Gervaso 13", type: "Klassisk veneto, lakefisk", price: "€€", must_try: "Bigoli con sardine, risotto al Bardolino. 30–40 €/p", kids: "Ja, godt etablert", booking: "Anbefales" },
      { name: "Trattoria Cà Bottona", address: "Via Primo Maggio 18, Costermano (5 km)", type: "Tradisjonell veneto, åsene over", price: "€€", must_try: "Bollito misto, tortellini, lokal kjøttrett. 25–35 €/p", kids: "Ja, hage og rolig stemning", booking: "Helger, 1 uke før" },
      { name: "Pizzeria Bardolino", address: "Via San Martino 24", type: "Vedovn-pizza", price: "€", must_try: "Margherita, diavola. 8–13 €/pizza", kids: "Ja", booking: "Ja — møt opp 17:00 eller bestill, ellers stengt etter 19:30" },
      { name: "Gelateria Cristallo", address: "Piazza Matteotti 59", type: "Gelato", price: "€", must_try: "Pistasj, stracciatella, gianduia. 2,50–4 €/kule", kids: "Ja", booking: "Nei — perfekt etter kveldsspasertur" },
      { name: "Guerrieri Rizzardi (vingård)", address: "Via Verdi 4", type: "Bardolino DOC + Chiaretto, vinhus siden 1670", price: "€€", must_try: "Classic Experience 25 €/p, Heritage 35 €, Amarone Collection 55 €", kids: "Hage og olivenlund OK under omvisning", booking: "Obligatorisk" },
      { name: "Cantina Zeni e Museo del Vino", address: "Via Costabella 9", type: "Vingård med museum, barnehjørne", price: "€€", must_try: "Onsdagsturer juni–august: engelsk 14:30, tysk 16:00, italiensk 17:30", kids: "Ja — barnehjørne med spill og tegnefilmer", booking: "1 uke før" }
    ],
    day_trips: [
      { name: "Verona", drive_min: 45, why: "Arena, Casa di Giulietta, Piazza delle Erbe. Lunsj på Caffè Borsari eller Trattoria al Pompiere (book)", plan: "09:00 Arena (14 €, åpner 09:00) → 11:15 Casa di Giulietta → 12:00 lunsj Piazza Erbe → 14:00 Castelvecchio → 15:00 hjem" },
      { name: "Sirmione", drive_min: 40, why: "Castello Scaligero (8 €), Grotte di Catullo (10 €). Bilfri gamleby, parker P3 eller P5 + shuttle", plan: "Før 09:30 eller etter 17:00 (trangt 11–17). Kombinert billett med Villa Romana i Desenzano 18 €" },
      { name: "Monte Baldo (Malcesine funivia)", drive_min: 47, why: "Funikulær fra 90 → 1 750 moh, roterende kabin med 360°. 27 € voksen t/r, reserver online. 33 km nordover langs SR249 — kjøretid via OSRM ca 47 min", plan: "Topp: Anello della Colma 3,6 km flat (fungerer for Elias) eller Sentiero del Ventrar (2 t, tenåringer). Lunsj på Speck Stube. Genser/jakke obligatorisk." },
      { name: "Gardaland", drive_min: 20, why: "Den ene parken som fungerer for 10/13/14-åring. Online fra 44 € voksen, 39 € redusert. Daglig 28.03–01.11.2026. 11 km sør for boligen", plan: "Hele dagen. Mammut, Raptor, Oblivion for tenåringene. Peppa Pig Land + Jungle Rapids for Elias" },
      { name: "Caneva Aquapark", drive_min: 20, why: "Bra hetebølgedag. Ca 32 € voksen, vannsklier i alle vanskelighetsgrader, bølgebasseng", plan: "Kombinert Movieland + Caneva 2-dags Flex gir best verdi hvis dere drar to dager" },
      { name: "Punta San Vigilio", drive_min: 8, why: "Renessanseodde med Villa Brenzone, Locanda San Vigilio (Michelin), Baia delle Sirene-strand. 3,7 km nord", plan: "Tidlig morgen eller etter 17 — parkering full midt på dagen" },
      { name: "Lazise", drive_min: 10, why: "Murby med Castello Scaligero, Dogana Veneta, tre porter. Marked onsdag 8–13", plan: "1,5 t på kvelden — gelato på piazza" },
      { name: "Garda by", drive_min: 5, why: "Den lille fiskerbyen som ga sjøen sitt navn. Rocca di Garda (283 m) — 40 min opp, beste utsikt over sørbassenget", plan: "Spasertur fra Bardolino via Passeggiata Rivalunga (2 km enveis) — bedre enn å kjøre" }
    ],
    bike_routes: [
      { name: "Bardolino → Garda → Punta San Vigilio", distance_km: 13, elevation_m: 30, surface: "asfalt, dedikert ciclopista", difficulty: "lett", time: "1 t 15 min", family: "Alle, inkl. Elias" },
      { name: "Bardolino → Lazise → Peschiera", distance_km: 32, elevation_m: 50, surface: "asfalt", difficulty: "lett", time: "2 t 30 min hver vei", family: "Hele familien. Tips: ta toget tilbake fra Peschiera" },
      { name: "Bardolino → Torri del Benaco", distance_km: 38, elevation_m: 250, surface: "asfalt, kombinasjon ciclopista og SR249", difficulty: "middels", time: "3 t", family: "Tenåringene + voksne" },
      { name: "MTB San Zeno di Montagna", distance_km: 35, elevation_m: 900, surface: "asfalt + grus", difficulty: "krevende", time: "2,5–3 t", family: "Carl alene" }
    ],
    bike_rental: [
      "Velolake — Via Marconi, Bardolino. E-bike, MTB, road, kids",
      "Garda Bike Land — hjemkjøring til Via Montavoletta 14",
      "GL Bike Rental — gratis levering i Bardolino",
      "E-bike 30–40 €/dag, 150–180 €/uke. Barnesykkel 12–18 €/dag"
    ],
    runningRoutes: [
      { name: "Lungolago E — Bardolino til Garda, retur", distance_km: 10, elevation_m: 25, surface: "asfalt og heller", note: "Start Via Mirabello / Lungolago Cipriani. Beste tid 06:00–08:00 eller 19:30–21:00." },
      { name: "Lungo E lang — Bardolino–Peschiera t/r", distance_km: 32, elevation_m: 80, surface: "asfalt + ciclopista", note: "Drikkefontene i Lazise og Peschiera. Start 06:00, hjem før 10." },
      { name: "Tempoøkt — Pista Lazise–Bardolino (T/I/R)", distance_km: 8, elevation_m: 10, surface: "asfalt", note: "Start Camping Du Parc, Via Gardesana 110. Helt rett, ingen kryss. Perfekt for 5×1000, 10×400, milepass. 06:30 — minimal trafikk." },
      { name: "Backeøkt Monte Luppia–Marciaga", distance_km: 21, elevation_m: 600, surface: "asfalt, lite trafikkerte fjellveier", note: "Via Madonnina → Cavaion → Sega di Cavaion → Marciaga → Monte Luppia (413 m) → retur via Albare. God skygge i olivenlundene." },
      { name: "Langtur Bardolino–San Zeno di Montagna", distance_km: 28, elevation_m: 950, surface: "asfalt", note: "Klassisk maratontren-langtur. Start 05:30. To flaskeholdere. Drikkefontener i Costermano og San Zeno." }
    ],
    kids: [
      "SUP Garda — 15 €/t, 35 €/dag. Kayak dobbel 20 €/t. Skole fra 13 år alene, yngre med voksen",
      "Surf Point La Rocca (Camping La Rocca) — windsurf, SUP, kayak",
      "Bardolino Water Sports (Passeggiata Rivalunga) — bananbåt, towables, vannski",
      "Tretboot/elektrobåt fra Garda havn — 30–50 €/t, hele familien",
      "Parco Avventura Busatte (Nago-Torbole, 1 t) — klatreparker, 22–25 €/p",
      "Parco Natura Viva (Bussolengo, 20 min) — safaripark, 24 € voksen, 19 € barn",
      "Minigolf Cisano — 8 €/spiller",
      "Aquardens Pescantina (40 min) — termalbad, 33–68 € voksen. Hetebølge eller regnvær"
    ],
    rainy: [
      "Aquardens Pescantina — termalbad, 40 min kjøretid",
      "Museo del Vino Zeni — Via Costabella 9. Gratis. \"Olfactory Gallery\"",
      "Verona — Arena, Castelvecchio, Casa di Giulietta-museum. Lunsj på Piazza Erbe-arkadene"
    ],
    practical: {
      charging: "Tesla Supercharger Affi (Via San Pieretto 27, 24 plasser, 250 kW). 9 km / 13 min med bil fra Via Montavoletta via SR450. Topp opp 20→80% på 25 min mens dere handler på Conad Superstore Affi (rett ved).",
      market: "Torsdag 08–13 hovedmarked (Lungolago Preite / Piazza del Porto). Lørdag 08–13 Piazza del Combattente. Tirsdag 08–13 marked i Cisano. Friskt grønt, frukt, lokale oster og lokale smørbrød.",
      supermarket: "Nærmeste: Eurospar Via Santa Cristina 3 (2,1 km / 4 min bil fra Via Montavoletta) — daglig handel. Conad Superstore Affi (Via dell'Industria, 8,5 km / 12 min) — best for storhandel ved innflytting og ved Tesla-lading. Lokale alimentari finnes i Pozzo-området for grunnleggende ting.",
      pharmacy: "Farmacia alla Madonna (Via Croce 35, 045 7210007). Farmacia Sant'Anna (Via Verona 63, Calmasino, 045 7236063). Vakt: farmaciediturno.org/comune.asp?cod=23006"
    },
    booking_priority: [
      "La Veranda del Color (2–4 uker før)",
      "Monte Baldo funivia",
      "Il Giardino delle Esperidi (1–2 uker)",
      "Guerrieri Rizzardi / Zeni vinomvisning",
      "Pizzeria Bardolino",
      "Al Porto Bardolino fredag/lørdag",
      "Cà Bottona helg",
      "Locanda San Vigilio (Punta San Vigilio) hvis aktuelt"
    ]
  },

  grado: {
    name: "Grado", country: "Italia", flag: "🇮🇹", lat: 45.6826, lng: 13.3788,
    color: "#c2410c",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Aerial_image_of_Grado_%28view_from_the_west%29.jpg/330px-Aerial_image_of_Grado_%28view_from_the_west%29.jpg",
    summary: "4 netter ved Adriaterhavet. Airbnb Riva Brioni 27 vest i Grado gamlebyen — bare 300 m gange til Costa Azzurra (lokalfavoritt) og 2,3 km til Spiaggia Principale (GIT-hovedstrand). Sandstrand, slak bunn, vann 24–26 °C. Despar-supermarkedet ligger 700 m sør-øst — bra for å lage egen mat.",
    nights: 4,
    beaches: [
      { name: "Costa Azzurra (\"spiaggia vecchia\")", address: "Lungomare Nazario Sauro, vestenden av Diga", distance: "300 m / 4 min å gå fra Riva Brioni 27 — NÆRMESTE STRAND", surface: "Sand, vestligste strand på øya, åpne sandflater + furutrær", family: "Lokal favoritt — SUP-/windsurfskole, skatepark, beachvolley, lekeparker", price: "Adgang gratis. Konsesjonsfelt med leie", facilities: "Bar, dusjer, lekeparker både på sand og under furutrærne", best_for: "Hverdagsbading rett ned fra leiligheten — gå hvert morgen og kveld" },
      { name: "Spiaggia Principale (GIT-hovedstrand)", address: "Lungomare Adriatico, sør for byen", distance: "2,3 km / 6 min bil, 7 min sykkel langs Lungomare", surface: "Pent rakket sand, slak bunn, livredder, babysoner", family: "Mest familievennlig pakkeløsning", price: "Dagspass parasoll + 2 solsenger 22–30 €/dag. Gratisstrand i ytterkantene", facilities: "Solseng, dusj, leke, animasjon", best_for: "Halvdags-/heldagsturer med vannparkanlegg og servering" },
      { name: "Spiaggia al Bosco", address: "Mellom GIT og Pineta", distance: "ca 3 km / 10 min sykkel østover", surface: "Sand, omkranset av furuskog", family: "Roligere alternativ", price: "Mest gratis", facilities: "Begrenset servering", best_for: "Stille dag uten parasolltrengsel" },
      { name: "Grado Pineta", address: "Östre del av øya", distance: "3,5 km / 8 min bil, 12 min sykkel", surface: "Sand, pinjelund", family: "Roligst, flest barnefamilier på lengre opphold", price: "Konsesjonert m/dagspass, men gratiskorridorer mellom", facilities: "Bar, restauranter, leke", best_for: "Én dag for variasjon" }
    ],
    restaurants: [
      { name: "Tavernetta all'Androna", address: "Calle Porta Piccola 6 (+39 0431 80950)", type: "Sjømat moderne, Michelin-anbefalt", price: "€€€", must_try: "À la carte 60–90 €/p uten vin. Hovedretter 28–42 €", kids: "Voksen", booking: "Lukket tir/ons/tor lunsj" },
      { name: "Trattoria de Toni", address: "Piazza Duca d'Aosta 37 (+39 0431 80104)", type: "Familiedrevet siden 1960, mest \"autentisk gradese\"", price: "€€–€€€", must_try: "Boreto alla gradese med polenta. Spaghetti alle vongole, sarde in saor", kids: "Ja", booking: "Reserver" },
      { name: "Ristorante Alla Pace", address: "Calle del Porto 6 (+39 0431 80104)", type: "Mindre kjent, jordnær, lokal trafikk", price: "€€", must_try: "Spaghetti alle vongole rost høyt. 35–55 €/p", kids: "Ja", booking: "Reserver — få bord" },
      { name: "Zero Miglia", address: "Riva Slataper (ved fiskeauksjonen)", type: "\"0 km\" — sjømat fra båtene ved siden av", price: "€€", must_try: "Frittura mista, tartare av tonn, crudo. 40–60 €/p", kids: "Ja", booking: "Anbefales — kveldslys ved havna" },
      { name: "Trattoria alla Buona Vite", address: "Via Marina (Punta del Groto)", type: "Klassisk trattoria di mare ved vannet", price: "€€", must_try: "Pasta med scampi, fritto misto, grillet sjøtunge. 35–55 €/p", kids: "Ja", booking: "Anbefales" },
      { name: "L'Approdo", address: "Riva Sant'Andrea 17 (+39 0431 80157)", type: "Utsikt mot lagunen, rustico-elegant", price: "€€", must_try: "Boreto, gnocchi med skalldyr. 45–70 €/p. Be om bord ute", kids: "Ja", booking: "Anbefales" },
      { name: "Osteria Alle Spiagge", address: "Viale Italia (mot stranden)", type: "Hverdagsmiddag rett fra stranden", price: "€€", must_try: "Pizza, primi, grillet fisk. 25–40 €/p", kids: "Ja", booking: "Sjelden nødvendig" },
      { name: "Mar e Vin", address: "Campo Patriarca Elia 1", type: "Nyere, ungt kjøkken", price: "€€", must_try: "Krudo, tagliata av tonn, lokal vinmeny (Friulano, Vitovska, Malvasia). 50–70 €/p", kids: "Ja", booking: "Anbefales" }
    ],
    must_try_dishes: "Boreto alla gradese (hvit fiskesuppe med polenta — definerende retten). Sardoni in savor (marinerte ansjos). Frittura mista di paranza. Spaghetti alle vongole verace.",
    day_trips: [
      { name: "Aquileia (UNESCO)", drive_min: 15, why: "Basilika med Europas største tidligkristne gulvmosaikker (760 m², 300-tallet). Romersk by, hovedstad i regionen", plan: "Basilika + krypter 5–8 €. Museum 7–10 €. FVG Card gir gratis adgang. Fokusert besøk 3–4 t, full 5 t. Best om morgenen før heten" },
      { name: "Trieste", drive_min: 60, why: "Østerriksk-italiensk smelteby. Piazza Unità d'Italia — Europas største sjøvendte plass. Caffè San Marco, Joyce-spor. 55 km via vei", plan: "Parker Park San Giusto (under San Giusto-høyden, heis) eller Foro Ulpiano. 2–3 €/t. Unngå ZTL nær Piazza Unità" },
      { name: "Castello di Miramare", drive_min: 55, why: "Slott på odde i havet (1856–60). Parkanlegget er stort og åpent — bra for barn", plan: "12 € slott, park gratis. 2 t er nok. Kom tidlig — fult etter 11. Alternativt parker Grignano-bukten og gå" },
      { name: "Lignano Sabbiadoro", drive_min: 80, why: "Klassisk italiensk badeby. 8 km sandstrand. Aquasplash (40 000 m², 26–30 € voksen, 22 € barn). Mer kommersielt enn Grado. 74 km via vei — må rundt lagunen", plan: "Halv dag minimum. Vurder om reisetid er verdt det når Grado-strendene allerede er gode" },
      { name: "Slovenia — Piran/Portorož", drive_min: 105, why: "Adriaterhavets perle, venetiansk arkitektur. Tartini-plassen, Sv. Jurij-kirken", plan: "1:45 hver vei — overveies bare hvis flere dager. Schengen, pass ok å ha. Park Fornace/Arze + gratis shuttle" }
    ],
    bike_routes: [
      { name: "Aquileia og tilbake", distance_km: 24, elevation_m: 10, surface: "asfalt, dedikert sti", difficulty: "lett", time: "4–5 t med pauser", family: "Familievennlig høydepunkt nr. 1. Fra Grado over Ponte Girevole og 4–5 km lang lagunedam med fugleliv, til basilikaen" },
      { name: "Arkeologisk rundtur Grado–Aquileia–Belvedere", distance_km: 36, elevation_m: 15, surface: "asfalt", difficulty: "lett+", time: "5 t", family: "Carl + Anne alene mens barna er på stranden. Belvedere har piknikpunkt + Ai Pioppi" },
      { name: "Båt-sykkel-kombinasjon Aquileia P017", distance_km: 12, elevation_m: 5, surface: "asfalt", difficulty: "lett", time: "halv dag", family: "Sykle nord til Aquileia, ta linjebåten fra Belvedere brygge tilbake (tar sykler). Sjekk avgangstider hos turistkontoret" },
      { name: "Pineta-runden", distance_km: 12, elevation_m: 15, surface: "asfalt + skogsti", difficulty: "lett", time: "1,5 t", family: "Østover gjennom pinjelunden mot Primero. Korte avstander, mange iskremstopp. Bra første dag" }
    ],
    bike_rental: [
      "Mauro Bike — Riva Sant'Andrea (nær havnen). Citybike 10–13 €/dag, e-bike 20–30 €/dag",
      "Speedy-Bike — Viale Italia",
      "GIT Bike — flere utleieboder langs strandpromenaden sommer",
      "For familien: e-sykkel Carl + Anne, vanlig for de eldste, e-sykkel for Elias. Ca 100–130 €/dag totalt"
    ],
    runningRoutes: [
      { name: "Lungomare \"La Diga\" + Pineta", distance_km: 10, elevation_m: 5, surface: "asfalt + tregolv", note: "Start Riva Brioni. Vest langs Diga til Costa Azzurra (1,8 km enveis). Snu, tilbake, fortsett øst inn i pinjelunden mot Spiaggia al Bosco. Havutsikt hele veien." },
      { name: "Grado–Aquileia tur/retur via lagunedammen", distance_km: 24, elevation_m: 10, surface: "asfalt", note: "Nord over Ponte Girevole, gjennom lagunen på 4 km kausevei. Helt flatt, åpent landskap, lite skygge. Snu ved basilikaen. Lang rolig økt." },
      { name: "Belvedere-loop", distance_km: 16, elevation_m: 10, surface: "asfalt + grus siste 2 km", note: "Som Aquileia-rute, men sving av etter dammen mot Belvedere. Litt mindre trafikk om morgenen." },
      { name: "Pineta–Primero-ringer", distance_km: 8, elevation_m: 15, surface: "asfalt + skogsti", note: "Kortere, kjøles av skygge i pinjelunden, kortere intervaller ved \"Boschetto\"." }
    ],
    kids: [
      "Båttur til Barbana — øy i lagunen med Mariakirke. 30 min sjøvei. 10 €/voksen, 5 €/barn 3–10. Avgang fra havnen Riva Sant'Andrea",
      "Lagunetur med casoni-besøk — 3–4 timer, polenta + sardoni-måltid. 35–45 €/voksen",
      "Parco Acquatico (Grado Waterpark) — Pineta, Viale del Sole. Juni–september. 18–22 € voksen, 14–16 € barn",
      "Snorkel ved Costa Azzurra — flatt, klart, nok for Elias",
      "Skatepark / SUP-/windsurfskole Costa Azzurra — Daniel/Miriam",
      "Fisketur med lokal båt (charter ved havnen) — halvdag 200–300 €",
      "Riserva naturale Valle Cavanata — våtmarksreservat øst for Grado, fugletitting"
    ],
    rainy: [
      "Aquileia basilika med mosaikker — innendørs, 3–4 timer",
      "Trieste museer + kaféer — Caffè San Marco klassisk",
      "Aquasplash innendørs deler / overbygde områder"
    ],
    practical: {
      charging: "Tesla Supercharger Latisana (30 km) eller Villesse (35 km, A4-avkjøring). Destination/AC i Grado: Enel X (Be Charge) Riva Giovanni da Verrazzano 22 kW. Strategi: fyll opp i Villesse på vei inn, AC-lading lokalt for topp-ups.",
      market: "Lørdag 08–13 ukentlig marked (Campo Porta Piccola / Piazza Carpaccio). Fiskemarked Mercato Ittico man–fre 08:30–12:00 (Riva Sant'Andrea). Mercato Coperto på Via De Amicis (700 m) har daglig friskt grønt, fisk og kjøtt — bra for å handle inn til middag.",
      supermarket: "Hovedhandel: Despar Viale Europa Unita 35c (700 m / 8 min gange / 3 min bil fra Riva Brioni). Annet alternativ: Despar Viale Kennedy 28 (Città Giardino, 2 km). For lokal handel: små alimentari i gamlebyen rundt Via Garibaldi. Lidl Aquileia (12 km nord) ved dagstur dit.",
      pharmacy: "Farmacia Comunale, Piazza Biagio Marin. Farmacia alla Salute, Viale Italia.",
      parking: "Riva Brioni er parkometer-sone (Pay & Display). 1,50 €/t, 08–20, gratis natt. Dagspass ~8 €. Spør Airbnb-vert om garasje/abbonamento residenti.",
      ztl: "ZTL i gamlebyen sommertid. Riva Brioni er utenfor ZTL, men man kan ikke kjøre inn i gågatesonen."
    },
    booking_priority: [
      "Tavernetta all'Androna",
      "Trattoria de Toni",
      "L'Approdo (utebord)",
      "Casoni-tur med lagune",
      "Bicycle rental (Mauro Bike)"
    ]
  },

  hof: {
    name: "Hof", country: "Tyskland", flag: "🇩🇪", lat: 50.3206, lng: 11.9043,
    color: "#525252",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Hof%2C_HO_-_Theresienstein_-_Pavillon_-_Innenstadt_v_N_02.jpg/330px-Hof%2C_HO_-_Theresienstein_-_Pavillon_-_Innenstadt_v_N_02.jpg",
    summary: "Transittstopp etter \"kjøredag maximus\" (780 km). Hotel Central Hof ved Freiheitshalle, 10 min fra gamlebyen.",
    nights: 1,
    attractions: [
      { name: "Bürgerpark Theresienstein", why: "70 ha, kåret til Tysklands vakreste park i 2003. Botanisk hage, kleintierzoo.", distance: "1,5 km fra hotellet", kids: "Ja" },
      { name: "Marienkirche + Altes Rathaus", why: "Gotisk kirke, hovedlandemerke. Sammen med Sonnenplatz og Schlossplatz.", distance: "10 min gange", kids: "Ja" },
      { name: "Wärschtlamo", why: "Sausemann med kobberkjele som har solgt Hofer Wärscht siden 1871 — lokal kuriositet.", distance: "I Altstadt", kids: "Ja" }
    ],
    restaurants: [
      { name: "Kastaniengarten (hotellets restaurant)", address: "Kulmbacher Str. 4", type: "Sesong-tysk", price: "€€", must_try: "Ukentlig meny. Åpent man–lør fra 17:00, søn fra 18:00, kjøkken til 21:00", kids: "Ja", booking: "Praktisk hvis utslitt" },
      { name: "Altdeutsche Bierstube", address: "Marienstr. 88 (10–12 min gange)", type: "Tradisjonell frankisk-bayersk", price: "€€", must_try: "Schnitzel, Schweinebraten, lokale pølser, dark beer. 14–22 €/hovedrett", kids: "Ja", booking: "Anbefales" }
    ],
    runningRoutes: [
      { name: "Theresienstein-runden", distance_km: 10, elevation_m: 120, surface: "blandet asfalt/grus/sti", note: "Hotel Central → Kulmbacher Str nord → Maxplatz → Bürgerpark sørinngang → hovedakser → sløyfe rundt botanisk hage + kleintierzoo → ned til Saale → sør langs elven tilbake." },
      { name: "Saale-promenaden (restitusjon)", distance_km: 10, elevation_m: 30, surface: "asfalt", note: "Sør langs elven, snu etter 5 km. Lett før kjøredag 2." }
    ],
    evening: "Kort runde: Kulmbacher Str → Sonnenplatz → Ludwigstraße → Marienkirche → Altes Rathaus → Schlossplatz. Stopp ved Wärschtlamo. 45 min.",
    practical: { charging: "IONITY/Aral Pulse i Hof-området, eller hotellet kan ha destination charging — sjekk." }
  },

  hamburg: {
    name: "Hamburg", country: "Tyskland", flag: "🇩🇪", lat: 53.5511, lng: 9.9937,
    color: "#525252",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hamburg%2C_Landungsbr%C3%BCcken_--_2016_--_3131-7.jpg/330px-Hamburg%2C_Landungsbr%C3%BCcken_--_2016_--_3131-7.jpg",
    summary: "Én natt på vei hjem. Hotell ikke booket ennå — tre forslag under. Plan: Miniatur Wunderland kveld, Speicherstadt morgen.",
    nights: 1,
    hotels: [
      { name: "PIERDREI Hotel HafenCity", address: "Am Sandtorkai 50", price_eur: "250–380", parking: "28 €/døgn", note: "Boutiquehotel, familievennlig (lekekrok, miniatyrhus i familierom). 5 min til Miniatur Wunderland. Førstevalg." },
      { name: "AMERON Hamburg Speicherstadt", address: "Am Sandtorkai 4", price_eur: "280–400", parking: "28 €/døgn (ContiPark)", note: "Historisk speicherstadt-pakkhus. Klassisk hanseatisk." },
      { name: "Adina Apartment Speicherstadt", address: "Willy-Brandt-Straße 21", price_eur: "220–350", parking: "40 €/døgn", note: "Aparthotel — egen kjøkkenkrok, mer plass. Best hvis dere vil ha rom for hvile." }
    ],
    attractions: [
      { name: "Miniatur Wunderland", why: "Verdens største modelljernbane (~16 000 m skinner, 1 100 tog, 290 000 figurer). Voksen ~25 €, barn 6–15 ~15 €, under 6 gratis. Fre 10. juli åpent 09–19. Bestill tidsslot — utsolgt ofte.", distance: "Kehrwieder 2, 5 min fra hotellene", kids: "Ja, alle aldre" },
      { name: "Elbphilharmonie Plaza (gratis utsiktsplattform 37 m)", why: "Daglig 10–24. Solnedgang i juli ca 21:45. Gratisbillett ved billettsenter eller 3 € online.", distance: "Platz der Deutschen Einheit", kids: "Ja" },
      { name: "Speicherstadt (UNESCO)", why: "Verdens største sammenhengende tegl-lagerbygninger på trepåler. Fotostopp: Poggenmühlenbrücke.", distance: "Direkte ved hotell", kids: "Ja, gå-rute" },
      { name: "Hafenrundfahrt med HADAG-fergen linje 62", why: "Lokalbefolkningens ferge fra Landungsbrücken til Finkenwerder og tilbake — 1 t, panorama av containerhavn, Elbphilharmonie, dokkene.", distance: "HVV-billett 10 €/dagspass familie", kids: "Ja" },
      { name: "Beatles-Platz (på dagtid)", why: "Hjørnet Reeperbahn/Große Freiheit — koblet til Beatles' 1960-residens. OK med barn på dagtid.", distance: "Sankt Pauli", kids: "OK dag" }
    ],
    restaurants: [
      { name: "Brücke 10", address: "Landungsbrücken, Brücke 10", type: "Klassisk fiskebod på vannet", price: "€", must_try: "Fischbrötchen (matjes, bismarck, krabbe), labskaus, pannfisch. 8–18 €/rett", kids: "Ja, kort ventetid", booking: "Nei, bestill ved disken" },
      { name: "Hafenwirtschaft Hamburg", address: "Brücke 9, Landungsbrücken", type: "Sittedown fiskerestaurant på pontongen", price: "€€", must_try: "Fiskesuppe, sjøtunge, pannfisch, scholle finkenwerder art. 22–34 €/hovedrett", kids: "Ja", booking: "Anbefales" },
      { name: "Carlo & Sons (italiensk-backup)", address: "HafenCity, Sandtorkai", type: "Italiensk", price: "€€", must_try: "Pizza/pasta hvis barna er trøtte", kids: "Ja", booking: "Sjelden nødvendig" }
    ],
    runningRoutes: [
      { name: "Alster-runden (klassiker)", distance_km: 12, elevation_m: 10, surface: "asfalt + fin grus", note: "Med innløp fra HafenCity. Rundt Außenalster — 500 m-markeringer i stein hele veien. Mye løpere tidlig morgen." },
      { name: "Speicherstadt + Elbpromenade", distance_km: 10, elevation_m: 15, surface: "asfalt", note: "Sandtorkai → Speicherstadt langs Kehrwiederfleet → Landungsbrücken → Elbpromenade vest → snu Fischmarkt → tilbake → Magellan-Terrassen → Sandtorkai. Havnen er tom tidlig morgen — bare lastebåter og måker." },
      { name: "Elbpromenade til Övelgönne", distance_km: 14, elevation_m: 10, surface: "asfalt", note: "Vest langs Elben til sandstrand med gamle skip, retur." }
    ],
    evening_plan: "Check-in 16:30 → Miniatur Wunderland 17:00–19:00 (siste inngang fre 18:00) → middag 19:30 (Brücke 10 eller Hafenwirtschaft) → Elbphilharmonie Plaza 21:30 for solnedgang/blå time.",
    morning_plan: "09:00 frokost → 10:00 Speicherstadt-vandring rundt Kehrwiederfleet, Wandrahmsfleet, fotostopp Poggenmühlenbrücke → 10:45 Elbphilharmonie Plaza i dagslys → 11:30 check ut → Kiel (1 t).",
    avoid: "Reeperbahn med barna — alkohol, prostitusjon, skilt om forbudt under 18 på Davidstraße.",
    practical: {
      charging: "Tesla Supercharger HafenCity (Versmannstraße 30, Westfield Überseequartier, 1,5 km) eller Hamburg Stresemannstraße (4 km). AC-ladere i Westfield-garasjen og ved hotellene (CCS)."
    }
  },

  trondheim: {
    name: "Trondheim", country: "Norge", flag: "🇳🇴", lat: 63.4305, lng: 10.3951,
    color: "#1e40af",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Trondheim_overview_01.jpg/330px-Trondheim_overview_01.jpg",
    summary: "Hjem.",
    nights: 0,
    attractions: [],
    runningRoutes: []
  }
};

// Ladeplan per etappe
const CHARGING = {
  "trondheim-oslo": {
    from: "Trondheim", to: "Oslo", km: 500, drive_h: 6.5, charge_min: 25,
    route: "E6 sør til Berkåk → Fv30 sør gjennom Kvikne → Tynset → Rv3 sør gjennom Alvdal, Koppang, Rena → Elverum → E6 sør til Oslo. Raskeste vei.",
    stops: [
      { name: "Elverum West Supercharger", type: "Tesla SC", kw: 250, stalls: 28, lat: 60.8862, lng: 11.5536, arrive_soc: 15, depart_soc: 70, minutes: 25, food: "Torolf Storsveens veg 26 — Burger King, Esso, Circle K rett ved. God lunsjstopp.", backup: "Elverum Thon Partner Elgstua (Trondheimsvegen 9, 8 ladere 150 kW, sentrum) eller Hamar SC (60 km videre sør)" }
    ],
    notes: "Ett langt stopp i Elverum etter ~340 km kjøring. Tesla-rekkevidde rekker ikke direkte fra Trondheim. Hvis stor kø i Elverum, fortsett til Hamar."
  },
  "kiel-berlin": {
    from: "Kiel", to: "Berlin Charlottenburg", km: 350, drive_h: 3.5, charge_min: 12,
    route: "A215 → A7 sør → A24 mot Berlin → A111 → Charlottenburg. Start 80 % etter ferge.",
    stops: [
      { name: "Wittenburg Supercharger", type: "Tesla SC", kw: 250, stalls: 16, arrive_soc: 60, depart_soc: 80, minutes: 12, food: "Autohof Wittenburg — varm mat, dusj, lekeplass", backup: "Hamburg-Stillhorn (rett før Hamburg, 20 ladere)" }
    ],
    notes: "Alternativ ett-stopp: Herzsprung Supercharger midtveis (40→65 %, 14 min) hvis piggvåkne."
  },
  "berlin-dresden": {
    from: "Berlin", to: "Dresden", km: 200, drive_h: 2.25, charge_min: 0,
    route: "A113 → A13 sør.",
    stops: [],
    notes: "Ingen lading nødvendig — ankomst Dresden ca 50 %. Hvis pause: Schwarzheide-Mitte (A13, Marken-Outlets, 10 min)."
  },
  "dresden-seefeld": {
    from: "Dresden", to: "Seefeld", km: 600, drive_h: 6.5, charge_min: 50,
    route: "A17 → A93 → A9 sør forbi Hof, Bayreuth, Nürnberg → A9 mot München → A95 → B2 Garmisch → Mittenwald → Seefeld.",
    stops: [
      { name: "Bayreuth Nord (bk World)", type: "Tesla SC", kw: 250, stalls: 20, arrive_soc: 24, depart_soc: 70, minutes: 25, food: "Tesla Lounge, kafé, lekerom, rene toaletter — et av Europas beste ladeanlegg for familier", backup: "Münchberg Nord (50 km nord)" },
      { name: "München OEZ", type: "Tesla SC", kw: 250, stalls: 12, arrive_soc: 20, depart_soc: 65, minutes: 25, food: "Olympia-Einkaufszentrum (OEZ) — mange spisesteder, supermarked", backup: "München Möbel Höffner eller Greding (70 km tidligere)" }
    ],
    notes: "Innsbruck Supercharger (Bernhard-Höfel-Straße, 6 ladere 125 kW) som nødalternativ hvis lave før Mittenwald-stigningen."
  },
  "seefeld-bardolino": {
    from: "Seefeld", to: "Bardolino", km: 270, drive_h: 3.5, charge_min: 12,
    route: "B177 → A13 Brennerautobahn sør — Innsbruck — Brennerpass — Sterzing — Bolzano — A22 — Affi.",
    stops: [
      { name: "Bolzano Supercharger", type: "Tesla SC", kw: 250, stalls: 12, arrive_soc: 55, depart_soc: 75, minutes: 12, food: "Twenty Shopping Center — gelato, toaletter, klimaanlegg", backup: "Trento Supercharger (80 km sør, 150 kW) eller Affi (ved avkjøringen)" }
    ],
    notes: "Bratt nedoverkjøring Brenner (1 370 m) → Bolzano (260 m) gir kraftig regenerering — kun 12–15 kWh forbruk på de 80 km."
  },
  "bardolino-grado": {
    from: "Bardolino", to: "Grado", km: 270, drive_h: 3, charge_min: 0,
    route: "SR450 → A4 øst forbi Verona, Vicenza, Padova, Mestre → A23 nord til Palmanova → SR352 → Grado.",
    stops: [],
    notes: "Direkte — ankomst Grado ca 35 %. Hvis lunsj: Tesla SC Venezia-Mestre midtveis."
  },
  "grado-hof": {
    from: "Grado", to: "Hof", km: 780, drive_h: 9, charge_min: 79,
    route: "SR352 → A4 vest → A23 nord → Tarvisio → Villach → A2 Tauernautobahn → A10 → A1 Salzburg → Linz → Passau → A3 → A93 → Hof.",
    stops: [
      { name: "Villach-Ost", type: "Tesla SC", kw: 250, stalls: 6, arrive_soc: 30, depart_soc: 70, minutes: 22, food: "OMV-stasjon eller Atrio shoppingsenter (2 km) for lunsj", backup: "Villach Maria-Gailer-Straße (8 ladere 150 kW)" },
      { name: "Salzburg Nord", type: "Tesla SC", kw: 250, stalls: 10, arrive_soc: 25, depart_soc: 65, minutes: 22, food: "Europark Salzburg — storkjøkken, supermarked", backup: "Salzburg Anif (12 ladere 150 kW, 8 km sør)" },
      { name: "Amstetten", type: "Tesla SC", kw: 250, stalls: 12, arrive_soc: 25, depart_soc: 70, minutes: 22, food: "McDonalds + Burger King + bensinstasjon", backup: "St. Pölten (60 km videre)" },
      { name: "Aicha vorm Wald (eller Deggendorf)", type: "Tesla SC", kw: 250, stalls: 8, arrive_soc: 35, depart_soc: 60, minutes: 13, food: "Pissestopp", backup: "Deggendorf SC 25 km lenger" }
    ],
    notes: "KRITISK ETAPPE. 9 t kjøring + 1:19 lading = 10:19. Vurder å splitte i to dager med natt i Salzburg eller Linz."
  },
  "hof-hamburg": {
    from: "Hof", to: "Hamburg", km: 500, drive_h: 5, charge_min: 33,
    route: "A9 nord → A38 → A7 nord mot Hannover → A7 videre til Hamburg.",
    stops: [
      { name: "Hörselberg-Hainich", type: "Tesla SC", kw: 250, stalls: 12, arrive_soc: 35, depart_soc: 65, minutes: 15, food: "Autohof med restaurant", backup: "Eisenach SC" },
      { name: "Hannover-Laatzen", type: "Tesla SC", kw: 250, stalls: 20, arrive_soc: 25, depart_soc: 60, minutes: 18, food: "Real-supermarked, McDonalds", backup: "Nörten-Hardenberg (80 km tidligere)" }
    ],
    notes: ""
  },
  "oslo-trondheim": {
    from: "Oslo", to: "Trondheim", km: 500, drive_h: 6.5, charge_min: 25,
    route: "E6 nord til Elverum → Rv3 nord gjennom Rena, Koppang, Alvdal → Tynset → Fv30 nord via Kvikne → Berkåk → E6 nord til Trondheim. Rv3-ruten, raskeste vei.",
    stops: [
      { name: "Elverum West Supercharger", type: "Tesla SC", kw: 250, stalls: 28, lat: 60.8862, lng: 11.5536, arrive_soc: 55, depart_soc: 90, minutes: 25, food: "Torolf Storsveens veg 26 — Burger King, Esso, Circle K. Bra lunsjstopp.", backup: "Elverum Thon Partner Elgstua (sentrum, 150 kW)" }
    ],
    notes: "Ett langt stopp i Elverum etter ~160 km. Lade til 90% siden det er 340 km Tynset/Kvikne/Berkåk/Trondheim videre uten flere SCer på ruten. Hvis du vil ha kortere ladestopp: legg inn ekstra stopp på Hamar/Lillehammer på vei sør i stedet."
  }
};

// Etapper for kartet — hver leg har endepunkter brukt av OSRM. Fallback-polyline ved nede-API.
const LEGS = [
  { id: "trondheim-oslo-1", from: [63.4305, 10.3951], to: [59.913, 10.752], via: [[62.832, 9.985], [62.276, 10.778], [60.886, 11.554]], label: "Trondheim → Oslo (Rv3 via Berkåk/Tynset/Elverum)" },
  { id: "oslo-kiel-ferge", from: [59.911, 10.685], to: [54.323, 10.122], via: [], label: "Color Line ferge", ferry: true },
  { id: "kiel-berlin", from: [54.323, 10.122], to: [52.5076, 13.3198], via: [[53.519, 11.060]], label: "Kiel → Berlin" },
  { id: "berlin-dresden", from: [52.5076, 13.3198], to: [51.0504, 13.7373], via: [], label: "Berlin → Dresden" },
  { id: "dresden-seefeld", from: [51.0504, 13.7373], to: [47.3263, 11.1850], via: [[49.948, 11.578], [48.146, 11.546]], label: "Dresden → Seefeld" },
  { id: "seefeld-bardolino", from: [47.3263, 11.1850], to: [45.5530, 10.7223], via: [[46.498, 11.354]], label: "Seefeld → Bardolino" },
  { id: "bardolino-grado", from: [45.5530, 10.7223], to: [45.6781, 13.3961], via: [[45.437, 11.541], [45.658, 12.243]], label: "Bardolino → Grado" },
  { id: "grado-hof", from: [45.6781, 13.3961], to: [50.3119, 11.9097], via: [[46.621, 13.846], [47.808, 13.055], [48.121, 12.581]], label: "Grado → Hof" },
  { id: "hof-hamburg", from: [50.3119, 11.9097], to: [53.5413, 9.9999], via: [[51.337, 12.379], [52.375, 9.732]], label: "Hof → Hamburg" },
  { id: "hamburg-kiel", from: [53.5413, 9.9999], to: [54.323, 10.122], via: [], label: "Hamburg → Kiel" },
  { id: "kiel-oslo-ferge", from: [54.323, 10.122], to: [59.911, 10.685], via: [], label: "Color Line ferge", ferry: true },
  { id: "oslo-trondheim", from: [59.913, 10.752], to: [63.4305, 10.3951], via: [[60.886, 11.554], [62.276, 10.778], [62.832, 9.985]], label: "Oslo → Trondheim (Rv3 via Elverum/Tynset/Berkåk)" }
];

// Fallback rute (rette streker + Østerdalen-vias) hvis OSRM nede
const ROUTE_COORDS = LEGS.flatMap(l => [l.from, ...l.via, l.to]);

// Pin-koordinater for by-kart per destinasjon
const CITY_POIS = {
  oslo: [
    { type: "lodging", name: "Familien Grelland (utreise) — Nordbergbakken 9", lat: 59.9559, lng: 10.7420, icon: "🏠" },
    { type: "lodging", name: "Familien Rekdal (hjemreise) — Fossilveien 2, Gjettum", lat: 59.9050, lng: 10.5238, icon: "🏠" },
    { type: "praktisk", name: "Color Line Terminal Hjortnes", lat: 59.9110, lng: 10.6850, icon: "⛴️" }
  ],
  berlin: [
    { type: "lodging", name: "Hotel Art Nouveau (Leibnizstraße 59)", lat: 52.5028, lng: 13.3128, icon: "🏨", url: "https://www.hotelartnouveau.de/" },
    { type: "se", name: "Kaiser-Wilhelm-Gedächtniskirche", lat: 52.5048, lng: 13.3357, icon: "⛪" },
    { type: "se", name: "Brandenburger Tor", lat: 52.5163, lng: 13.3777, icon: "🏛️" },
    { type: "se", name: "Holocaust-Mahnmal", lat: 52.5139, lng: 13.3789, icon: "🕯️" },
    { type: "se", name: "Schloss Charlottenburg", lat: 52.5208, lng: 13.2956, icon: "🏰" },
    { type: "se", name: "Siegessäule (Tiergarten)", lat: 52.5145, lng: 13.3500, icon: "🗼" },
    { type: "se", name: "Käthe-Kollwitz-Museum", lat: 52.5043, lng: 13.3282, icon: "🖼️" },
    { type: "mat", name: "893 Ryōtei", lat: 52.5060, lng: 13.3132, icon: "🍣" },
    { type: "mat", name: "12 Apostoli (Savignyplatz)", lat: 52.5067, lng: 13.3215, icon: "🍕" },
    { type: "mat", name: "Lubitsch", lat: 52.5070, lng: 13.3213, icon: "🍽️" },
    { type: "lade", name: "Supercharger Berlin-Charlottenburg (Kantstraße)", lat: 52.5050, lng: 13.3220, icon: "⚡" }
  ],
  dresden: [
    { type: "lodging", name: "Leilighet hos familie", lat: 51.0504, lng: 13.7373, icon: "🏠" },
    { type: "se", name: "Frauenkirche", lat: 51.0517, lng: 13.7414, icon: "⛪" },
    { type: "se", name: "Zwinger", lat: 51.0530, lng: 13.7349, icon: "🏛️" },
    { type: "se", name: "Brühlsche Terrasse", lat: 51.0540, lng: 13.7408, icon: "🌉" },
    { type: "se", name: "Semperoper", lat: 51.0541, lng: 13.7351, icon: "🎭" },
    { type: "se", name: "Fürstenzug", lat: 51.0527, lng: 13.7400, icon: "🖼️" },
    { type: "mat", name: "Sophienkeller im Taschenbergpalais", lat: 51.0530, lng: 13.7367, icon: "🍽️" },
    { type: "mat", name: "Augustiner an der Frauenkirche", lat: 51.0520, lng: 13.7414, icon: "🍺" },
    { type: "mat", name: "Kastenmeiers (Hilton)", lat: 51.0528, lng: 13.7414, icon: "🐟" }
  ],
  seefeld: [
    { type: "lodging", name: "AlpenParks Chalet Alpina (Geigenbühelstraße 12)", lat: 47.3347, lng: 11.1873, icon: "🏨", url: "https://www.alpenparks.at/de/chalet-apartment-alpina-seefeld" },
    { type: "se", name: "Wildsee + Seekirchl", lat: 47.3280, lng: 11.1800, icon: "🛕" },
    { type: "se", name: "Bergbahnen Rosshütte dalstasjon", lat: 47.3412, lng: 11.1965, icon: "🚠" },
    { type: "se", name: "Möserer See", lat: 47.3140, lng: 11.1370, icon: "💧" },
    { type: "se", name: "Mittenwald sentrum", lat: 47.4430, lng: 11.2620, icon: "🏘️" },
    { type: "se", name: "Innsbruck Goldenes Dachl", lat: 47.2683, lng: 11.3938, icon: "✨" },
    { type: "mat", name: "Strandperle am Wildsee", lat: 47.3290, lng: 11.1815, icon: "🍽️" },
    { type: "mat", name: "Waldgasthaus Triendlsäge", lat: 47.3340, lng: 11.2050, icon: "🥨" },
    { type: "mat", name: "Klosterbräu (Ritter-Oswald-Stube)", lat: 47.3294, lng: 11.1855, icon: "🍺" },
    { type: "lade", name: "Tesla Supercharger Innsbruck", lat: 47.2630, lng: 11.4000, icon: "⚡" }
  ],
  bardolino: [
    { type: "lodging", name: "Villa Venezia — Via Montavoletta 14, Pozzo", lat: 45.5517, lng: 10.7341, icon: "🏠", url: "https://www.airbnb.no/rooms/51456317" },
    { type: "strand", name: "Lido Cisano", lat: 45.5350, lng: 10.7280, icon: "🏖️" },
    { type: "strand", name: "Lido Mirabello", lat: 45.5450, lng: 10.7190, icon: "🏖️" },
    { type: "strand", name: "Punta Cornicello", lat: 45.5600, lng: 10.7170, icon: "🏖️" },
    { type: "strand", name: "Baia delle Sirene (San Vigilio)", lat: 45.5810, lng: 10.7120, icon: "🏖️" },
    { type: "mat", name: "La Veranda del Color", lat: 45.5488, lng: 10.7240, icon: "⭐" },
    { type: "mat", name: "Il Giardino delle Esperidi", lat: 45.5510, lng: 10.7190, icon: "⭐" },
    { type: "mat", name: "Al Porto Bardolino", lat: 45.5495, lng: 10.7165, icon: "🐟" },
    { type: "mat", name: "Pizzeria Bardolino", lat: 45.5512, lng: 10.7220, icon: "🍕" },
    { type: "mat", name: "Gelateria Cristallo", lat: 45.5491, lng: 10.7188, icon: "🍦" },
    { type: "mat", name: "Guerrieri Rizzardi (vingård)", lat: 45.5505, lng: 10.7170, icon: "🍷" },
    { type: "dagstur", name: "Verona Arena", lat: 45.4389, lng: 10.9944, icon: "🏟️" },
    { type: "dagstur", name: "Sirmione Castello", lat: 45.4948, lng: 10.6051, icon: "🏰" },
    { type: "dagstur", name: "Monte Baldo Malcesine funivia", lat: 45.7679, lng: 10.8108, icon: "🚠" },
    { type: "dagstur", name: "Gardaland", lat: 45.4513, lng: 10.7140, icon: "🎢" },
    { type: "dagstur", name: "Punta San Vigilio", lat: 45.5810, lng: 10.7150, icon: "📍" },
    { type: "lade", name: "Supercharger Affi (Lake Garda)", lat: 45.5640, lng: 10.7810, icon: "⚡" },
    { type: "praktisk", name: "Eurospar Bardolino — Via Santa Cristina 3 (sentrum)", lat: 45.5435, lng: 10.7254, icon: "🛒" },
    { type: "praktisk", name: "Conad Superstore Affi — Via dell'Industria (storhandel)", lat: 45.5463, lng: 10.8039, icon: "🛒" },
    { type: "praktisk", name: "Mercato Bardolino (torsdag 08–13) — Lungolago Preite", lat: 45.5500, lng: 10.7177, icon: "🥬" },
    { type: "praktisk", name: "Farmacia alla Madonna", lat: 45.5505, lng: 10.7195, icon: "💊" }
  ],
  grado: [
    { type: "lodging", name: "Airbnb — Riva Brioni 27", lat: 45.6826, lng: 13.3788, icon: "🏠", url: "https://www.airbnb.no/rooms/847787569977003234" },
    { type: "strand", name: "Costa Azzurra (300 m gange)", lat: 45.6800, lng: 13.3767, icon: "🏖️" },
    { type: "strand", name: "Spiaggia Principale (GIT)", lat: 45.6764, lng: 13.3984, icon: "🏖️" },
    { type: "strand", name: "Spiaggia al Bosco", lat: 45.6770, lng: 13.4070, icon: "🏖️" },
    { type: "strand", name: "Grado Pineta", lat: 45.6800, lng: 13.4160, icon: "🌲" },
    { type: "praktisk", name: "Despar — Viale Europa Unita 35c (700 m, hovedhandel)", lat: 45.6769, lng: 13.3874, icon: "🛒" },
    { type: "praktisk", name: "Despar — Viale Kennedy 28 (Città Giardino)", lat: 45.6799, lng: 13.4036, icon: "🛒" },
    { type: "praktisk", name: "Mercato Coperto (fisk, grønt, kjøtt) — Via De Amicis", lat: 45.6769, lng: 13.3837, icon: "🥬" },
    { type: "praktisk", name: "Farmacia Comunale", lat: 45.6792, lng: 13.3935, icon: "💊" },
    { type: "mat", name: "Tavernetta all'Androna", lat: 45.6790, lng: 13.3950, icon: "⭐" },
    { type: "mat", name: "Trattoria de Toni", lat: 45.6791, lng: 13.3941, icon: "🐟" },
    { type: "mat", name: "L'Approdo", lat: 45.6788, lng: 13.3970, icon: "🍽️" },
    { type: "mat", name: "Zero Miglia (havnen)", lat: 45.6800, lng: 13.3955, icon: "🐟" },
    { type: "dagstur", name: "Aquileia Basilika (UNESCO)", lat: 45.7705, lng: 13.3712, icon: "⛪" },
    { type: "dagstur", name: "Trieste Piazza Unità", lat: 45.6495, lng: 13.7686, icon: "🏛️" },
    { type: "dagstur", name: "Castello di Miramare", lat: 45.7027, lng: 13.7112, icon: "🏰" },
    { type: "dagstur", name: "Lignano Aquasplash", lat: 45.6730, lng: 13.1300, icon: "💦" },
    { type: "lade", name: "Tesla Supercharger Villesse", lat: 45.8650, lng: 13.4760, icon: "⚡" }
  ],
  hof: [
    { type: "lodging", name: "Hotel Central Hof (Kulmbacher Str. 2)", lat: 50.3206, lng: 11.9043, icon: "🏨", url: "https://hotel-central-hof.de/" },
    { type: "se", name: "Bürgerpark Theresienstein", lat: 50.3248, lng: 11.9118, icon: "🌳" },
    { type: "se", name: "Marienkirche", lat: 50.3210, lng: 11.9173, icon: "⛪" },
    { type: "mat", name: "Kastaniengarten (hotellet)", lat: 50.3119, lng: 11.9097, icon: "🍽️" },
    { type: "mat", name: "Altdeutsche Bierstube", lat: 50.3186, lng: 11.9163, icon: "🍺" }
  ],
  hamburg: [
    { type: "lodging", name: "Anbefalt: HafenCity / Speicherstadt", lat: 53.5413, lng: 9.9999, icon: "🏨" },
    { type: "se", name: "Miniatur Wunderland", lat: 53.5437, lng: 9.9885, icon: "🚂" },
    { type: "se", name: "Elbphilharmonie", lat: 53.5414, lng: 9.9842, icon: "🎶" },
    { type: "se", name: "Speicherstadt (Poggenmühlenbrücke)", lat: 53.5460, lng: 9.9987, icon: "🌉" },
    { type: "se", name: "Landungsbrücken", lat: 53.5459, lng: 9.9683, icon: "⚓" },
    { type: "mat", name: "Brücke 10", lat: 53.5458, lng: 9.9700, icon: "🐟" },
    { type: "mat", name: "Hafenwirtschaft", lat: 53.5454, lng: 9.9670, icon: "🍽️" },
    { type: "lade", name: "Supercharger HafenCity (Versmannstraße)", lat: 53.5407, lng: 10.0067, icon: "⚡" }
  ],
  trondheim: [
    { type: "lodging", name: "Hjemme — Leiv Eirikssons vei 3a", lat: 63.4308, lng: 10.4574, icon: "🏠" }
  ],
  ferge: [
    { type: "lodging", name: "MS Color Magic", lat: 58.55, lng: 10.5, icon: "🚢" }
  ]
};

// Eksport
// Ting som må bookes — alle på ett sted
const BOOKINGS = [
  { id: "color-line-syd", what: "Color Line Oslo → Kiel (utreise)", city: "ferge", deadline: "2026-04-01", url: "https://www.colorline.no/", note: "MS Color Magic, avgang Hjortnes 14:00. Book familielugar tidlig — populært." },
  { id: "color-line-nord", what: "Color Line Kiel → Oslo (hjemreise)", city: "ferge", deadline: "2026-04-01", url: "https://www.colorline.no/", note: "Avgang Kiel lørdag 11. juli 14:00." },
  { id: "art-nouveau", what: "Hotel Art Nouveau Berlin", city: "berlin", deadline: "2026-03-01", url: "https://www.hotelartnouveau.de/", note: "Familierom 1 natt 23.–24. juni." },
  { id: "reichstag", what: "Reichstag-kuppel Berlin", city: "berlin", deadline: "2026-05-23", url: "https://www.bundestag.de/", note: "Bestilles 4–6 uker før. NB stengt 15.–19. juni 2026 — sjekk 23.06." },
  { id: "alpenparks", what: "AlpenParks Chalet Alpina Seefeld", city: "seefeld", deadline: "2026-02-01", url: "https://www.alpenparks.at/de/chalet-apartment-alpina-seefeld", note: "2 netter 25.–27. juni." },
  { id: "monte-baldo", what: "Monte Baldo funivia (Malcesine)", city: "bardolino", deadline: "2026-06-15", url: "https://www.funiviedelbaldo.it/en", note: "27 € voksen t/r. Online tidsslot — selges raskt sommer." },
  { id: "veranda-color", what: "La Veranda del Color (fine dining)", city: "bardolino", deadline: "2026-06-08", url: "https://www.laverandadelcolor.it/it", note: "2–4 uker før. Smaksmeny 90–130 €/p." },
  { id: "esperidi", what: "Il Giardino delle Esperidi", city: "bardolino", deadline: "2026-06-15", url: "https://guide.michelin.com/us/en/veneto/bardolino/restaurant/il-giardino-delle-esperidi", note: "Sentrumsrestaurant, må bookes." },
  { id: "guerrieri", what: "Guerrieri Rizzardi vinomvisning", city: "bardolino", deadline: "2026-06-22", url: "https://www.guerrieri-rizzardi.it/it/nuove-esperienze-2025-guerrieri-rizzardi/", note: "25–55 €/p. Velg tidsslot." },
  { id: "pizzeria-bardolino", what: "Pizzeria Bardolino", city: "bardolino", deadline: null, url: null, note: "Møt opp 17:00 eller ring 1–2 dager før — ellers stengt." },
  { id: "al-porto", what: "Al Porto Bardolino (fre/lør)", city: "bardolino", deadline: null, url: null, note: "Book 3–5 dager før hvis fredag/lørdag." },
  { id: "ca-bottona", what: "Trattoria Cà Bottona (helger)", city: "bardolino", deadline: null, url: null, note: "1 uke før i helger." },
  { id: "bardolino-airbnb", what: "Airbnb Via Montavoletta 14", city: "bardolino", deadline: "2026-02-01", url: "https://www.airbnb.no/rooms/51456317", note: "8 netter." },
  { id: "grado-airbnb", what: "Airbnb Riva Brioni 27 Grado", city: "grado", deadline: "2026-02-01", url: "https://www.airbnb.no/rooms/847787569977003234", note: "4 netter." },
  { id: "tavernetta-androna", what: "Tavernetta all'Androna (Grado)", city: "grado", deadline: "2026-06-25", url: null, note: "Michelin-anbefalt. Bestill telefonisk +39 0431 80950." },
  { id: "de-toni", what: "Trattoria de Toni (Grado)", city: "grado", deadline: "2026-06-25", url: null, note: "Boreto-stedet. +39 0431 80104." },
  { id: "casoni-grado", what: "Lagune-/casoni-tur Grado", city: "grado", deadline: null, url: null, note: "3–4 t med polenta-måltid. Book via turistkontoret eller direkte med båteier." },
  { id: "hotel-central-hof", what: "Hotel Central Hof", city: "hof", deadline: "2026-04-01", url: "https://hotel-central-hof.de/", note: "1 natt 9.–10. juli." },
  { id: "hamburg-hotell", what: "Hamburg hotell (PIERDREI, AMERON eller Adina)", city: "hamburg", deadline: "2026-05-01", url: null, note: "Velg ett av tre forslag, eller fritt valg. 1 natt 10.–11. juli." },
  { id: "miniatur", what: "Miniatur Wunderland tidsslot", city: "hamburg", deadline: "2026-07-03", url: "https://www.miniatur-wunderland.com/", note: "Bestill tidsslot — ofte utsolgt i sommer." }
];

// Nødinfo per land
const EMERGENCY = {
  no: { ambulance: "113", police: "112", fire: "110", embassy: null },
  de: { ambulance: "112", police: "110", fire: "112", embassy: "Norsk ambassade Berlin: Rauchstraße 1, 10787 Berlin. Tlf +49 30 50 50 50." },
  at: { ambulance: "144", police: "133", fire: "122", embassy: "Norsk ambassade Wien: Reisnerstraße 55–57, 1030 Wien. Tlf +43 1 716 600." },
  it: { ambulance: "118", police: "112 / 113", fire: "115", embassy: "Norsk ambassade Roma: Via delle Terme Deciane 7, 00153 Roma. Tlf +39 06 5717 171. Honorær konsul Verona: tlf +39 045 800 1488." }
};

if (typeof module !== 'undefined') module.exports = { TRIP, DAYS, CITIES, CHARGING, ROUTE_COORDS, LEGS, LODGINGS, CITY_POIS, BOOKINGS, EMERGENCY };
