// Philippines Address Service using PSGC Cloud API
// API Docs: https://psgc.cloud/

const PSGC_API_BASE = "https://psgc.cloud/api";

export interface PSGCRegion {
  code: string;
  name: string;
  islandGroup: string;
}

export interface PSGCProvince {
  code: string;
  name: string;
  regionCode: string;
}

export interface PSGCCity {
  code: string;
  name: string;
  provinceCode: string;
  cityClass?: string;
  income?: string;
  isCapital?: boolean;
}

export interface PSGCBarangay {
  code: string;
  name: string;
  cityCode: string;
}

// Cache to avoid repeated API calls
const cache = {
  regions: null as PSGCRegion[] | null,
  provinces: new Map<string, PSGCProvince[]>(),
  cities: new Map<string, PSGCCity[]>(),
  barangays: new Map<string, PSGCBarangay[]>(),
};

// ZIP code mapping for major cities (since API doesn't provide ZIP codes)
const ZIP_CODES: Record<string, string> = {
  // NCR Cities
  "Manila": "1000",
  "Quezon City": "1100",
  "Caloocan": "1400",
  "Las Piñas": "1740",
  "Makati": "1200",
  "Malabon": "1470",
  "Mandaluyong": "1550",
  "Marikina": "1800",
  "Muntinlupa": "1770",
  "Navotas": "1485",
  "Parañaque": "1700",
  "Pasay": "1300",
  "Pasig": "1600",
  "San Juan": "1500",
  "Taguig": "1630",
  "Valenzuela": "1440",
  "Pateros": "1620",
  
  // Major Cities Outside NCR
  "Cebu City": "6000",
  "Davao City": "8000",
  "Zamboanga City": "7000",
  "Baguio": "2600",
  "Iloilo City": "5000",
  "Cagayan de Oro": "9000",
  "General Santos": "9500",
  "Bacolod": "6100",
  "Angeles": "2009",
  "San Fernando": "2000", // Pampanga
  "Vigan": "2700",
  "Laoag": "2900",
  "Dagupan": "2400",
  "Butuan": "8600",
  "Puerto Princesa": "5300",
  "Tagbilaran": "6300",
  "Dumaguete": "6200",
  "Tacloban": "6500",
  "Malolos": "3000",
  "Santa Rosa": "4026",
  "Calamba": "4027",
  "Antipolo": "1870",
  "Biñan": "4024",
  "San Pedro": "4023",
  "Dasmariñas": "4114",
  "Bacoor": "4102",
  "Imus": "4103",
  "General Trias": "4107",
};

// Get all regions
export async function getAllRegions(): Promise<PSGCRegion[]> {
  if (cache.regions) {
    return cache.regions;
  }

  try {
    const response = await fetch(`${PSGC_API_BASE}/regions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch regions: ${response.status}`);
    }
    
    const data = await response.json();
    cache.regions = data;
    return data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}

// Get provinces by region (returns empty for NCR)
export async function getProvincesByRegion(regionCode: string): Promise<PSGCProvince[]> {
  const cacheKey = regionCode;
  if (cache.provinces.has(cacheKey)) {
    return cache.provinces.get(cacheKey)!;
  }

  // NCR doesn't have provinces, return empty array
  if (regionCode === "1300000000") {
    cache.provinces.set(cacheKey, []);
    return [];
  }

  try {
    const response = await fetch(`${PSGC_API_BASE}/regions/${regionCode}/provinces`);
    if (!response.ok) {
      throw new Error(`Failed to fetch provinces: ${response.status}`);
    }
    
    const data = await response.json();
    cache.provinces.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
}

// Get cities by province or region (for NCR)
export async function getCitiesByProvinceOrRegion(regionCode: string, provinceCode?: string): Promise<PSGCCity[]> {
  // For NCR, get cities directly from region
  if (regionCode === "1300000000") {
    return getCitiesByRegion(regionCode);
  }

  // For other regions, use province code
  if (!provinceCode) {
    return [];
  }

  const cacheKey = provinceCode;
  if (cache.cities.has(cacheKey)) {
    return cache.cities.get(cacheKey)!;
  }

  try {
    const response = await fetch(`${PSGC_API_BASE}/provinces/${provinceCode}/cities-municipalities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }
    
    const data = await response.json();
    cache.cities.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

// Get cities directly from region (for NCR)
async function getCitiesByRegion(regionCode: string): Promise<PSGCCity[]> {
  const cacheKey = `region_${regionCode}`;
  if (cache.cities.has(cacheKey)) {
    return cache.cities.get(cacheKey)!;
  }

  try {
    const response = await fetch(`${PSGC_API_BASE}/regions/${regionCode}/cities-municipalities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cities for region: ${response.status}`);
    }
    
    const data = await response.json();
    cache.cities.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching cities for region:", error);
    return [];
  }
}

// Get barangays by city
export async function getBarangaysByCity(cityCode: string): Promise<PSGCBarangay[]> {
  const cacheKey = cityCode;
  if (cache.barangays.has(cacheKey)) {
    return cache.barangays.get(cacheKey)!;
  }

  try {
    const response = await fetch(`${PSGC_API_BASE}/cities-municipalities/${cityCode}/barangays`);
    if (!response.ok) {
      throw new Error(`Failed to fetch barangays: ${response.status}`);
    }
    
    const data = await response.json();
    cache.barangays.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching barangays:", error);
    return [];
  }
}

// Get ZIP code by city name (approximation since API doesn't provide ZIP codes)
export function getZipCodeByCity(cityName: string): string {
  // Try exact match first
  if (ZIP_CODES[cityName]) {
    return ZIP_CODES[cityName];
  }

  // Try partial match
  for (const [city, zipCode] of Object.entries(ZIP_CODES)) {
    if (cityName.includes(city) || city.includes(cityName)) {
      return zipCode;
    }
  }

  // Return default
  return "0000";
}

// Clear cache (useful for refreshing data)
export function clearCache() {
  cache.regions = null;
  cache.provinces.clear();
  cache.cities.clear();
  cache.barangays.clear();
}

// Check if a region has provinces (false for NCR)
export function regionHasProvinces(regionCode: string): boolean {
  return regionCode !== "1300000000"; // NCR doesn't have provinces
}