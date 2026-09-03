import { Order } from '../types';

export const ADMIN_EMAIL = 'esaali391@gmail.com';
export const ADMIN_PHONE = '01854774406';
export const WHATSAPP_NUMBER = '8801854774406';

/**
 * Dispatches an email notification with full order details to esaali391@gmail.com
 * Uses FormSubmit AJAX service for direct inbox delivery without exposing secrets.
 */
export async function sendOrderEmailNotification(order: Order): Promise<boolean> {
  try {
    const itemsSummary = order.items
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.productTitle} | Qty: ${item.quantity} | Unit: ৳${item.price.toLocaleString()} | Subtotal: ৳${item.total.toLocaleString()}`
      )
      .join('\n');

    const payload = {
      _subject: `📦 NEW ORDER: ${order.orderNumber} - ৳${order.total.toLocaleString()} (${order.customerName})`,
      Order_Number: order.orderNumber,
      Order_Date: new Date(order.createdAt).toLocaleString(),
      Customer_Name: order.customerName,
      Phone_Number: order.phone,
      Delivery_Address: order.address,
      Shipping_Zone:
        order.shippingZone === 'inside_dhaka'
          ? 'Inside Dhaka (৳70)'
          : 'Outside Dhaka (৳130)',
      Payment_Method:
        order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod,
      Items_Purchased: itemsSummary,
      Subtotal: `৳${order.subtotal.toLocaleString()}`,
      Delivery_Charge: `৳${order.shippingCost.toLocaleString()}`,
      Discount:
        order.discount > 0
          ? `৳${order.discount.toLocaleString()} (Coupon: ${order.couponCode || 'Active'})`
          : 'None',
      Grand_Total: `৳${order.total.toLocaleString()}`,
      Customer_Notes: order.notes || 'None provided',
      _replyto: 'esaali391@gmail.com'
    };

    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`[OrderNotification] Order copy email dispatched to ${ADMIN_EMAIL}`);
      return true;
    } else {
      console.warn('[OrderNotification] FormSubmit status:', response.status);
      return false;
    }
  } catch (err) {
    console.error('[OrderNotification] Failed to send order email:', err);
    return false;
  }
}

/**
 * Prepares formatted text for WhatsApp communication
 */
export function generateOrderWhatsAppMessage(order: Order): string {
  const itemsText = order.items
    .map(i => `• ${i.productTitle} × ${i.quantity} = ৳${i.total.toLocaleString()}`)
    .join('\n');

  return (
    `*NEW KHAN GADGET ORDER: ${order.orderNumber}*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Customer:* ${order.customerName}\n` +
    `📞 *Phone:* ${order.phone}\n` +
    `📍 *Address:* ${order.address}\n` +
    `🚚 *Zone:* ${order.shippingZone === 'inside_dhaka' ? 'Inside Dhaka (৳70)' : 'Outside Dhaka (৳130)'}\n` +
    `💳 *Payment:* ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `🛒 *Items:*\n${itemsText}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 *Subtotal:* ৳${order.subtotal.toLocaleString()}\n` +
    (order.discount > 0 ? `🏷️ *Discount:* -৳${order.discount.toLocaleString()}\n` : '') +
    `📦 *Delivery:* ৳${order.shippingCost.toLocaleString()}\n` +
    `💵 *Total Amount:* ৳${order.total.toLocaleString()}\n` +
    (order.notes ? `📝 *Notes:* ${order.notes}\n` : '') +
    `\n📧 *Order Copy sent to:* ${ADMIN_EMAIL}`
  );
}

/**
 * Returns direct WhatsApp chat link to 01854774406
 */
export function getWhatsAppLink(message?: string): string {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent('Hello Khan Gadget! I want to inquire about your products.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Returns Gmail compose URL for manual email copy verification
 */
export function getGmailComposeLink(order: Order): string {
  const subject = encodeURIComponent(`Order Copy: ${order.orderNumber} - ${order.customerName}`);
  const body = encodeURIComponent(generateOrderWhatsAppMessage(order));
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${ADMIN_EMAIL}&su=${subject}&body=${body}`;
}
