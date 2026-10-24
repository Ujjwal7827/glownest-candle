import PolicyPage from '../components/PolicyPage';

export const ShippingPolicy = () => (
  <PolicyPage title="Shipping Policy" description="How GLOWNEST packs and ships orders." draft={false}
    body={`At GLOWNEST, we carefully pack every order to help ensure it reaches you safely.

Orders are processed after successful payment confirmation.

Dispatch and delivery timelines may vary depending on product availability, destination and courier service.

Once your order has been dispatched, tracking details will be shared where available.

Shipping charges, if applicable, are shown during checkout.

Delays caused by courier partners, weather, public holidays or circumstances beyond our control may occasionally occur.`} />
);

export const ReturnsPolicy = () => (
  <PolicyPage title="Returns & Refunds" description="GLOWNEST returns and refunds policy for damaged, incorrect or defective orders." contact
    body={`We want you to be happy with your GLOWNEST order.

If your product arrives damaged, incorrect or defective, please contact us within 48 hours of delivery with your order number and clear photos/videos of the package and product.

After reviewing the issue, we may offer a replacement, refund or another appropriate resolution.

Products damaged after delivery due to handling, burning, storage or misuse may not be eligible for replacement.

Customised products may not be eligible for return unless they arrive damaged or incorrect.`} />
);

export const CancellationPolicy = () => (
  <PolicyPage title="Order Cancellation" description="How to request cancellation of a GLOWNEST order." contact
    body={`Cancellation requests can be made before the order is processed for dispatch.

Once an order has been dispatched, cancellation may no longer be possible.

For cancellation requests, contact us through WhatsApp or email with your order number.`} />
);

export const PrivacyPolicy = () => (
  <PolicyPage title="Privacy Policy" description="How GLOWNEST handles your personal information."
    body={`GLOWNEST respects your privacy.

When you place an order, we may collect information such as your name, mobile number, email address and delivery address to process and deliver your order.

Payment information is processed through our selected payment provider and is not intentionally stored by GLOWNEST unless required by the payment service.

We may use your contact information to provide order updates and customer support.

We do not sell your personal information to third parties.`}
    extra={<>
      <h2 style={{ fontSize: '1.6rem' }}>Third-party services on this website</h2>
      <p>This website uses Google Fonts to display text, and WhatsApp (by Meta) when you choose to send us an order request or message. Your cart contents are saved in your own browser so they persist between visits. Delivery details you type at checkout are not saved in your browser.</p>
    </>} />
);

export const TermsConditions = () => (
  <PolicyPage title="Terms & Conditions" description="Terms and conditions for using the GLOWNEST website and ordering."
    body={`By using the GLOWNEST website, you agree to the website’s terms and conditions.

Product colours may vary slightly depending on photography, lighting and screen settings.

Handmade products may have minor variations in appearance, making each piece unique.

Prices, product availability and offers may change without prior notice.

Customers are responsible for providing accurate delivery information.

GLOWNEST reserves the right to cancel an order where necessary, including situations involving incorrect pricing, unavailable products or suspected fraudulent activity.`} />
);
