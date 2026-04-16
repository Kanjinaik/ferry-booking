// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../services/api";

// function Book() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [ferry, setFerry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bookingData, setBookingData] = useState({
//     adults: 1,
//     children: 0,
//     infants: 0,
//     vehicle: 'none',
//     special_requests: ''
//   });
//   const [error, setError] = useState('');
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     const fetchFerry = async () => {
//       try {
//         const response = await api.get(`/ferries/${id}`);
//         setFerry(response.data);
//       } catch (err) {
//         setError('Ferry service not available');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFerry();
//   }, [id]);

//   const updatePassenger = (type, increment) => {
//     const newValue = Math.max(0, bookingData[type] + increment);
//     const totalPassengers = newValue + 
//       (type === 'adults' ? bookingData.children + bookingData.infants : 
//        type === 'children' ? bookingData.adults + bookingData.infants : 
//        bookingData.adults + bookingData.children);
    
//     if (totalPassengers <= 10) {
//       setBookingData({
//         ...bookingData,
//         [type]: newValue
//       });
//     }
//   };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError('');

//     const totalPassengers = bookingData.adults + bookingData.children + bookingData.infants;
//     if (totalPassengers === 0) {
//       setError('Please select at least one passenger');
//       setProcessing(false);
//       return;
//     }

//     try {
//       const bookingPayload = {
//         ferry_id: id,
//         passengers: totalPassengers,
//         adults: bookingData.adults,
//         children: bookingData.children,
//         infants: bookingData.infants,
//         vehicle_type: bookingData.vehicle,
//         vehicle_count: bookingData.vehicle !== 'none' ? 1 : 0,
//         special_requests: bookingData.special_requests,
//         travel_date: new Date().toISOString().split('T')[0]
//       };

//       await api.post("/bookings", bookingPayload);
      
//       navigate("/my-bookings");
//     } catch (err) {
//       if (err.response?.status === 401) {
//         navigate("/login");
//       } else {
//         setError(err.response?.data?.message || 'Booking failed. Please try again.');
//       }
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const calculateTotal = () => {
//     if (!ferry) return 0;
    
//     const passengerCost = (bookingData.adults * ferry.price) + 
//                          (bookingData.children * ferry.price * 0.5) + 
//                          (bookingData.infants * ferry.price * 0.25);
    
//     const vehiclePrices = {
//       'car': 500,
//       'bike': 200,
//       'bus': 1500,
//       'truck': 2000
//     };
    
//     const vehicleCost = bookingData.vehicle !== 'none' ? vehiclePrices[bookingData.vehicle] : 0;
    
//     return Math.round(passengerCost + vehicleCost);
//   };

//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '18px'
//       }}>
//         Loading ferry details...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         maxWidth: '600px',
//         margin: '100px auto',
//         padding: '30px',
//         textAlign: 'center'
//       }}>
//         <h2 style={{color: '#f44336', marginBottom: '20px'}}>Error</h2>
//         <p style={{marginBottom: '20px'}}>{error}</p>
//         <button 
//           onClick={() => navigate('/')} 
//           style={{
//             background: '#1a237e',
//             color: 'white',
//             border: 'none',
//             padding: '12px 25px',
//             borderRadius: '8px',
//             cursor: 'pointer'
//           }}
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="booking-page">
//       <div className="booking-container">
//         <div className="booking-header">
//           <h2>Confirm Your Booking</h2>
//           <p>Complete your ferry reservation for {ferry?.route}</p>
//         </div>
        
//         <div className="booking-body">
//           {error && (
//             <div style={{
//               background: '#ffebee',
//               color: '#c62828',
//               padding: '15px',
//               borderRadius: '8px',
//               marginBottom: '20px'
//             }}>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleBooking}>
//             {/* Passenger Selection */}
//             <div className="passenger-selection">
//               <label className="selection-label">Passenger Details</label>
              
//               <div className="selection-group">
//                 <div className="counter-control">
//                   <span>Adults (12+ years)</span>
//                   <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}> 
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('adults', -1)}
//                       disabled={bookingData.adults <= 0}
//                     >
//                       -
//                     </button>
//                     <span className="counter-value">{bookingData.adults}</span>
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('adults', 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="selection-group">
//                 <div className="counter-control">
//                   <span>Children (2-11 years)</span>
//                   <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}> 
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('children', -1)}
//                       disabled={bookingData.children <= 0}
//                     >
//                       -
//                     </button>
//                     <span className="counter-value">{bookingData.children}</span>
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('children', 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="selection-group">
//                 <div className="counter-control">
//                   <span>Infants (0-2 years)</span>
//                   <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}> 
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('infants', -1)}
//                       disabled={bookingData.infants <= 0}
//                     >
//                       -
//                     </button>
//                     <span className="counter-value">{bookingData.infants}</span>
//                     <button 
//                       type="button" 
//                       className="counter-btn"
//                       onClick={() => updatePassenger('infants', 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Vehicle Selection */}
//             <div className="vehicle-selection">
//               <label className="selection-label">Vehicle (Optional)</label>
//               <div className="vehicle-options">
//                 {[
//                   {value: 'none', icon: '🚫', name: 'No Vehicle', price: 0},
//                   {value: 'car', icon: '🚗', name: 'Car/SUV', price: 500},
//                   {value: 'bike', icon: '🏍️', name: 'Bike', price: 200},
//                   {value: 'bus', icon: '🚌', name: 'Bus', price: 1500}
//                 ].map(vehicle => (
//                   <label 
//                     key={vehicle.value}
//                     className={`vehicle-option ${bookingData.vehicle === vehicle.value ? 'selected' : ''}`}
//                   >
//                     <input 
//                       type="radio" 
//                       name="vehicle" 
//                       value={vehicle.value}
//                       checked={bookingData.vehicle === vehicle.value}
//                       onChange={(e) => setBookingData({...bookingData, vehicle: e.target.value})}
//                       style={{display: 'none'}}
//                     />
//                     <div className="vehicle-icon">{vehicle.icon}</div>
//                     <div className="vehicle-name">{vehicle.name}</div>
//                     <div className="vehicle-price">₹{vehicle.price}</div>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Booking Summary */}
//             <div className="booking-summary">
//               <div className="summary-row">
//                 <span>Route:</span>
//                 <span className="text-primary">{ferry?.route}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Departure:</span>
//                 <span>{ferry?.departure_time}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Passengers:</span>
//                 <span>{bookingData.adults + bookingData.children + bookingData.infants}</span>
//               </div>
//               {bookingData.vehicle !== 'none' && (
//                 <div className="summary-row">
//                   <span>Vehicle:</span>
//                   <span>{bookingData.vehicle.toUpperCase()}</span>
//                 </div>
//               )}
//               <div className="summary-total">
//                 <span>Total Amount:</span>
//                 <span className="text-orange">₹{calculateTotal()}</span>
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               className="confirm-button"
//               disabled={processing}
//             >
//               {processing ? 'PROCESSING BOOKING...' : `CONFIRM BOOKING (₹${calculateTotal()})`}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Book;

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { createPaymentOrder, openRazorpay } from "../services/payment";

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ferry, setFerry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const [bookingData, setBookingData] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    vehicle: "none",
    special_requests: "",
  });

  useEffect(() => {
    const fetchFerry = async () => {
      try {
        const res = await api.get(`/ferries/${id}`);
        setFerry(res.data);
      } catch {
        setError("Ferry service not available");
      } finally {
        setLoading(false);
      }
    };
    fetchFerry();
  }, [id]);

  const updatePassenger = (type, inc) => {
    const newValue = Math.max(0, bookingData[type] + inc);
    setBookingData({ ...bookingData, [type]: newValue });
  };

  const calculateTotal = () => {
    if (!ferry) return 0;

    const passengerCost =
      bookingData.adults * ferry.price +
      bookingData.children * ferry.price * 0.5 +
      bookingData.infants * ferry.price * 0.25;

    const vehiclePrices = {
      car: 500,
      bike: 200,
      bus: 1500,
    };

    const vehicleCost =
      bookingData.vehicle !== "none"
        ? vehiclePrices[bookingData.vehicle]
        : 0;

    return Math.round(passengerCost + vehicleCost);
  };

  // ✅ PAYMENT HANDLER (MAIN LOGIC)
  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    const totalPassengers =
      bookingData.adults + bookingData.children + bookingData.infants;

    if (totalPassengers === 0) {
      setError("Please select passengers");
      setProcessing(false);
      return;
    }

    try {
      const payload = {
        ferry_id: id,
        route: ferry.route,
        departure_time: ferry.departure_time,
        adults: bookingData.adults,
        children: bookingData.children,
        infants: bookingData.infants,
        vehicle_type: bookingData.vehicle,
        passengers: totalPassengers,
        amount: calculateTotal(),
        travel_date: new Date().toISOString().split("T")[0],
        name: "Passenger",
        phone: "9999999999",
        email: "test@gmail.com",
      };

      // 1️⃣ Create order in Laravel
      const order = await createPaymentOrder(payload);

      // 2️⃣ Open Razorpay popup
      openRazorpay(order, payload, navigate);
    } catch {
      setError("Payment initialization failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div>Loading ferry details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-page">
      <form onSubmit={handlePayment}>
        <h2>Confirm Your Booking for {ferry.route}</h2>

        <div>
          <p>Adults</p>
          <button type="button" onClick={() => updatePassenger("adults", -1)}>-</button>
          {bookingData.adults}
          <button type="button" onClick={() => updatePassenger("adults", 1)}>+</button>
        </div>

        <div>
          <p>Children</p>
          <button type="button" onClick={() => updatePassenger("children", -1)}>-</button>
          {bookingData.children}
          <button type="button" onClick={() => updatePassenger("children", 1)}>+</button>
        </div>

        <div>
          <p>Infants</p>
          <button type="button" onClick={() => updatePassenger("infants", -1)}>-</button>
          {bookingData.infants}
          <button type="button" onClick={() => updatePassenger("infants", 1)}>+</button>
        </div>

        <h3>Total: ₹{calculateTotal()}</h3>

        <button type="submit" disabled={processing}>
          {processing
            ? "OPENING PAYMENT..."
            : `BOOK & PAY NOW (₹${calculateTotal()})`}
        </button>
      </form>
    </div>
  );
}

export default Book;
