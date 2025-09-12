"use client";

import { useState } from "react";
import { MapPin, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/phone-input";
import { DeliveryAddress } from "@/types/types";
import { manageUserDeliveryAddress } from "@/lib/firebase/actions/user.action";
import { toast } from "react-toastify";

interface AddressManagementProps {
  userId: string;
  addresses: DeliveryAddress[];
  selectedAddressId: string;
  onAddressChange: (addressId: string) => void;
  onAddressesUpdate: (addresses: DeliveryAddress[]) => void;
}

export default function AddressManagement({
  userId,
  addresses,
  selectedAddressId,
  onAddressChange,
  onAddressesUpdate,
}: AddressManagementProps) {
  const [isAddressModalLoading, setIsAddressModalLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleAddAddress = async () => {
    if (
      newAddress.firstName.trim() &&
      newAddress.lastName.trim() &&
      newAddress.phone.trim() &&
      newAddress.name.trim() &&
      newAddress.street.trim() &&
      newAddress.city.trim() &&
      newAddress.state.trim() &&
      newAddress.zipCode.trim()
    ) {
      setIsAddressModalLoading(true);
      const address: DeliveryAddress = {
        id: Date.now().toString(),
        ...newAddress,
      };
      await manageUserDeliveryAddress(userId, "add", address);
      
      const updatedAddresses = [...addresses, address];
      onAddressesUpdate(updatedAddresses);
      
      if (addresses.length === 0) {
        onAddressChange(address.id);
      }
      
      resetAddressForm();
      toast.success("Added new address");
    }
  };

  const handleEditAddress = async () => {
    if (!editingAddressId) return;

    const addressIndex = addresses.findIndex((a) => a.id === editingAddressId);
    if (addressIndex === -1) return;

    const updatedAddress = {
      id: editingAddressId,
      ...newAddress,
    };

    setIsAddressModalLoading(true);
    await manageUserDeliveryAddress(userId, "update", updatedAddress, addressIndex);

    onAddressesUpdate(
      addresses.map((a) => (a.id === editingAddressId ? updatedAddress : a))
    );
    resetAddressForm();
    toast.success("Address updated successfully");
  };

  const handleDeleteAddress = async (addressId: string) => {
    const addressIndex = addresses.findIndex((a) => a.id === addressId);
    if (addressIndex === -1) return;

    await manageUserDeliveryAddress(
      userId,
      "delete",
      addresses[addressIndex],
      addressIndex
    );

    const updatedAddresses = addresses.filter((a) => a.id !== addressId);
    onAddressesUpdate(updatedAddresses);
    
    if (selectedAddressId === addressId && updatedAddresses.length > 0) {
      onAddressChange(updatedAddresses[0].id);
    }
  };

  const resetAddressForm = () => {
    setNewAddress({
      firstName: "",
      lastName: "",
      phone: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setIsAddressModalOpen(false);
    setEditingAddressId(null);
    setIsEditMode(false);
    setIsAddressModalLoading(false);
  };

  const startEditing = (address: DeliveryAddress) => {
    setNewAddress({
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setEditingAddressId(address.id);
    setIsEditMode(true);
    setIsAddressModalOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </CardTitle>
          <Dialog
            open={isAddressModalOpen}
            onOpenChange={(isAddressModalOpen) => {
              setIsAddressModalOpen(isAddressModalOpen);
              if (!isAddressModalOpen) {
                resetAddressForm();
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Address" : "Add New Delivery Address"}
                </DialogTitle>
                <DialogDescription>
                  {isEditMode
                    ? "Update your delivery address details."
                    : "Enter the details for your new delivery address."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex gap-4">
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={newAddress.firstName}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          firstName: e.target.value,
                        })
                      }
                      className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                      disabled={isAddressModalLoading}
                    />
                  </div>
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={newAddress.lastName}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          lastName: e.target.value,
                        })
                      }
                      className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                      disabled={isAddressModalLoading}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    id="phone"
                    defaultCountry="PH"
                    placeholder="0911 111 1111"
                    value={newAddress.phone}
                    onChange={(value) =>
                      setNewAddress({
                        ...newAddress,
                        phone: value,
                      })
                    }
                    className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                    disabled={isAddressModalLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address-name">Address Name</Label>
                  <Input
                    id="address-name"
                    placeholder="e.g., Home, Office"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        name: e.target.value,
                      })
                    }
                    className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                    disabled={isAddressModalLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="123 Main Street"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        street: e.target.value,
                      })
                    }
                    className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                    disabled={isAddressModalLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Manila"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          city: e.target.value,
                        })
                      }
                      className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                      disabled={isAddressModalLoading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">Province</Label>
                    <Input
                      id="state"
                      placeholder="Metro Manila"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          state: e.target.value,
                        })
                      }
                      className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                      disabled={isAddressModalLoading}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="1000"
                    value={newAddress.zipCode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="placeholder:text-slate-500/60 dark:placeholder:text-slate-500"
                    disabled={isAddressModalLoading}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={resetAddressForm}
                  disabled={isAddressModalLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={isEditMode ? handleEditAddress : handleAddAddress}
                  disabled={isAddressModalLoading}
                >
                  {isEditMode ? (
                    isAddressModalLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                      </>
                    ) : (
                      "Update"
                    )
                  ) : isAddressModalLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Address
                    </>
                  ) : (
                    "Add Address"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddressId} onValueChange={onAddressChange}>
          <div className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-start space-x-3">
                <RadioGroupItem
                  value={address.id}
                  id={address.id}
                  className="mt-1"
                />
                <Label
                  htmlFor={address.id}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">
                      {address.firstName} {address.lastName}
                    </span>
                    {address.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>{address.name}</span>
                    <p>{address.phone}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => startEditing(address)}
                    className="border-none hover:scale-110"
                  >
                    <Edit2 className="size-4 text-blue-500" />
                  </Button>
                  <Button
                    className="border-none hover:scale-110"
                    onClick={() => handleDeleteAddress(address.id)}
                    variant="outline"
                    size="icon-sm"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}