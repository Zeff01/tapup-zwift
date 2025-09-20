"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeliveryAddress } from "@/types/types";
import {
  getAllRegions,
  getProvincesByRegion,
  getCitiesByProvinceOrRegion,
  getBarangaysByCity,
  getZipCodeByCity,
  regionHasProvinces,
  PSGCRegion,
  PSGCProvince,
  PSGCCity,
  PSGCBarangay,
} from "@/lib/services/philippines-address.service";
import { Loader2 } from "lucide-react";

interface CascadingAddressFormAPIProps {
  address?: Partial<DeliveryAddress>;
  onAddressChange: (address: Partial<DeliveryAddress>) => void;
  namePrefix?: string;
}

export const CascadingAddressFormAPI: React.FC<CascadingAddressFormAPIProps> = ({
  address = {},
  onAddressChange,
  namePrefix = "address"
}) => {
  const [regions, setRegions] = useState<PSGCRegion[]>([]);
  const [provinces, setProvinces] = useState<PSGCProvince[]>([]);
  const [cities, setCities] = useState<PSGCCity[]>([]);
  const [barangays, setBarangays] = useState<PSGCBarangay[]>([]);
  
  const [selectedRegion, setSelectedRegion] = useState(address.regionCode || "");
  const [selectedProvince, setSelectedProvince] = useState(address.provinceCode || "");
  const [selectedCity, setSelectedCity] = useState(address.cityCode || "");
  const [selectedBarangay, setSelectedBarangay] = useState(address.barangay || "");
  
  // Track if component is initializing to prevent loops
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [loading, setLoading] = useState({
    regions: false,
    provinces: false,
    cities: false,
    barangays: false,
  });

  // Use ref to access current address without causing re-renders
  const addressRef = useRef(address);
  addressRef.current = address;

  // Update parent component when address changes
  const updateAddress = useCallback((updates: Partial<DeliveryAddress>) => {
    const updatedAddress = { ...addressRef.current, ...updates };
    onAddressChange(updatedAddress);
  }, [onAddressChange]);

  // Load regions on mount
  useEffect(() => {
    const loadRegions = async () => {
      setLoading(prev => ({ ...prev, regions: true }));
      try {
        const data = await getAllRegions();
        setRegions(data);
      } finally {
        setLoading(prev => ({ ...prev, regions: false }));
      }
    };
    loadRegions();
  }, []);

  // Load provinces when region changes
  useEffect(() => {
    const loadProvinces = async () => {
      if (!selectedRegion) {
        setProvinces([]);
        setSelectedProvince("");
        setCities([]);
        setSelectedCity("");
        setBarangays([]);
        setSelectedBarangay("");
        return;
      }

      setLoading(prev => ({ ...prev, provinces: true }));
      try {
        // Check if region has provinces (NCR doesn't)
        if (!regionHasProvinces(selectedRegion)) {
          // Load cities directly for NCR
          setProvinces([]);
          setSelectedProvince("");
          
          const citiesData = await getCitiesByProvinceOrRegion(selectedRegion);
          setCities(citiesData);
        } else {
          const provincesData = await getProvincesByRegion(selectedRegion);
          setProvinces(provincesData);
          
          // Clear dependent fields when region changes
          setSelectedProvince("");
          setCities([]);
          setSelectedCity("");
          setBarangays([]);
          setSelectedBarangay("");
        }
      } finally {
        setLoading(prev => ({ ...prev, provinces: false }));
      }
    };
    
    loadProvinces();
  }, [selectedRegion]);

  // Load cities when province changes
  useEffect(() => {
    const loadCities = async () => {
      // For NCR, cities are already loaded
      if (selectedRegion && !regionHasProvinces(selectedRegion)) {
        return;
      }

      if (!selectedProvince) {
        setCities([]);
        setSelectedCity("");
        setBarangays([]);
        setSelectedBarangay("");
        return;
      }

      setLoading(prev => ({ ...prev, cities: true }));
      try {
        const citiesData = await getCitiesByProvinceOrRegion(selectedRegion, selectedProvince);
        setCities(citiesData);
        
        // Clear dependent fields when province changes
        setSelectedCity("");
        setBarangays([]);
        setSelectedBarangay("");
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };
    
    loadCities();
  }, [selectedRegion, selectedProvince]);

  // Load barangays when city changes
  useEffect(() => {
    const loadBarangays = async () => {
      if (!selectedCity) {
        setBarangays([]);
        setSelectedBarangay("");
        return;
      }

      setLoading(prev => ({ ...prev, barangays: true }));
      try {
        const barangaysData = await getBarangaysByCity(selectedCity);
        setBarangays(barangaysData);
        
        // Clear barangay when city changes
        setSelectedBarangay("");
      } finally {
        setLoading(prev => ({ ...prev, barangays: false }));
      }
    };
    
    loadBarangays();
  }, [selectedCity]);

  // Auto-fill ZIP code when city is selected
  useEffect(() => {
    if (selectedCity && cities.length > 0) {
      const city = cities.find(c => c.code === selectedCity);
      if (city) {
        const zipCode = getZipCodeByCity(city.name);
        updateAddress({ zipCode });
      }
    }
  }, [selectedCity, cities, updateAddress]);

  const handleRegionChange = (regionCode: string) => {
    setSelectedRegion(regionCode);
    const region = regions.find(r => r.code === regionCode);
    
    updateAddress({
      regionCode,
      regionName: region?.name || ""
    });
  };

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    const province = provinces.find(p => p.code === provinceCode);
    
    updateAddress({
      provinceCode,
      provinceName: province?.name || "",
      state: province?.name || "" // Update legacy field
    });
  };

  const handleCityChange = (cityCode: string) => {
    setSelectedCity(cityCode);
    const city = cities.find(c => c.code === cityCode);
    
    updateAddress({
      cityCode,
      cityName: city?.name || "",
      city: city?.name || "" // Update legacy field
    });
  };

  const handleBarangayChange = (barangayCode: string) => {
    const barangay = barangays.find(b => b.code === barangayCode);
    setSelectedBarangay(barangayCode);
    updateAddress({ barangay: barangay?.name || "" });
  };

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    updateAddress({ [field]: value });
  };

  const showProvinceField = selectedRegion && regionHasProvinces(selectedRegion);
  const showCityField = selectedRegion && (showProvinceField ? selectedProvince : true);

  return (
    <div className="space-y-4">
      {/* Country (Read-only for now) */}
      <div>
        <Label htmlFor={`${namePrefix}-country`}>Country</Label>
        <Input
          id={`${namePrefix}-country`}
          value="Philippines"
          disabled
          className="bg-gray-50 text-gray-600"
        />
      </div>

      {/* Region Dropdown */}
      <div>
        <Label htmlFor={`${namePrefix}-region`}>
          Region <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedRegion}
          onValueChange={handleRegionChange}
          disabled={loading.regions}
        >
          <SelectTrigger>
            {loading.regions ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading regions...
              </div>
            ) : (
              <SelectValue placeholder="Select Region" />
            )}
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.code} value={region.code}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Province Dropdown (not shown for NCR) */}
      {showProvinceField && (
        <div>
          <Label htmlFor={`${namePrefix}-province`}>
            Province <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedProvince}
            onValueChange={handleProvinceChange}
            disabled={!selectedRegion || loading.provinces}
          >
            <SelectTrigger>
              {loading.provinces ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading provinces...
                </div>
              ) : (
                <SelectValue placeholder={selectedRegion ? "Select Province" : "Select Region first"} />
              )}
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province.code} value={province.code}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* City Dropdown */}
      {showCityField && (
        <div>
          <Label htmlFor={`${namePrefix}-city`}>
            City/Municipality <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedCity}
            onValueChange={handleCityChange}
            disabled={!showCityField || loading.cities}
          >
            <SelectTrigger>
              {loading.cities ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading cities...
                </div>
              ) : (
                <SelectValue 
                  placeholder={
                    !selectedRegion ? "Select Region first" :
                    showProvinceField && !selectedProvince ? "Select Province first" :
                    "Select City/Municipality"
                  } 
                />
              )}
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.code} value={city.code}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Barangay Dropdown */}
      <div>
        <Label htmlFor={`${namePrefix}-barangay`}>
          Barangay <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedBarangay}
          onValueChange={handleBarangayChange}
          disabled={!selectedCity || loading.barangays}
        >
          <SelectTrigger>
            {loading.barangays ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading barangays...
              </div>
            ) : (
              <SelectValue placeholder={selectedCity ? "Select Barangay" : "Select City first"} />
            )}
          </SelectTrigger>
          <SelectContent>
            {barangays.map((barangay) => (
              <SelectItem key={barangay.code} value={barangay.code}>
                {barangay.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Street Address */}
      <div>
        <Label htmlFor={`${namePrefix}-street`}>
          Street Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id={`${namePrefix}-street`}
          placeholder="House/Unit Number, Building Name, Street Name"
          value={address.street || ""}
          onChange={(e) => handleInputChange("street", e.target.value)}
        />
      </div>

      {/* ZIP Code */}
      <div>
        <Label htmlFor={`${namePrefix}-zipCode`}>ZIP Code</Label>
        <Input
          id={`${namePrefix}-zipCode`}
          placeholder="0000"
          value={address.zipCode || ""}
          onChange={(e) => handleInputChange("zipCode", e.target.value)}
          maxLength={4}
        />
      </div>
    </div>
  );
};

// Hook to validate Philippines address
export const usePhilippinesAddressValidation = (address: Partial<DeliveryAddress>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!address.regionCode) {
      newErrors.region = "Region is required";
    }

    // Province is not required for NCR
    const isNCR = address.regionCode === "1300000000";
    if (!isNCR && !address.provinceCode) {
      newErrors.province = "Province is required";
    }

    if (!address.cityCode) {
      newErrors.city = "City/Municipality is required";
    }

    if (!address.barangay) {
      newErrors.barangay = "Barangay is required";
    }

    if (!address.street?.trim()) {
      newErrors.street = "Street address is required";
    }

    setErrors(newErrors);
  }, [address]);

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};