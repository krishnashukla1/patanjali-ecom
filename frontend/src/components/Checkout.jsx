// import React, { useState } from 'react';

// const Checkout = ({ cart, totalPrice, handleCheckout, setView }) => {
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     name: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentInfo({ ...paymentInfo, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleCheckout();
//   };

//   return (
//     <div className="checkout-container">
//       <h2 className="checkout-title">Checkout</h2>
      
//       <div className="checkout-items">
//         {cart.map(item => (
//           <div key={item.id} className="checkout-item">
//             <span>{item.name} x {item.quantity}</span>
//             <span>₹{item.price * item.quantity}</span>
//           </div>
//         ))}
//       </div>
      
//       <div className="checkout-total">Total: ₹{totalPrice}</div>
      
//       <form className="payment-form" onSubmit={handleSubmit}>
//         <h3>Payment Information</h3>
        
//         <div className="form-group">
//           <label>Card Number</label>
//           <input
//             type="text"
//             name="cardNumber"
//             value={paymentInfo.cardNumber}
//             onChange={handleInputChange}
//             placeholder="1234 5678 9012 3456"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Expiry Date</label>
//           <input
//             type="text"
//             name="expiryDate"
//             value={paymentInfo.expiryDate}
//             onChange={handleInputChange}
//             placeholder="MM/YY"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>CVV</label>
//           <input
//             type="text"
//             name="cvv"
//             value={paymentInfo.cvv}
//             onChange={handleInputChange}
//             placeholder="123"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Cardholder Name</label>
//           <input
//             type="text"
//             name="name"
//             value={paymentInfo.name}
//             onChange={handleInputChange}
//             placeholder="John Doe"
//             required
//           />
//         </div>
        
//         <button type="submit" className="pay-btn">
//           Pay Now
//         </button>
//       </form>
      
//       <button className="back-btn" onClick={() => setView('cart')}>
//         Back to Cart
//       </button>
//     </div>
//   );
// };

// export default Checkout;





import React, { useState } from 'react';

const Checkout = ({ cart, totalPrice, handleCheckout, setView }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    upiId: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.name) {
        setSuccessMessage("❌ Please fill in all card details");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!paymentInfo.upiId) {
        setSuccessMessage("❌ Please enter UPI ID");
        return;
      }
    }

    // Trigger parent checkout handler
    handleCheckout(paymentMethod, paymentInfo);

    // Show success message
    setSuccessMessage(`✅ Payment successful via ${paymentMethod.toUpperCase()}`);
    
    // Reset fields
    setPaymentInfo({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
      upiId: "",
    });
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-items">
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="checkout-total">Total: ₹{totalPrice}</div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <h3>Payment Method</h3>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                placeholder="123"
              />
            </div>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="name"
                value={paymentInfo.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
          </>
        )}

        {paymentMethod === "upi" && (
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={paymentInfo.upiId}
              onChange={handleInputChange}
              placeholder="example@upi"
            />
          </div>
        )}

        {paymentMethod === "cash" && (
          <p className="info-text">
            Pay with cash upon delivery. No extra details required.
          </p>
        )}

        <button type="submit" className="pay-btn">
          {paymentMethod === "cash" ? "Place Order" : "Pay Now"}
        </button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <button className="back-btn" onClick={() => setView("cart")}>
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
