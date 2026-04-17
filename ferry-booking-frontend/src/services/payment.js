export const processPayment = async (bookingData) => {
  if (!window.Razorpay) {
    alert('Payment service not available');
    return;
  }

  try {
    // ✅ Step 1: Create order from Laravel
    const orderRes = await fetch(
      `${process.env.REACT_APP_API_URL}/create-payment-order`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: bookingData.total })
      }
    );

    const order = await orderRes.json();

    if (!order.id) {
      alert('Order creation failed');
      return;
    }

    // ✅ Step 2: Open Razorpay with order_id
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,   // ✅ from .env
      amount: order.amount,
      currency: 'INR',
      name: 'Payfikar Travels',
      description: 'Ferry Booking Payment',
      order_id: order.id,

      handler: async function (response) {
        await verifyPayment(response, bookingData);
      },

      prefill: {
        email: 'chanduchary92@gmail.com',
        name: bookingData.name,
        contact: bookingData.phone
      },

      theme: { color: '#ff8c00' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert('Payment initialization failed');
  }
};

const verifyPayment = async (response, bookingData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/verify-payment`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          booking: bookingData
        })
      }
    );

    const result = await res.json();

    if (result.success) {
      alert('Booking confirmed!');
      window.location.href = '/confirmation';
    } else {
      alert('Payment verification failed');
    }
  } catch (err) {
    console.error(err);
    alert('Verification error');
  }
};
