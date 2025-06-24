// Country data with flags and calling codes
export const countries = [
  { code: "US", name: "United States", flag: "🇺🇸", callingCode: "1" },
  { code: "IN", name: "India", flag: "🇮🇳", callingCode: "91" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", callingCode: "44" },
  { code: "CA", name: "Canada", flag: "🇨🇦", callingCode: "1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", callingCode: "61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", callingCode: "49" },
  { code: "FR", name: "France", flag: "🇫🇷", callingCode: "33" },
  { code: "JP", name: "Japan", flag: "🇯🇵", callingCode: "81" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", callingCode: "82" },
  { code: "CN", name: "China", flag: "🇨🇳", callingCode: "86" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", callingCode: "55" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", callingCode: "52" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", callingCode: "54" },
  { code: "RU", name: "Russia", flag: "🇷🇺", callingCode: "7" },
  { code: "IT", name: "Italy", flag: "🇮🇹", callingCode: "39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", callingCode: "34" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", callingCode: "31" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", callingCode: "46" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", callingCode: "41" },
  { code: "AT", name: "Austria", flag: "🇦🇹", callingCode: "43" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", callingCode: "32" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", callingCode: "45" },
  { code: "FI", name: "Finland", flag: "🇫🇮", callingCode: "358" },
  { code: "NO", name: "Norway", flag: "🇳🇴", callingCode: "47" },
  { code: "PL", name: "Poland", flag: "🇵🇱", callingCode: "48" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", callingCode: "351" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", callingCode: "353" },
  { code: "GR", name: "Greece", flag: "🇬🇷", callingCode: "30" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", callingCode: "90" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", callingCode: "966" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", callingCode: "971" },
  { code: "IL", name: "Israel", flag: "🇮🇱", callingCode: "972" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", callingCode: "20" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", callingCode: "27" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", callingCode: "234" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", callingCode: "254" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", callingCode: "233" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", callingCode: "66" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", callingCode: "84" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", callingCode: "65" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", callingCode: "60" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", callingCode: "62" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", callingCode: "63" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", callingCode: "880" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", callingCode: "92" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", callingCode: "94" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", callingCode: "977" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", callingCode: "95" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭", callingCode: "855" },
  { code: "LA", name: "Laos", flag: "🇱🇦", callingCode: "856" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", callingCode: "64" },
].sort((a, b) => a.name.localeCompare(b.name));

export const getCountryByCode = (code) => {
  return countries.find((country) => country.code === code) || countries[0];
};

export const searchCountries = (query) => {
  if (!query) return countries;

  const searchTerm = query.toLowerCase();
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm) ||
      country.callingCode.includes(searchTerm)
  );
};
