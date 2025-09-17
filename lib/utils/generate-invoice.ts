import { jsPDF } from "jspdf";
import { Order } from "@/types/types";
import { format } from "date-fns";

export function generateInvoice(order: Order, userName?: string) {
  const doc = new jsPDF();
  
  // Company header
  doc.setFontSize(20);
  doc.text("TapUp", 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Digital Business Card Solutions", 20, 27);
  
  // Invoice title
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("INVOICE", 150, 20);
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice Number: INV-${order.orderId.slice(-8).toUpperCase()}`, 150, 30);
  doc.text(`Date: ${format(new Date(order.orderDate), "MMM dd, yyyy")}`, 150, 36);
  
  // Draw a line
  doc.line(20, 45, 190, 45);
  
  // Bill To section
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Bill To:", 20, 55);
  
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(order.shippingInfo.recipientName || userName || "Customer", 20, 62);
  doc.text(order.shippingInfo.contactNumber || "", 20, 68);
  if (order.shippingInfo.address) {
    const address = order.shippingInfo.address;
    doc.text(`${address.street}`, 20, 74);
    if (address.barangay) {
      doc.text(`${address.barangay}`, 20, 80);
    }
    doc.text(`${address.city}, ${address.state} ${address.postalCode}`, 20, 86);
    doc.text("Philippines", 20, 92);
  }
  
  // Order details section
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Order Details:", 20, 110);
  
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Order ID: ${order.orderId}`, 20, 117);
  doc.text(`Status: ${order.status}`, 20, 123);
  doc.text(`Payment Method: ${order.paymentMethod || "Xendit"}`, 20, 129);
  
  // Items table header
  const tableTop = 145;
  doc.setFont(undefined, "bold");
  doc.text("Item", 20, tableTop);
  doc.text("Qty", 120, tableTop);
  doc.text("Price", 140, tableTop);
  doc.text("Total", 170, tableTop);
  
  // Draw table header line
  doc.line(20, tableTop + 2, 190, tableTop + 2);
  
  // Items
  doc.setFont(undefined, "normal");
  let yPosition = tableTop + 10;
  
  order.items.forEach((item) => {
    const itemName = item.product?.title || "Digital Card";
    const quantity = item.quantity || 1;
    const price = item.product?.price || 0;
    const total = quantity * price;
    
    // Wrap long item names
    const wrappedText = doc.splitTextToSize(itemName, 90);
    doc.text(wrappedText, 20, yPosition);
    doc.text(quantity.toString(), 120, yPosition);
    doc.text(`₱${price.toFixed(2)}`, 140, yPosition);
    doc.text(`₱${total.toFixed(2)}`, 170, yPosition);
    
    yPosition += wrappedText.length * 5 + 5;
  });
  
  // Draw line before totals
  doc.line(20, yPosition + 5, 190, yPosition + 5);
  
  // Totals
  yPosition += 15;
  doc.text("Subtotal:", 140, yPosition);
  doc.text(`₱${order.totalAmount.toFixed(2)}`, 170, yPosition);
  
  yPosition += 7;
  doc.text("Shipping:", 140, yPosition);
  doc.text(`₱${(order.deliveryOption?.shippingFee || 0).toFixed(2)}`, 170, yPosition);
  
  // Grand total
  yPosition += 7;
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  const grandTotal = order.totalAmount + (order.deliveryOption?.shippingFee || 0);
  doc.text("Total:", 140, yPosition);
  doc.text(`₱${grandTotal.toFixed(2)}`, 170, yPosition);
  
  // Footer
  doc.setFont(undefined, "normal");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Thank you for your business!", 105, 270, { align: "center" });
  doc.text("For questions about this invoice, please contact support@tapup.com", 105, 275, { align: "center" });
  
  // Save the PDF
  doc.save(`TapUp_Invoice_${order.orderId.slice(-8).toUpperCase()}.pdf`);
}