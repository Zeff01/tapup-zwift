"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  UserIcon,
  Package,
  Trash2,
  Edit,
  Edit2,
  Delete,
  Loader2,
} from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useUserContext } from "@/providers/user-provider";
import { CustomerType, DeliveryAddress, TransactionType } from "@/types/types";
import {
  addCard,
  createCustomerAndRecurringPlanBundle,
  createTransaction,
  manageUserDeliveryAddress,
  updateUserInfo,
} from "@/lib/firebase/actions/user.action";
import { useCart } from "@/hooks/use-cart-v2";
import { toast } from "react-toastify";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phone-input";

interface CheckoutUser {
  name: string;
  email: string;
  avatar: string;
}

export default function CheckoutForm() {
  const { user, isLoading: isUserLoading } = useUserContext();

  const { items, totalItems, clearCart } = useCart();
  const [isAddressModalLoading, setIsAddressModalLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);

  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);

  useEffect(() => {
    if (user?.deliveryAddresses && user?.deliveryAddresses.length > 0) {
      console.log(user?.deliveryAddresses);
      setAddresses(user.deliveryAddresses);
      setSelectedAddressId(user.deliveryAddresses[0].id);
    }
  }, [user?.deliveryAddresses]);

  const currentUser: CheckoutUser = {
    name: user?.firstName + " " + user?.lastName || "John Doe",
    email: user?.email || "john.doe@example.com",
    avatar: user?.profilePictureUrl || "/default-user.png",
  };

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
      await manageUserDeliveryAddress(user?.uid as string, "add", address);
      setAddresses((prev) => {
        if (prev.length === 0) {
          setSelectedAddressId(address.id);
        }
        return [...addresses, address];
      });
      resetAddressForm();
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
    await manageUserDeliveryAddress(
      user?.uid as string,
      "update",
      updatedAddress,
      addressIndex
    );

    setAddresses(
      addresses.map((a) => (a.id === editingAddressId ? updatedAddress : a))
    );
    resetAddressForm();
  };

  const handleDeleteAddress = async (addressId: string) => {
    const addressIndex = addresses.findIndex((a) => a.id === addressId);
    if (addressIndex === -1) return;

    await manageUserDeliveryAddress(
      user?.uid as string,
      "delete",
      addresses[addressIndex],
      addressIndex
    );

    setAddresses(addresses.filter((a) => a.id !== addressId));
    if (selectedAddressId === addressId) {
      setSelectedAddressId(addresses[0]?.id || "");
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

  const handlePlaceOrder = async () => {
    if (!items || items.length === 0) {
      toast.error("No items in the cart");
      return;
    }

    if (addresses.length === 0) {
      toast.error("Please Add a Delivery Address");
      return;
    }

    setIsLoadingTransaction(true);

    const referenceId = `customer-${user?.email}-${new Date().toISOString()}`;

    const selectedAddressV2 = addresses.find(
      (address) => address.id === selectedAddressId
    );

    const customerData: CustomerType = {
      reference_id: referenceId,
      type: "INDIVIDUAL",
      email: user?.email,
      mobile_number: user?.number ?? selectedAddressV2?.phone,
      individual_detail: {
        given_names: user?.firstName ?? selectedAddressV2?.firstName ?? "",
        surname: user?.lastName ?? selectedAddressV2?.lastName,
      },
    };

    const cardTotal = () =>
      items.reduce(
        (total, item) =>
          total + (item.subscriptionPlan?.price ?? 0) * item.quantity,
        0
      );
    const addCardPromises = items.flatMap((item) => {
      return Array.from({ length: item.quantity }, () =>
        addCard({ id: item.id, name: item.name })
      );
    });

    const cardResults = await Promise.all(addCardPromises);
    // TODO: Need to handle different subscription-plan for each card.
    const recurringPlan = await createCustomerAndRecurringPlanBundle(
      customerData,
      items[0].subscriptionPlan!,
      cardResults,
      cardTotal(),
      user?.uid
    );

    const newCards = items.flatMap((item) => {
      return Array.from({ length: item.quantity }, () => ({
        id: item.id,
        name: item.name,
      }));
    });

    const transactionData: TransactionType = {
      amount: cardTotal(),
      cards: cardResults.map((cardIds, i) => ({
        id: cardIds,
        name: newCards[i].name,
      })),
      receiver: {
        customerId: recurringPlan.customer.id,
        customerName:
          (user?.firstName || selectedAddressV2?.firstName) +
          " " +
          (user?.lastName || selectedAddressV2?.lastName),
        customerEmail: user?.email ?? "",
        customerPhone: user?.number ?? selectedAddressV2?.phone ?? "",
        customerAddress:
          selectedAddressV2?.street +
          ", " +
          selectedAddressV2?.city +
          ", " +
          selectedAddressV2?.state +
          ", " +
          selectedAddressV2?.zipCode +
          ", " +
          "Philippines",
      },
      status: "pending",
    };

    await createTransaction(transactionData);

    if (!user?.firstName || !user?.lastName || !user?.number) {
      await updateUserInfo({
        userId: user?.uid as string,
        firstName: selectedAddressV2?.firstName || "",
        lastName: selectedAddressV2?.lastName || "",
        phoneNumber: selectedAddressV2?.phone || "",
      });
    }

    setIsLoadingTransaction(false);

    clearCart();

    window.location.href = recurringPlan.recurringPlan.actions?.[0]?.url;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Image
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                    width={10}
                    height={10}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {" "}
                      {isUserLoading ? (
                        <Skeleton className="h-4 w-44" />
                      ) : (
                        currentUser.name
                      )}{" "}
                    </span>
                    <span className="text-sm text-gray-600">
                      {isUserLoading ? (
                        <Skeleton className="h-4 w-36 mt-2" />
                      ) : (
                        currentUser.email
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                          {isEditMode
                            ? "Edit Address"
                            : "Add New Delivery Address"}
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
                          onClick={
                            isEditMode ? handleEditAddress : handleAddAddress
                          }
                          disabled={isAddressModalLoading}
                        >
                          {isEditMode ? (
                            isAddressModalLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Updating Address
                              </>
                            ) : (
                              "Edit Address"
                            )
                          ) : isAddressModalLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
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
                <RadioGroup
                  value={selectedAddressId}
                  onValueChange={setSelectedAddressId}
                >
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-start space-x-3"
                      >
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
                        <div className="flex items-center gap-2 ">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => startEditing(address)}
                            className="border-none hover:scale-110 "
                          >
                            <Edit2 className="size-4 text-blue-500 " />
                          </Button>
                          <Button
                            className="border-none hover:scale-110 "
                            onClick={() => handleDeleteAddress(address.id)}
                            variant="outline"
                            size="icon-sm"
                          >
                            <Trash2 className="size-4 text-red-500  " />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}

            {/* Order Summary */}

            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs">
                        PHP{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />
                {(() => {
                  const total = items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>PHP{total.toFixed(2) || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>PHP{"0.00"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>PHP{"0.00"}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>PHP{total.toFixed(2) || "0.00"}</span>
                      </div>
                    </div>
                  );
                })()}

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoadingTransaction || (totalItems === 0)}
                  className="w-full bg-greenColor  text-white font-medium hover:bg-greenColor/80 "
                >
                  {isLoadingTransaction ? (
                    <>
                      Placing Order{" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
