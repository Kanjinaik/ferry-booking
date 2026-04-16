import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const fallbackFerries = [
  { id: 1, name: "M2M-1", route: "Mumbai -> Alibaug", price: 350, vehiclePrice: 500 },
  { id: 2, name: "M2M-2", route: "Mumbai -> Mandwa", price: 400, vehiclePrice: 500 },
  { id: 3, name: "M2M-3", route: "Alibaug -> Mumbai", price: 350, vehiclePrice: 500 },
  { id: 4, name: "M2M-4", route: "Mandwa -> Mumbai", price: 400, vehiclePrice: 500 },
];

const ModernBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [ferry, setFerry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    from: "Mumbai",
    to: "Mandwa",
    departureDate: "",
    passengers: 1,
    vehicle: "none",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const applyRouteToForm = (routeValue) => {
    const [from = "Mumbai", to = "Mandwa"] = String(routeValue || "")
      .split("->")
      .map((part) => part.trim());

    setBookingData((prev) => ({ ...prev, from, to }));
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setBookingData((prev) => ({ ...prev, departureDate: today }));

    if (location?.state?.ferry) {
      setFerry(location.state.ferry);
      applyRouteToForm(location.state.ferry.route);
      setLoading(false);
      return;
    }

    if (!id) {
      setFerry(fallbackFerries[1]);
      applyRouteToForm(fallbackFerries[1].route);
      setLoading(false);
      return;
    }

    const fetchFerry = async () => {
      try {
        const res = await api.get(`/ferries/${id}`);
        setFerry({ ...res.data, vehiclePrice: 500 });
        applyRouteToForm(res.data.route);
      } catch (err) {
        const fallbackFerry = fallbackFerries.find((item) => String(item.id) === String(id));
        if (fallbackFerry) {
          setFerry(fallbackFerry);
          applyRouteToForm(fallbackFerry.route);
        } else {
          console.error("Ferry fetch error:", err.response?.data || err);
          alert("Failed to fetch ferry details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFerry();
  }, [id, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!ferry) return 0;

    const passengerPrice = Number(ferry.price) || 0;
    const vehiclePrice = Number(ferry.vehiclePrice) || 0;
    const adults = Number(bookingData.passengers);

    let total = passengerPrice * adults;

    if (bookingData.vehicle !== "none") {
      total += vehiclePrice;
    }

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const adults = Number(bookingData.passengers);
    const children = 0;
    const totalPassengers = adults + children;
    const ferryId = ferry?.id || Number(id);

    if (!ferryId) {
      alert("Selected ferry is not available on the server. Please choose a registered ferry.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ferry_id: ferryId,
      from: bookingData.from,
      to: bookingData.to,
      travel_date: bookingData.departureDate,
      passengers: totalPassengers,
      adults,
      children,
      vehicle_type: bookingData.vehicle,
      vehicle_count: bookingData.vehicle === "none" ? 0 : 1,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      special_requests: bookingData.specialRequests,
      total_amount: calculateTotal(),
      status: "pending",
      razorpay_order_id: null,
      razorpay_payment_id: null,
      razorpay_signature: null,
    };

    try {
      const res = await api.post("/bookings", payload);
      alert("Booking Successful! Booking ID: " + res.data.booking.id);
      navigate("/my-bookings");
    } catch (err) {
      if (!err.response) {
        alert("Backend is not running. Start the Laravel server on http://127.0.0.1:8000 and try again.");
        return;
      }

      const errors = err.response?.data?.errors;
      let errorMsg = err.response?.data?.message || "Booking failed. Please try again.";

      if (errors && typeof errors === "object") {
        errorMsg = `Validation errors:\n${Object.entries(errors)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join("\n")}`;
      }

      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <h2>Loading ferry details...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Book Ferry: {ferry?.name}</h2>
      <p>Route: {ferry?.route}</p>
      <p>Price per passenger: Rs {ferry?.price}</p>
      <p>Vehicle Price: Rs {ferry?.vehiclePrice || 0}</p>
      <p><strong>Total: Rs {calculateTotal()}</strong></p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={bookingData.name} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={bookingData.email} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={bookingData.phone} onChange={handleInputChange} required />
        <input type="date" name="departureDate" value={bookingData.departureDate} onChange={handleInputChange} required />

        <select name="passengers" value={bookingData.passengers} onChange={handleInputChange}>
          {[...Array(6)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Adult{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>

        <select name="vehicle" value={bookingData.vehicle} onChange={handleInputChange}>
          <option value="none">No Vehicle</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select>

        <textarea
          name="specialRequests"
          placeholder="Special Requests (optional)"
          value={bookingData.specialRequests}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default ModernBooking;
