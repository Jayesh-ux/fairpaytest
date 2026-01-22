# Emergency Contact Payment Integration Plan

The user wants to charge **₹200** for emergency consultations.

## Recommended Approach: Razorpay Payment Gateway

Using Razorpay is the standard and most reliable way to collect payments in India (UPI, Cards, Netbanking).

### 1. Pre-requisites
- **Razorpay Account**: You need an active Razorpay Merchant account.
- **API Keys**: Get `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

### 2. Implementation Steps

#### Backend (Next.js API)
1.  **Create Order Endpoint**: 
    -   Create a new API route `POST /api/payment/create-order`.
    -   Use `razorpay` node SDK to create an order of ₹200 (amount: 20000 paise).
    -   Return `order_id` to the frontend.

2.  **Verify Payment Endpoint**:
    -   Create `POST /api/payment/verify`.
    -   Verify the `razorpay_signature` sent by the frontend match the order details.
    -   If valid, save the `EmergencyContact` to the database with `status: 'PAID'`.

#### Frontend (EmergencyStickyBar)
1.  **Modify Submit Handler**:
    -   Instead of saving immediately, call `POST /api/payment/create-order`.
    -   Receive `order_id`.
    -   Initialize Razorpay Checkout (`window.Razorpay`).
    
    ```javascript
    const options = {
        key: "YOUR_KEY_ID",
        amount: "20000",
        currency: "INR",
        name: "FairPay Solutions",
        description: "Emergency Consultation Fee",
        order_id: order_id,
        handler: async function (response) {
            // Call verify API
            await verifyPayment(response);
        },
        prefill: {
            name: formData.name,
            contact: formData.phone
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    ```

2.  **Load Razorpay Script**:
    -   Add `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>` to the `head` or load it dynamically.

### 3. Database Updates
- Update `EmergencyContact` model to include payment details:
  ```prisma
  model EmergencyContact {
      // ... existing fields
      paymentId     String? // razorpay_payment_id
      orderId       String? // razorpay_order_id
      paymentStatus String  @default("PENDING") // PENDING, PAID, FAILED
  }
  ```

## Alternative: Post-Payment (Current Flow)
If you don't want to integrate a gateway right now:
1.  User submits request (as currently implemented).
2.  Admin calls user.
3.  **Manual Step**: Admin asks user to pay via UPI (GPay/PhonePe) to a company number.
4.  Once received, Admin proceeds with consultation.

**Pros**: Zero technical setup.
**Cons**: Higher drop-off, manual verification.
