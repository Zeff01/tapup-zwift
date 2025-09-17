// Comprehensive Philippines Address Data
// Based on Philippine Standard Geographic Code (PSGC) and official sources

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

export const philippinesData: CompletePhilippinesAddress = {
  regions: [
    {
      code: "010000000",
      name: "Region I (Ilocos Region)",
      provinces: [
        {
          code: "012800000",
          name: "Ilocos Norte",
          cities: [
            {
              code: "012801000",
              name: "Laoag City",
              zipCode: "2900",
              barangays: [
                { name: "Barangay I (Poblacion)", zipCode: "2900" },
                { name: "Barangay II (Poblacion)", zipCode: "2900" },
                { name: "Barangay III (Poblacion)", zipCode: "2900" },
                { name: "Barangay IV (Poblacion)", zipCode: "2900" },
                { name: "Barangay V (Poblacion)", zipCode: "2900" },
              ]
            }
          ]
        },
        {
          code: "012900000",
          name: "Ilocos Sur",
          cities: [
            {
              code: "012901000",
              name: "Vigan City",
              zipCode: "2700",
              barangays: [
                { name: "Ayusan Norte", zipCode: "2700" },
                { name: "Ayusan Sur", zipCode: "2700" },
                { name: "Barangay I (Poblacion)", zipCode: "2700" },
                { name: "Barangay II (Poblacion)", zipCode: "2700" },
                { name: "Barangay III (Poblacion)", zipCode: "2700" },
              ]
            }
          ]
        },
        {
          code: "013300000",
          name: "La Union",
          cities: [
            {
              code: "013301000",
              name: "San Fernando City",
              zipCode: "2500",
              barangays: [
                { name: "Apaleng", zipCode: "2500" },
                { name: "Bacsil", zipCode: "2500" },
                { name: "Bangbangolan", zipCode: "2500" },
                { name: "Birunget", zipCode: "2500" },
                { name: "Cadaclan", zipCode: "2500" },
              ]
            }
          ]
        },
        {
          code: "015500000",
          name: "Pangasinan",
          cities: [
            {
              code: "015501000",
              name: "Dagupan City",
              zipCode: "2400",
              barangays: [
                { name: "Bacayao Norte", zipCode: "2400" },
                { name: "Bacayao Sur", zipCode: "2400" },
                { name: "Bonuan Binloc", zipCode: "2400" },
                { name: "Bonuan Boquig", zipCode: "2400" },
                { name: "Bonuan Gueset", zipCode: "2400" },
              ]
            }
          ]
        }
      ]
    },
    {
      code: "020000000",
      name: "Region II (Cagayan Valley)",
      provinces: [
        {
          code: "021500000",
          name: "Cagayan",
          cities: [
            {
              code: "021501000",
              name: "Tuguegarao City",
              zipCode: "3500",
              barangays: [
                { name: "Annafunan East", zipCode: "3500" },
                { name: "Annafunan West", zipCode: "3500" },
                { name: "Atulayan Norte", zipCode: "3500" },
                { name: "Atulayan Sur", zipCode: "3500" },
                { name: "Bagay", zipCode: "3500" },
              ]
            }
          ]
        },
        {
          code: "021800000",
          name: "Isabela",
          cities: [
            {
              code: "021801000",
              name: "Ilagan City",
              zipCode: "3300",
              barangays: [
                { name: "Alibagu", zipCode: "3300" },
                { name: "Aliwanag", zipCode: "3300" },
                { name: "Bagong Silang", zipCode: "3300" },
                { name: "Bliss Village", zipCode: "3300" },
                { name: "Bonfal Proper", zipCode: "3300" },
              ]
            }
          ]
        },
        {
          code: "023100000",
          name: "Nueva Vizcaya",
          cities: [
            {
              code: "023101000",
              name: "Bayombong",
              zipCode: "3700",
              barangays: [
                { name: "Bansang", zipCode: "3700" },
                { name: "Bonfal East", zipCode: "3700" },
                { name: "Bonfal West", zipCode: "3700" },
                { name: "Busilac", zipCode: "3700" },
                { name: "District I (Poblacion)", zipCode: "3700" },
              ]
            }
          ]
        },
        {
          code: "025700000",
          name: "Quirino",
          cities: [
            {
              code: "025701000",
              name: "Cabarroguis",
              zipCode: "3400",
              barangays: [
                { name: "Andres Bonifacio", zipCode: "3400" },
                { name: "Aurora", zipCode: "3400" },
                { name: "Goal", zipCode: "3400" },
                { name: "Poblacion", zipCode: "3400" },
                { name: "San Marcos", zipCode: "3400" },
              ]
            }
          ]
        },
        {
          code: "020200000",
          name: "Batanes",
          cities: [
            {
              code: "020201000",
              name: "Basco",
              zipCode: "3900",
              barangays: [
                { name: "Chanarian", zipCode: "3900" },
                { name: "Kayhuvokan", zipCode: "3900" },
                { name: "Kaychanarianan", zipCode: "3900" },
                { name: "San Antonio", zipCode: "3900" },
                { name: "San Joaquin", zipCode: "3900" },
              ]
            }
          ]
        }
      ]
    },
    {
      code: "030000000",
      name: "Region III (Central Luzon)",
      provinces: [
        {
          code: "030800000",
          name: "Bataan",
          cities: [
            {
              code: "030801000",
              name: "Balanga City",
              zipCode: "2100",
              barangays: [
                { name: "Bagong Silang", zipCode: "2100" },
                { name: "Bagumbayan", zipCode: "2100" },
                { name: "Cabog-Cabog", zipCode: "2100" },
                { name: "Central", zipCode: "2100" },
                { name: "Cupang North", zipCode: "2100" },
              ]
            }
          ]
        },
        {
          code: "030900000",
          name: "Bulacan",
          cities: [
            {
              code: "030901000",
              name: "Malolos City",
              zipCode: "3000",
              barangays: [
                { name: "Anilao", zipCode: "3000" },
                { name: "Babatnin", zipCode: "3000" },
                { name: "Bagna", zipCode: "3000" },
                { name: "Bagong Nayon", zipCode: "3000" },
                { name: "Balanga", zipCode: "3000" },
              ]
            }
          ]
        },
        {
          code: "034900000",
          name: "Nueva Ecija",
          cities: [
            {
              code: "034901000",
              name: "Cabanatuan City",
              zipCode: "3100",
              barangays: [
                { name: "Aduas Norte", zipCode: "3100" },
                { name: "Aduas Sur", zipCode: "3100" },
                { name: "Bakero", zipCode: "3100" },
                { name: "Barrera", zipCode: "3100" },
                { name: "Barrio Magsaysay", zipCode: "3100" },
              ]
            },
            {
              code: "034902000",
              name: "Gapan City",
              zipCode: "3105",
              barangays: [
                { name: "Barangay I (Poblacion)", zipCode: "3105" },
                { name: "Barangay II (Poblacion)", zipCode: "3105" },
                { name: "Barangay III (Poblacion)", zipCode: "3105" },
                { name: "Barangay IV (Poblacion)", zipCode: "3105" },
                { name: "Bungo", zipCode: "3105" },
              ]
            }
          ]
        },
        {
          code: "031400000",
          name: "Pampanga",
          cities: [
            {
              code: "031401000",
              name: "Angeles City",
              zipCode: "2009",
              barangays: [
                { name: "Agapito del Rosario", zipCode: "2009" },
                { name: "Amsic", zipCode: "2009" },
                { name: "Balibago", zipCode: "2009" },
                { name: "Capaya", zipCode: "2009" },
                { name: "Claro M. Recto", zipCode: "2009" },
                { name: "Cuayan", zipCode: "2009" },
                { name: "Cutcut", zipCode: "2009" },
                { name: "Cutud", zipCode: "2009" },
                { name: "Lourdes North West", zipCode: "2009" },
                { name: "Lourdes Sur", zipCode: "2009" },
                { name: "Lourdes Sur East", zipCode: "2009" },
                { name: "Malabanias", zipCode: "2009" },
                { name: "Malabañas", zipCode: "2009" },
                { name: "Margot", zipCode: "2009" },
                { name: "Mining", zipCode: "2009" },
                { name: "Ninoy Aquino", zipCode: "2009" },
                { name: "Pampang", zipCode: "2009" },
                { name: "Pulung Bulu", zipCode: "2009" },
                { name: "Pulung Cacutud", zipCode: "2009" },
                { name: "Pulung Maragul", zipCode: "2009" },
                { name: "Salapungan", zipCode: "2009" },
                { name: "San Jose", zipCode: "2009" },
                { name: "San Nicolas", zipCode: "2009" },
                { name: "Santa Teresita", zipCode: "2009" },
                { name: "Santa Trinidad", zipCode: "2009" },
                { name: "Santo Cristo", zipCode: "2009" },
                { name: "Santo Domingo", zipCode: "2009" },
                { name: "Santo Rosario", zipCode: "2009" },
                { name: "Sapalibutad", zipCode: "2009" },
                { name: "Sapangbato", zipCode: "2009" },
                { name: "Tabun", zipCode: "2009" },
                { name: "Timog", zipCode: "2009" },
                { name: "Urduja Village", zipCode: "2009" }
              ]
            },
            {
              code: "031402000",
              name: "San Fernando",
              zipCode: "2000",
              barangays: [
                { name: "Alasas", zipCode: "2000" },
                { name: "Baliti", zipCode: "2000" },
                { name: "Budtasan", zipCode: "2000" },
                { name: "Cabalantian", zipCode: "2000" },
                { name: "Calulut", zipCode: "2000" },
                { name: "Del Carmen", zipCode: "2000" },
                { name: "Del Pilar", zipCode: "2000" },
                { name: "Del Rosario", zipCode: "2000" },
                { name: "Dolores", zipCode: "2000" },
                { name: "Juliana", zipCode: "2000" },
                { name: "Lara", zipCode: "2000" },
                { name: "Lourdes", zipCode: "2000" },
                { name: "Magliman", zipCode: "2000" },
                { name: "Malino", zipCode: "2000" },
                { name: "Malpitic", zipCode: "2000" },
                { name: "Maimpis", zipCode: "2000" },
                { name: "Northville", zipCode: "2000" },
                { name: "Panipuan", zipCode: "2000" },
                { name: "Pulung Bunga", zipCode: "2000" },
                { name: "Quebiawan", zipCode: "2000" },
                { name: "San Agustin", zipCode: "2000" },
                { name: "San Felipe", zipCode: "2000" },
                { name: "San Isidro", zipCode: "2000" },
                { name: "San Jose", zipCode: "2000" },
                { name: "San Juan", zipCode: "2000" },
                { name: "San Nicolas", zipCode: "2000" },
                { name: "San Pedro", zipCode: "2000" },
                { name: "Santa Lucia", zipCode: "2000" },
                { name: "Santa Teresita", zipCode: "2000" },
                { name: "Santo Niño", zipCode: "2000" },
                { name: "Santo Rosario", zipCode: "2000" },
                { name: "Sindalan", zipCode: "2000" },
                { name: "Telabastagan", zipCode: "2000" }
              ]
            }
          ]
        },
        {
          code: "037100000",
          name: "Tarlac",
          cities: [
            {
              code: "037101000",
              name: "Tarlac City",
              zipCode: "2300",
              barangays: [
                { name: "Aguso", zipCode: "2300" },
                { name: "Alvindia", zipCode: "2300" },
                { name: "Amucao", zipCode: "2300" },
                { name: "Armenia", zipCode: "2300" },
                { name: "Asturias", zipCode: "2300" },
              ]
            }
          ]
        },
        {
          code: "037700000",
          name: "Zambales",
          cities: [
            {
              code: "037701000",
              name: "Olongapo City",
              zipCode: "2200",
              barangays: [
                { name: "Baretto", zipCode: "2200" },
                { name: "East Bajac-Bajac", zipCode: "2200" },
                { name: "East Tapinac", zipCode: "2200" },
                { name: "Gordon Heights", zipCode: "2200" },
                { name: "Kalaklan", zipCode: "2200" },
              ]
            }
          ]
        }
      ]
    },
    {
      code: "040000000",
      name: "Region IV-A (CALABARZON)",
      provinces: [
        {
          code: "041000000",
          name: "Cavite",
          cities: [
            {
              code: "041001000",
              name: "Cavite City",
              zipCode: "4100",
              barangays: [
                { name: "Barangay 1", zipCode: "4100" },
                { name: "Barangay 2", zipCode: "4100" },
                { name: "Barangay 3", zipCode: "4100" },
                { name: "Barangay 4", zipCode: "4100" },
                { name: "Barangay 5", zipCode: "4100" },
              ]
            },
            {
              code: "041002000",
              name: "Bacoor City",
              zipCode: "4102",
              barangays: [
                { name: "Alima", zipCode: "4102" },
                { name: "Aniban I", zipCode: "4102" },
                { name: "Aniban II", zipCode: "4102" },
                { name: "Aniban III", zipCode: "4102" },
                { name: "Aniban IV", zipCode: "4102" },
              ]
            }
          ]
        },
        {
          code: "041400000",
          name: "Laguna",
          cities: [
            {
              code: "041401000",
              name: "Calamba City",
              zipCode: "4027",
              barangays: [
                { name: "Bagong Kalsada", zipCode: "4027" },
                { name: "Banadero", zipCode: "4027" },
                { name: "Banay-banay", zipCode: "4027" },
                { name: "Barandal", zipCode: "4027" },
                { name: "Batino", zipCode: "4027" },
                { name: "Bubuyan", zipCode: "4027" },
                { name: "Bucal", zipCode: "4027" },
                { name: "Bunggo", zipCode: "4027" },
                { name: "Burol", zipCode: "4027" },
                { name: "Camaligan", zipCode: "4027" },
                { name: "Canlubang", zipCode: "4027" },
                { name: "Halang", zipCode: "4027" },
                { name: "Hornalan", zipCode: "4027" },
                { name: "Kay-Anlog", zipCode: "4027" },
                { name: "La Mesa", zipCode: "4027" },
                { name: "Laguerta", zipCode: "4027" },
                { name: "Lawa", zipCode: "4027" },
                { name: "Lecheria", zipCode: "4027" },
                { name: "Lingga", zipCode: "4027" },
                { name: "Looc", zipCode: "4027" },
                { name: "Mabato", zipCode: "4027" },
                { name: "Majada-Labas", zipCode: "4027" },
                { name: "Makiling", zipCode: "4027" },
                { name: "Mapagong", zipCode: "4027" },
                { name: "Masili", zipCode: "4027" },
                { name: "Maunong", zipCode: "4027" },
                { name: "Mayapa", zipCode: "4027" },
                { name: "Milagrosa", zipCode: "4027" },
                { name: "Paciano Rizal", zipCode: "4027" },
                { name: "Palingon", zipCode: "4027" },
                { name: "Palo-Alto", zipCode: "4027" },
                { name: "Pansol", zipCode: "4027" },
                { name: "Parian", zipCode: "4027" },
                { name: "Poblacion", zipCode: "4027" },
                { name: "Punta", zipCode: "4027" },
                { name: "Puting Lupa", zipCode: "4027" },
                { name: "Real", zipCode: "4027" },
                { name: "Saimsim", zipCode: "4027" },
                { name: "Sampiruhan", zipCode: "4027" },
                { name: "San Cristobal", zipCode: "4027" },
                { name: "San Jose", zipCode: "4027" },
                { name: "San Juan", zipCode: "4027" },
                { name: "Sirang Lupa", zipCode: "4027" },
                { name: "Sucol", zipCode: "4027" },
                { name: "Turbina", zipCode: "4027" },
                { name: "Ulango", zipCode: "4027" },
                { name: "Uwisan", zipCode: "4027" }
              ]
            },
            {
              code: "041402000",
              name: "Santa Rosa City",
              zipCode: "4026",
              barangays: [
                { name: "Aplaya", zipCode: "4026" },
                { name: "Balibago", zipCode: "4026" },
                { name: "Caingin", zipCode: "4026" },
                { name: "Dila", zipCode: "4026" },
                { name: "Dita", zipCode: "4026" },
              ]
            }
          ]
        },
        {
          code: "041600000",
          name: "Batangas",
          cities: [
            {
              code: "041601000",
              name: "Batangas City",
              zipCode: "4200",
              barangays: [
                { name: "Alangilan", zipCode: "4200" },
                { name: "Balagtas", zipCode: "4200" },
                { name: "Balete", zipCode: "4200" },
                { name: "Banaba Center", zipCode: "4200" },
                { name: "Banaba Ibaba", zipCode: "4200" },
              ]
            }
          ]
        },
        {
          code: "041700000",
          name: "Rizal",
          cities: [
            {
              code: "041701000",
              name: "Antipolo City",
              zipCode: "1870",
              barangays: [
                { name: "Bagong Nayon", zipCode: "1870" },
                { name: "Beverly Hills", zipCode: "1870" },
                { name: "Cupang", zipCode: "1870" },
                { name: "Dalig", zipCode: "1870" },
                { name: "De La Paz", zipCode: "1870" },
                { name: "Dela Paz", zipCode: "1870" },
                { name: "Inarawan", zipCode: "1870" },
                { name: "Mayamot", zipCode: "1870" },
                { name: "San Isidro", zipCode: "1870" },
                { name: "San Jose", zipCode: "1870" },
                { name: "San Juan", zipCode: "1870" },
                { name: "San Luis", zipCode: "1870" },
                { name: "San Roque", zipCode: "1870" },
                { name: "Santa Cruz", zipCode: "1870" },
                { name: "Santo Niño", zipCode: "1870" },
                { name: "Taktak", zipCode: "1870" }
              ]
            }
          ]
        },
        {
          code: "045800000",
          name: "Quezon",
          cities: [
            {
              code: "045801000",
              name: "Lucena City",
              zipCode: "4300",
              barangays: [
                { name: "Barangay 1", zipCode: "4300" },
                { name: "Barangay 2", zipCode: "4300" },
                { name: "Barangay 3", zipCode: "4300" },
                { name: "Barangay 4", zipCode: "4300" },
                { name: "Barangay 5", zipCode: "4300" },
              ]
            }
          ]
        }
      ]
    },
    {
      code: "1300000000",
      name: "National Capital Region (NCR)",
      provinces: [
        {
          code: "133900000",
          name: "Metro Manila",
          cities: [
            {
              code: "133901000",
              name: "Manila",
              zipCode: "1000",
              barangays: [
                { name: "Barangay 1, Zone 1 (Intramuros)", zipCode: "1002" },
                { name: "Barangay 2, Zone 1 (Intramuros)", zipCode: "1002" },
                { name: "Barangay 3, Zone 1 (Intramuros)", zipCode: "1002" },
                { name: "Barangay 4, Zone 1 (Intramuros)", zipCode: "1002" },
                { name: "Binondo", zipCode: "1006" },
                { name: "Ermita", zipCode: "1000" },
                { name: "Intramuros", zipCode: "1002" },
                { name: "Malate", zipCode: "1004" },
                { name: "Paco", zipCode: "1007" },
                { name: "Pandacan", zipCode: "1011" },
                { name: "Port Area", zipCode: "1018" },
                { name: "Quiapo", zipCode: "1001" },
                { name: "Sampaloc", zipCode: "1008" },
                { name: "San Andres", zipCode: "1004" },
                { name: "San Miguel", zipCode: "1005" },
                { name: "San Nicolas", zipCode: "1010" },
                { name: "Santa Ana", zipCode: "1009" },
                { name: "Santa Cruz", zipCode: "1003" },
                { name: "Santa Mesa", zipCode: "1016" },
                { name: "Tondo", zipCode: "1012" }
              ]
            },
            {
              code: "133902000",
              name: "Quezon City",
              zipCode: "1100",
              barangays: [
                { name: "Alicia", zipCode: "1102" },
                { name: "Amihan", zipCode: "1102" },
                { name: "Baesa", zipCode: "1106" },
                { name: "Bagong Lipunan ng Crame", zipCode: "1111" },
                { name: "Bagumbayan", zipCode: "1110" },
                { name: "Bagumbuhay", zipCode: "1110" },
                { name: "Balingasa", zipCode: "1115" },
                { name: "Balintawak", zipCode: "1106" },
                { name: "Batasan Hills", zipCode: "1126" },
                { name: "Bayanihan", zipCode: "1119" },
                { name: "Blue Ridge A", zipCode: "1109" },
                { name: "Blue Ridge B", zipCode: "1109" },
                { name: "Botocan", zipCode: "1104" },
                { name: "Bungad", zipCode: "1110" },
                { name: "Camp Aguinaldo", zipCode: "1110" },
                { name: "Central", zipCode: "1100" },
                { name: "Claro", zipCode: "1119" },
                { name: "Commonwealth", zipCode: "1121" },
                { name: "Cubao", zipCode: "1109" },
                { name: "Culiat", zipCode: "1128" },
                { name: "Damar", zipCode: "1115" },
                { name: "Diliman", zipCode: "1101" },
                { name: "Don Manuel", zipCode: "1113" },
                { name: "Dona Imelda", zipCode: "1113" },
                { name: "Dona Josefa", zipCode: "1113" },
                { name: "Duyan-Duyan", zipCode: "1103" },
                { name: "E. Rodriguez", zipCode: "1102" },
                { name: "East Triangle", zipCode: "1103" },
                { name: "Escolta", zipCode: "1110" },
                { name: "Fairview", zipCode: "1118" },
                { name: "Greater Lagro", zipCode: "1117" },
                { name: "Gulod", zipCode: "1117" },
                { name: "Horseshoe", zipCode: "1112" },
                { name: "Kalusugan", zipCode: "1111" },
                { name: "Kamuning", zipCode: "1103" },
                { name: "Kristong Hari", zipCode: "1112" },
                { name: "Krus Na Ligas", zipCode: "1101" },
                { name: "Libis", zipCode: "1110" },
                { name: "Lourdes", zipCode: "1114" },
                { name: "Loyola Heights", zipCode: "1108" },
                { name: "Maharlika", zipCode: "1114" },
                { name: "Malaya", zipCode: "1101" },
                { name: "Manresa", zipCode: "1108" },
                { name: "Mariblo", zipCode: "1105" },
                { name: "Marilag", zipCode: "1109" },
                { name: "Masambong", zipCode: "1105" },
                { name: "Matandang Balara", zipCode: "1119" },
                { name: "Milagrosa", zipCode: "1109" },
                { name: "N.S. Amoranto", zipCode: "1104" },
                { name: "Nayong Kanluran", zipCode: "1116" },
                { name: "New Era", zipCode: "1107" },
                { name: "North Fairview", zipCode: "1121" },
                { name: "Novaliches Proper", zipCode: "1123" },
                { name: "Obrero", zipCode: "1103" },
                { name: "Old Balara", zipCode: "1119" },
                { name: "Paang Bundok", zipCode: "1100" },
                { name: "Pag-ibig sa Nayon", zipCode: "1117" },
                { name: "Pajac", zipCode: "1117" },
                { name: "Paligsahan", zipCode: "1103" },
                { name: "Paltok", zipCode: "1105" },
                { name: "Paraiso", zipCode: "1114" },
                { name: "Phil-Am", zipCode: "1104" },
                { name: "Pinagkaisahan", zipCode: "1111" },
                { name: "Pinyahan", zipCode: "1100" },
                { name: "Project 6", zipCode: "1100" },
                { name: "Project 7", zipCode: "1105" },
                { name: "Project 8", zipCode: "1106" },
                { name: "Roxas", zipCode: "1103" },
                { name: "Sacred Heart", zipCode: "1103" },
                { name: "Saint Ignatius", zipCode: "1108" },
                { name: "San Agustin", zipCode: "1105" },
                { name: "San Antonio", zipCode: "1105" },
                { name: "San Bartolome", zipCode: "1116" },
                { name: "San Isidro Labrador", zipCode: "1116" },
                { name: "San Jose", zipCode: "1115" },
                { name: "San Martin de Porres", zipCode: "1111" },
                { name: "San Roque", zipCode: "1109" },
                { name: "Santa Lucia", zipCode: "1112" },
                { name: "Santa Monica", zipCode: "1112" },
                { name: "Santa Teresita", zipCode: "1114" },
                { name: "Santo Cristo", zipCode: "1105" },
                { name: "Santo Domingo", zipCode: "1114" },
                { name: "Santo Nino", zipCode: "1113" },
                { name: "Santol", zipCode: "1113" },
                { name: "Sienna", zipCode: "1114" },
                { name: "Silangan", zipCode: "1115" },
                { name: "Socorro", zipCode: "1109" },
                { name: "Tagumpay", zipCode: "1109" },
                { name: "Talayan", zipCode: "1104" },
                { name: "Tandang Sora", zipCode: "1116" },
                { name: "Tatalon", zipCode: "1113" },
                { name: "Teachers Village East", zipCode: "1101" },
                { name: "Teachers Village West", zipCode: "1101" },
                { name: "U.P. Campus", zipCode: "1101" },
                { name: "Ugong Norte", zipCode: "1110" },
                { name: "Unang Sigaw", zipCode: "1106" },
                { name: "UP Village", zipCode: "1101" },
                { name: "Valencia", zipCode: "1112" },
                { name: "Vasra", zipCode: "1128" },
                { name: "Veterans Village", zipCode: "1111" },
                { name: "West Triangle", zipCode: "1104" },
                { name: "White Plains", zipCode: "1110" }
              ]
            },
            {
              code: "133903000",
              name: "Makati City",
              zipCode: "1200",
              barangays: [
                { name: "Bangkal", zipCode: "1233" },
                { name: "Bel-Air", zipCode: "1209" },
                { name: "Carmona", zipCode: "1207" },
                { name: "Cembo", zipCode: "1205" },
                { name: "Comembo", zipCode: "1213" },
                { name: "Dasmariñas", zipCode: "1206" },
                { name: "East Rembo", zipCode: "1205" },
                { name: "Forbes Park", zipCode: "1220" },
                { name: "Guadalupe Nuevo", zipCode: "1212" },
                { name: "Guadalupe Viejo", zipCode: "1212" },
                { name: "Kasilawan", zipCode: "1235" },
                { name: "La Paz", zipCode: "1229" },
                { name: "Magallanes", zipCode: "1232" },
                { name: "Olympia", zipCode: "1207" },
                { name: "Palanan", zipCode: "1235" },
                { name: "Pembo", zipCode: "1205" },
                { name: "Pinagkaisahan", zipCode: "1235" },
                { name: "Pio del Pilar", zipCode: "1230" },
                { name: "Pitogo", zipCode: "1205" },
                { name: "Poblacion", zipCode: "1210" },
                { name: "Post Proper Northside", zipCode: "1205" },
                { name: "Post Proper Southside", zipCode: "1205" },
                { name: "Rizal", zipCode: "1205" },
                { name: "San Antonio", zipCode: "1203" },
                { name: "San Isidro", zipCode: "1234" },
                { name: "San Lorenzo", zipCode: "1223" },
                { name: "Santa Cruz", zipCode: "1205" },
                { name: "Singkamas", zipCode: "1204" },
                { name: "South Cembo", zipCode: "1205" },
                { name: "Tejeros", zipCode: "1210" },
                { name: "Urdaneta", zipCode: "1227" },
                { name: "Valenzuela", zipCode: "1227" },
                { name: "West Rembo", zipCode: "1205" }
              ]
            },
            {
              code: "133904000",
              name: "Pasig City",
              zipCode: "1600",
              barangays: [
                { name: "Bagong Ilog", zipCode: "1611" },
                { name: "Bagong Katipunan", zipCode: "1607" },
                { name: "Bambang", zipCode: "1600" },
                { name: "Buting", zipCode: "1603" },
                { name: "Caniogan", zipCode: "1605" },
                { name: "Dela Paz", zipCode: "1603" },
                { name: "Kalawaan", zipCode: "1605" },
                { name: "Kapasigan", zipCode: "1601" },
                { name: "Kapitolyo", zipCode: "1603" },
                { name: "Malinao", zipCode: "1602" },
                { name: "Manggahan", zipCode: "1611" },
                { name: "Maybunga", zipCode: "1607" },
                { name: "Oranbo", zipCode: "1603" },
                { name: "Palatiw", zipCode: "1606" },
                { name: "Pinagbuhatan", zipCode: "1602" },
                { name: "Rosario", zipCode: "1609" },
                { name: "Sagad", zipCode: "1600" },
                { name: "San Antonio", zipCode: "1600" },
                { name: "San Joaquin", zipCode: "1607" },
                { name: "San Jose", zipCode: "1601" },
                { name: "San Miguel", zipCode: "1610" },
                { name: "San Nicolas", zipCode: "1602" },
                { name: "Santa Cruz", zipCode: "1610" },
                { name: "Santa Lucia", zipCode: "1608" },
                { name: "Santa Rosa", zipCode: "1611" },
                { name: "Santo Tomas", zipCode: "1600" },
                { name: "Santolan", zipCode: "1610" },
                { name: "Sumilang", zipCode: "1607" },
                { name: "Ugong", zipCode: "1604" },
                { name: "Wawa", zipCode: "1607" }
              ]
            },
            {
              code: "133905000",
              name: "Caloocan City",
              zipCode: "1400",
              barangays: [
                { name: "Bagong Silang", zipCode: "1428" },
                { name: "Bagumbong", zipCode: "1441" },
                { name: "Camarin", zipCode: "1422" },
                { name: "Grace Park East", zipCode: "1403" },
                { name: "Grace Park West", zipCode: "1403" },
              ]
            }
          ]
        }
      ]
    }
    // Additional regions can be added here following the same structure
  ]
};

// Utility functions
export const getAllRegions = (): Region[] => {
  return philippinesData.regions;
};

export const getProvincesByRegion = (regionCode: string): Province[] => {
  const region = philippinesData.regions.find(r => r.code === regionCode);
  return region ? region.provinces : [];
};

export const getCitiesByProvince = (regionCode: string, provinceCode: string): City[] => {
  const region = philippinesData.regions.find(r => r.code === regionCode);
  if (!region) return [];
  
  const province = region.provinces.find(p => p.code === provinceCode);
  return province ? province.cities : [];
};

export const getBarangaysByCity = (regionCode: string, provinceCode: string, cityCode: string): Barangay[] => {
  const region = philippinesData.regions.find(r => r.code === regionCode);
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