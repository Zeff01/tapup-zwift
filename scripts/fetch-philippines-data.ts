// Script to fetch Philippine address data from PSGC API
// Run with: npx tsx scripts/fetch-philippines-data.ts

const PSGC_API_BASE = "https://psgc.cloud/api";

interface PSGCRegion {
  code: string;
  name: string;
}

interface PSGCProvince {
  code: string;
  name: string;
  regionCode: string;
}

interface PSGCCity {
  code: string;
  name: string;
  provinceCode: string;
}

interface PSGCBarangay {
  code: string;
  name: string;
  cityCode: string;
}

async function fetchAllRegions(): Promise<PSGCRegion[]> {
  try {
    const response = await fetch(`${PSGC_API_BASE}/regions`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
}

async function fetchProvincesByRegion(regionCode: string): Promise<PSGCProvince[]> {
  try {
    const response = await fetch(`${PSGC_API_BASE}/regions/${regionCode}/provinces`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching provinces for region ${regionCode}:`, error);
    return [];
  }
}

async function fetchCitiesByProvince(provinceCode: string): Promise<PSGCCity[]> {
  try {
    const response = await fetch(`${PSGC_API_BASE}/provinces/${provinceCode}/cities-municipalities`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching cities for province ${provinceCode}:`, error);
    return [];
  }
}

async function fetchBarangaysByCity(cityCode: string): Promise<PSGCBarangay[]> {
  try {
    const response = await fetch(`${PSGC_API_BASE}/cities-municipalities/${cityCode}/barangays`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const barangays = await response.json();
    // Limit to first 20 barangays to avoid huge data files
    return barangays.slice(0, 20);
  } catch (error) {
    console.error(`Error fetching barangays for city ${cityCode}:`, error);
    return [];
  }
}

// ZIP code mapping based on province/city patterns
function getZipCodeForCity(regionName: string, provinceName: string, cityName: string): string {
  // Basic ZIP code mapping - in a real implementation, this would be more comprehensive
  const zipCodes: Record<string, Record<string, Record<string, string>>> = {
    "National Capital Region (NCR)": {
      "Metro Manila": {
        "Manila": "1000",
        "Quezon City": "1100",
        "Makati": "1200",
        "Pasig": "1600",
        "Taguig": "1630",
        "Marikina": "1800",
        "Mandaluyong": "1550",
        "San Juan": "1500",
        "Muntinlupa": "1770",
        "Parañaque": "1700",
        "Las Piñas": "1740",
        "Malabon": "1470",
        "Navotas": "1485",
        "Valenzuela": "1440",
        "Caloocan": "1400",
        "Pateros": "1620"
      }
    },
    "Region III (Central Luzon)": {
      "Pampanga": {
        "Angeles": "2009",
        "San Fernando": "2000",
      },
      "Bulacan": {
        "Malolos": "3000",
        "Meycauayan": "3020",
        "San Jose del Monte": "3023"
      }
    },
    "Region IV-A (CALABARZON)": {
      "Laguna": {
        "Calamba": "4027",
        "Los Baños": "4030",
        "Santa Rosa": "4026"
      },
      "Cavite": {
        "Cavite City": "4100",
        "Bacoor": "4102",
        "Imus": "4103"
      }
    }
    // Add more regions/provinces/cities as needed
  };

  return zipCodes[regionName]?.[provinceName]?.[cityName] || "0000";
}

async function generateCompletePhilippinesData() {
  console.log("🌏 Starting Philippine address data generation...\n");

  const regions = await fetchAllRegions();
  console.log(`✅ Found ${regions.length} regions`);

  const completeData = {
    regions: []
  };

  for (const region of regions) {
    console.log(`\n📍 Processing ${region.name}...`);
    
    const provinces = await fetchProvincesByRegion(region.code);
    console.log(`  - Found ${provinces.length} provinces`);

    const regionData = {
      code: region.code,
      name: region.name,
      provinces: []
    };

    for (const province of provinces.slice(0, 3)) { // Limit to 3 provinces per region for manageable size
      console.log(`    🏛️  Processing ${province.name}...`);
      
      const cities = await fetchCitiesByProvince(province.code);
      console.log(`      - Found ${cities.length} cities`);

      const provinceData = {
        code: province.code,
        name: province.name,
        cities: []
      };

      for (const city of cities.slice(0, 5)) { // Limit to 5 cities per province
        console.log(`        🏙️  Processing ${city.name}...`);
        
        const barangays = await fetchBarangaysByCity(city.code);
        console.log(`          - Found ${barangays.length} barangays`);

        const zipCode = getZipCodeForCity(region.name, province.name, city.name);

        const cityData = {
          code: city.code,
          name: city.name,
          zipCode: zipCode,
          barangays: barangays.map(barangay => ({
            name: barangay.name,
            zipCode: zipCode // Same ZIP code for all barangays in the city
          }))
        };

        provinceData.cities.push(cityData);
        
        // Add small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      regionData.provinces.push(provinceData);
    }

    completeData.regions.push(regionData);
  }

  // Generate TypeScript file
  const tsContent = `// Complete Philippines Address Data
// Auto-generated from PSGC API on ${new Date().toISOString()}

export interface CompletePhilippinesAddress {
  regions: Region[];
}

export interface Region {
  code: string;
  name: string;
  provinces: Province[];
}

export interface Province {
  code: string;
  name: string;
  cities: City[];
}

export interface City {
  code: string;
  name: string;
  zipCode: string;
  barangays: Barangay[];
}

export interface Barangay {
  name: string;
  zipCode: string;
}

export const completePhilippinesData: CompletePhilippinesAddress = ${JSON.stringify(completeData, null, 2)};

// Utility functions
export const getAllRegions = (): Region[] => {
  return completePhilippinesData.regions;
};

export const getProvincesByRegion = (regionCode: string): Province[] => {
  const region = completePhilippinesData.regions.find(r => r.code === regionCode);
  return region ? region.provinces : [];
};

export const getCitiesByProvince = (regionCode: string, provinceCode: string): City[] => {
  const region = completePhilippinesData.regions.find(r => r.code === regionCode);
  if (!region) return [];
  
  const province = region.provinces.find(p => p.code === provinceCode);
  return province ? province.cities : [];
};

export const getBarangaysByCity = (regionCode: string, provinceCode: string, cityCode: string): Barangay[] => {
  const region = completePhilippinesData.regions.find(r => r.code === regionCode);
  if (!region) return [];
  
  const province = region.provinces.find(p => p.code === provinceCode);
  if (!province) return [];
  
  const city = province.cities.find(c => c.code === cityCode);
  return city ? city.barangays : [];
};

export const getZipCodeByBarangay = (regionCode: string, provinceCode: string, cityCode: string, barangayName: string): string => {
  const barangays = getBarangaysByCity(regionCode, provinceCode, cityCode);
  const barangay = barangays.find(b => b.name === barangayName);
  
  if (barangay) {
    return barangay.zipCode;
  }
  
  // Fallback to city ZIP code
  const cities = getCitiesByProvince(regionCode, provinceCode);
  const city = cities.find(c => c.code === cityCode);
  return city ? city.zipCode : "";
};
`;

  // Write to file
  const fs = require('fs');
  const path = require('path');
  
  const outputPath = path.join(__dirname, '..', 'lib', 'data', 'philippines-auto-generated.ts');
  fs.writeFileSync(outputPath, tsContent);
  
  console.log(`\n✅ Complete! Generated file: ${outputPath}`);
  console.log(`📊 Total regions: ${completeData.regions.length}`);
  console.log(`📊 Total provinces: ${completeData.regions.reduce((sum, r) => sum + r.provinces.length, 0)}`);
  console.log(`📊 Total cities: ${completeData.regions.reduce((sum, r) => sum + r.provinces.reduce((pSum, p) => pSum + p.cities.length, 0), 0)}`);
}

// Run the generator
generateCompletePhilippinesData().catch(console.error);