"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  getAllRegions,
  getProvincesByRegion,
  getCitiesByProvince,
  getBarangaysByCity,
  getZipCodeByBarangay,
  Region,
  Province,
  City,
  Barangay
} from "@/lib/data/philippines-comprehensive";
import { DeliveryAddress } from "@/types/types";

interface CascadingAddressFormProps {
  address?: Partial<DeliveryAddress>;
  onAddressChange: (address: Partial<DeliveryAddress>) => void;
  namePrefix?: string; // For form field names
}

export const CascadingAddressForm: React.FC<CascadingAddressFormProps> = ({
  address = {},
  onAddressChange,
  namePrefix = "address"
}) => {
  const [regions] = useState<Region[]>(getAllRegions());
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  
  const [selectedRegion, setSelectedRegion] = useState(address.regionCode || "");
  const [selectedProvince, setSelectedProvince] = useState(address.provinceCode || "");
  const [selectedCity, setSelectedCity] = useState(address.cityCode || "");
  const [selectedBarangay, setSelectedBarangay] = useState(address.barangay || "");

  // Update parent component when address changes
  const updateAddress = useCallback((updates: Partial<DeliveryAddress>) => {
    const updatedAddress = { ...address, ...updates };
    onAddressChange(updatedAddress);
  }, [address, onAddressChange]);

  // Load provinces when region changes
  useEffect(() => {
    if (selectedRegion) {
      const regionProvinces = getProvincesByRegion(selectedRegion);
      setProvinces(regionProvinces);
      
      // Clear province, city and barangay if region changed
      if (selectedRegion !== address.regionCode) {
        setSelectedProvince("");
        setSelectedCity("");
        setSelectedBarangay("");
        setCities([]);
        setBarangays([]);
      }
    } else {
      setProvinces([]);
      setSelectedProvince("");
      setSelectedCity("");
      setSelectedBarangay("");
      setCities([]);
      setBarangays([]);
    }
  }, [selectedRegion, address.regionCode]);

  // Load cities when province changes
  useEffect(() => {
    if (selectedRegion && selectedProvince) {
      const provinceCities = getCitiesByProvince(selectedRegion, selectedProvince);
      setCities(provinceCities);
      
      // Clear city and barangay if province changed
      if (selectedProvince !== address.provinceCode) {
        setSelectedCity("");
        setSelectedBarangay("");
        setBarangays([]);
      }
    } else {
      setCities([]);
      setSelectedCity("");
      setSelectedBarangay("");
      setBarangays([]);
    }
  }, [selectedRegion, selectedProvince, address.provinceCode]);

  // Load barangays when city changes
  useEffect(() => {
    if (selectedRegion && selectedProvince && selectedCity) {
      const cityBarangays = getBarangaysByCity(selectedRegion, selectedProvince, selectedCity);
      setBarangays(cityBarangays);
      
      // Clear barangay if city changed
      if (selectedCity !== address.cityCode) {
        setSelectedBarangay("");
      }
    } else {
      setBarangays([]);
      setSelectedBarangay("");
    }
  }, [selectedRegion, selectedProvince, selectedCity, address.cityCode]);

  // Auto-fill ZIP code when barangay changes
  useEffect(() => {
    if (selectedRegion && selectedProvince && selectedCity && selectedBarangay) {
      const zipCode = getZipCodeByBarangay(selectedRegion, selectedProvince, selectedCity, selectedBarangay);
      if (zipCode) {
        updateAddress({ zipCode });
      }
    }
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay, updateAddress]);

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    const province = provinces.find(p => p.code === provinceCode);
    
    updateAddress({
      provinceCode,
      provinceName: province?.name || "",
      cityCode: "",
      cityName: "",
      city: "", // Update legacy field
      state: province?.name || "", // Update legacy field
      barangay: ""
    });
  };

  const handleCityChange = (cityCode: string) => {
    setSelectedCity(cityCode);
    const city = cities.find(c => c.code === cityCode);
    
    updateAddress({
      cityCode,
      cityName: city?.name || "",
      city: city?.name || "", // Update legacy field
      barangay: ""
    });
  };

  const handleBarangayChange = (barangay: string) => {
    setSelectedBarangay(barangay);
    updateAddress({ barangay });
  };

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    updateAddress({ [field]: value });
  };

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
          onValueChange={(regionCode) => {
            setSelectedRegion(regionCode);
            const region = regions.find(r => r.code === regionCode);
            updateAddress({
              regionCode,
              regionName: region?.name || "",
              provinceCode: "",
              provinceName: "",
              cityCode: "",
              cityName: "",
              city: "", // Update legacy field
              state: "", // Update legacy field
              barangay: ""
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Region" />
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

      {/* Province Dropdown */}
      <div>
        <Label htmlFor={`${namePrefix}-province`}>
          Province <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedProvince}
          onValueChange={handleProvinceChange}
          disabled={!selectedRegion}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedRegion ? "Select Province" : "Select Region first"} />
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

      {/* City Dropdown */}
      <div>
        <Label htmlFor={`${namePrefix}-city`}>
          City/Municipality <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedCity}
          onValueChange={handleCityChange}
          disabled={!selectedProvince}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedProvince ? "Select City/Municipality" : "Select Province first"} />
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

      {/* Barangay Dropdown */}
      <div>
        <Label htmlFor={`${namePrefix}-barangay`}>
          Barangay <span className="text-red-500">*</span>
        </Label>
        <Select
          value={selectedBarangay}
          onValueChange={handleBarangayChange}
          disabled={!selectedCity}
        >
          <SelectTrigger>
            <SelectValue placeholder={selectedCity ? "Select Barangay" : "Select City first"} />
          </SelectTrigger>
          <SelectContent>
            {barangays.map((barangay) => (
              <SelectItem key={barangay.name} value={barangay.name}>
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
          placeholder="1234"
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

    if (!address.provinceCode) {
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