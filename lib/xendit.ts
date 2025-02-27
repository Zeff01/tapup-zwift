import { AxiosError } from "axios";
import { xenditClient } from "./axios";
import { CustomerType, CreateInvoiceType, RecurringPlanType } from "@/types/types";

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true;
};

export const createCustomer = async (customerData: CustomerType) => {
  try {
    console.log("Sending customer data to Xendit:", JSON.stringify(customerData, null, 2));

    const { data } = await xenditClient.post("/customers", customerData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Xendit API Error:", JSON.stringify(error.response?.data, null, 2) || error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
};

export const createInvoice = async (invoiceData: CreateInvoiceType) => {
  try {
    const { data } = await xenditClient.post("/v2/invoices", invoiceData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Xendit API Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
};

export const createRecurringPlan = async (recurringPlanData: RecurringPlanType) => {
  try {
    const { data } = await xenditClient.post("/recurring/plans", recurringPlanData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Xendit API Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Unexpected Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  }
};
