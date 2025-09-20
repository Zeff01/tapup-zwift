// Philippines Address Data Structure
// This contains provinces, cities, and barangays for cascading address selection

export interface PhilippinesAddress {
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
  barangays: string[];
}

// Sample Philippines address data (you can expand this with complete data)
export const philippinesAddressData: PhilippinesAddress = {
  provinces: [
    {
      code: "NCR",
      name: "National Capital Region (NCR)",
      cities: [
        {
          code: "MANILA",
          name: "Manila",
          barangays: [
            "Barangay 1, Zone 1",
            "Barangay 2, Zone 1",
            "Barangay 3, Zone 1",
            "Barangay 4, Zone 1",
            "Binondo",
            "Ermita",
            "Intramuros",
            "Malate",
            "Paco",
            "Pandacan",
            "Port Area",
            "Quiapo",
            "Sampaloc",
            "San Andres",
            "San Miguel",
            "San Nicolas",
            "Santa Ana",
            "Santa Cruz",
            "Santa Mesa",
            "Tondo"
          ]
        },
        {
          code: "QUEZON_CITY",
          name: "Quezon City",
          barangays: [
            "Alicia",
            "Amihan",
            "Baesa",
            "Bagong Lipunan ng Crame",
            "Bagumbayan",
            "Bagumbuhay",
            "Balingasa",
            "Balintawak",
            "Batasan Hills",
            "Bayanihan",
            "Blue Ridge A",
            "Blue Ridge B",
            "Botocan",
            "Bungad",
            "Camp Aguinaldo",
            "Central",
            "Claro",
            "Commonwealth",
            "Cubao",
            "Culiat",
            "Damar",
            "Diliman",
            "Don Manuel",
            "Dona Imelda",
            "Dona Josefa",
            "Duyan-Duyan",
            "E. Rodriguez",
            "East Triangle",
            "Escolta",
            "Fairview",
            "Greater Lagro",
            "Gulod",
            "Horseshoe",
            "Kalusugan",
            "Kamuning",
            "Kristong Hari",
            "Krus Na Ligas",
            "Libis",
            "Lourdes",
            "Loyola Heights",
            "Maharlika",
            "Malaya",
            "Manresa",
            "Mariblo",
            "Marilag",
            "Masambong",
            "Matandang Balara",
            "Milagrosa",
            "N.S. Amoranto",
            "Nayong Kanluran",
            "New Era",
            "North Fairview",
            "Novaliches Proper",
            "Obrero",
            "Old Balara",
            "Paang Bundok",
            "Pag-ibig sa Nayon",
            "Pajac",
            "Paligsahan",
            "Paltok",
            "Paraiso",
            "Phil-Am",
            "Pinagkaisahan",
            "Pinyahan",
            "Project 6",
            "Project 7",
            "Project 8",
            "Roxas",
            "Sacred Heart",
            "Saint Ignatius",
            "San Agustin",
            "San Antonio",
            "San Bartolome",
            "San Isidro Labrador",
            "San Jose",
            "San Martin de Porres",
            "San Roque",
            "Santa Lucia",
            "Santa Monica",
            "Santa Teresita",
            "Santo Cristo",
            "Santo Domingo",
            "Santo Nino",
            "Santol",
            "Sienna",
            "Silangan",
            "Socorro",
            "Tagumpay",
            "Talayan",
            "Tandang Sora",
            "Tatalon",
            "Teachers Village East",
            "Teachers Village West",
            "U.P. Campus",
            "Ugong Norte",
            "Unang Sigaw",
            "UP Village",
            "Valencia",
            "Vasra",
            "Veterans Village",
            "West Triangle",
            "White Plains"
          ]
        },
        {
          code: "MAKATI",
          name: "Makati",
          barangays: [
            "Bangkal",
            "Bel-Air",
            "Carmona",
            "Cembo",
            "Comembo",
            "Dasmariñas",
            "East Rembo",
            "Forbes Park",
            "Guadalupe Nuevo",
            "Guadalupe Viejo",
            "Kasilawan",
            "La Paz",
            "Magallanes",
            "Olympia",
            "Palanan",
            "Pembo",
            "Pinagkaisahan",
            "Pio del Pilar",
            "Pitogo",
            "Poblacion",
            "Post Proper Northside",
            "Post Proper Southside",
            "Rizal",
            "San Antonio",
            "San Isidro",
            "San Lorenzo",
            "Santa Cruz",
            "Singkamas",
            "South Cembo",
            "Tejeros",
            "Urdaneta",
            "Valenzuela",
            "West Rembo"
          ]
        },
        {
          code: "PASIG",
          name: "Pasig",
          barangays: [
            "Bagong Ilog",
            "Bagong Katipunan",
            "Bambang",
            "Buting",
            "Caniogan",
            "Dela Paz",
            "Kalawaan",
            "Kapasigan",
            "Kapitolyo",
            "Malinao",
            "Manggahan",
            "Maybunga",
            "Oranbo",
            "Palatiw",
            "Pinagbuhatan",
            "Rosario",
            "Sagad",
            "San Antonio",
            "San Joaquin",
            "San Jose",
            "San Miguel",
            "San Nicolas",
            "Santa Cruz",
            "Santa Lucia",
            "Santa Rosa",
            "Santo Tomas",
            "Santolan",
            "Sumilang",
            "Ugong",
            "Wawa"
          ]
        }
      ]
    },
    {
      code: "REGION_III",
      name: "Central Luzon (Region III)",
      cities: [
        {
          code: "ANGELES",
          name: "Angeles City",
          barangays: [
            "Agapito del Rosario",
            "Amsic",
            "Balibago",
            "Capaya",
            "Claro M. Recto",
            "Cuayan",
            "Cutcut",
            "Cutud",
            "Lourdes North West",
            "Lourdes Sur",
            "Lourdes Sur East",
            "Malabanias",
            "Malabañas",
            "Margot",
            "Mining",
            "Ninoy Aquino",
            "Pampang",
            "Pulung Bulu",
            "Pulung Cacutud",
            "Pulung Maragul",
            "Salapungan",
            "San Jose",
            "San Nicolas",
            "Santa Teresita",
            "Santa Trinidad",
            "Santo Cristo",
            "Santo Domingo",
            "Santo Rosario",
            "Sapalibutad",
            "Sapangbato",
            "Tabun",
            "Timog",
            "Urduja Village"
          ]
        },
        {
          code: "SAN_FERNANDO_PAMPANGA",
          name: "San Fernando, Pampanga",
          barangays: [
            "Alasas",
            "Baliti",
            "Budtasan",
            "Cabalantian",
            "Calulut",
            "Del Carmen",
            "Del Pilar",
            "Del Rosario",
            "Dolores",
            "Juliana",
            "Lara",
            "Lourdes",
            "Magliman",
            "Malino",
            "Malpitic",
            "Maimpis",
            "Northville",
            "Panipuan",
            "Pulung Bunga",
            "Quebiawan",
            "San Agustin",
            "San Felipe",
            "San Isidro",
            "San Jose",
            "San Juan",
            "San Nicolas",
            "San Pedro",
            "Santa Lucia",
            "Santa Teresita",
            "Santo Niño",
            "Santo Rosario",
            "Sindalan",
            "Telabastagan"
          ]
        }
      ]
    },
    {
      code: "REGION_IV_A",
      name: "CALABARZON (Region IV-A)",
      cities: [
        {
          code: "ANTIPOLO",
          name: "Antipolo",
          barangays: [
            "Bagong Nayon",
            "Beverly Hills",
            "Cupang",
            "Dalig",
            "De La Paz",
            "Dela Paz",
            "Inarawan",
            "Mayamot",
            "San Isidro",
            "San Jose",
            "San Juan",
            "San Luis",
            "San Roque",
            "Santa Cruz",
            "Santo Niño",
            "Taktak"
          ]
        },
        {
          code: "LAGUNA_CALAMBA",
          name: "Calamba, Laguna",
          barangays: [
            "Bagong Kalsada",
            "Banadero",
            "Banay-banay",
            "Barandal",
            "Batino",
            "Bubuyan",
            "Bucal",
            "Bunggo",
            "Burol",
            "Camaligan",
            "Canlubang",
            "Halang",
            "Hornalan",
            "Kay-Anlog",
            "La Mesa",
            "Laguerta",
            "Lawa",
            "Lecheria",
            "Lingga",
            "Looc",
            "Mabato",
            "Majada-Labas",
            "Makiling",
            "Mapagong",
            "Masili",
            "Maunong",
            "Mayapa",
            "Milagrosa",
            "Paciano Rizal",
            "Palingon",
            "Palo-Alto",
            "Pansol",
            "Parian",
            "Poblacion",
            "Punta",
            "Puting Lupa",
            "Real",
            "Saimsim",
            "Sampiruhan",
            "San Cristobal",
            "San Jose",
            "San Juan",
            "Sirang Lupa",
            "Sucol",
            "Turbina",
            "Ulango",
            "Uwisan"
          ]
        }
      ]
    }
  ]
};

// Utility functions for address operations
export const getProvinces = (): Province[] => {
  return philippinesAddressData.provinces;
};

export const getCitiesByProvince = (provinceCode: string): City[] => {
  const province = philippinesAddressData.provinces.find(p => p.code === provinceCode);
  return province ? province.cities : [];
};

export const getBarangaysByCity = (provinceCode: string, cityCode: string): string[] => {
  const province = philippinesAddressData.provinces.find(p => p.code === provinceCode);
  if (!province) return [];
  
  const city = province.cities.find(c => c.code === cityCode);
  return city ? city.barangays : [];
};

export const getProvinceByCode = (code: string): Province | null => {
  return philippinesAddressData.provinces.find(p => p.code === code) || null;
};

export const getCityByCode = (provinceCode: string, cityCode: string): City | null => {
  const province = getProvinceByCode(provinceCode);
  if (!province) return null;
  
  return province.cities.find(c => c.code === cityCode) || null;
};