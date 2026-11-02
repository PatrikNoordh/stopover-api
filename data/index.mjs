export const flights = [
  // ← Direktflyg (för att jämföra pris)
  {
    id: "f1",
    from: "GOT",
    to: "BKK",
    date: "2026-12-03",
    airline: "Thai Airways",
    price: 11200,
  },
  {
    id: "f2",
    from: "ARN",
    to: "BKK",
    date: "2026-12-03",
    airline: "Thai Airways",
    price: 9800,
  },

  // ← Via Dubai (DXB)
  {
    id: "f3",
    from: "GOT",
    to: "DXB",
    date: "2026-12-01",
    airline: "Emirates",
    price: 3200,
  },
  {
    id: "f4",
    from: "DXB",
    to: "BKK",
    date: "2026-12-03",
    airline: "Emirates",
    price: 3900,
  },
  {
    id: "f5",
    from: "DXB",
    to: "BKK",
    date: "2026-12-05",
    airline: "Flydubai",
    price: 2700,
  },

  // ← Via Istanbul (IST)
  {
    id: "f6",
    from: "GOT",
    to: "IST",
    date: "2026-12-01",
    airline: "Turkish Airlines",
    price: 1900,
  },
  {
    id: "f7",
    from: "IST",
    to: "BKK",
    date: "2026-12-04",
    airline: "Turkish Airlines",
    price: 4800,
  },
  {
    id: "f8",
    from: "IST",
    to: "BKK",
    date: "2026-12-09",
    airline: "Turkish Airlines",
    price: 3500,
  }, // ← 8 nätter: för länge

  // ← Via Doha (DOH) från Arlanda
  {
    id: "f9",
    from: "ARN",
    to: "DOH",
    date: "2026-12-02",
    airline: "Qatar Airways",
    price: 3600,
  },
  {
    id: "f10",
    from: "DOH",
    to: "BKK",
    date: "2026-12-05",
    airline: "Qatar Airways",
    price: 3900,
  },

  // ← Via Helsingfors (HEL), samma dag: en layover, inte en stopover
  {
    id: "f11",
    from: "ARN",
    to: "HEL",
    date: "2026-12-02",
    airline: "Finnair",
    price: 900,
  },
  {
    id: "f12",
    from: "HEL",
    to: "BKK",
    date: "2026-12-02",
    airline: "Finnair",
    price: 6900,
  },
];

export const hotels = [
  { id: "h1", city: "DXB", name: "Marina Stay", pricePerNight: 650 },
  { id: "h2", city: "IST", name: "Bosphorus Inn", pricePerNight: 450 },
  { id: "h3", city: "DOH", name: "Corniche Hotel", pricePerNight: 700 },
  { id: "h4", city: "HEL", name: "Harbour Rooms", pricePerNight: 1100 },
];
