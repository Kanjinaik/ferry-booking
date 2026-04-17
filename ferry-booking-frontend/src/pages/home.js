import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/main.css";
import api from "../api/axios";

const Home = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("one-way");
  const [ferries, setFerries] = useState([]);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: '',
    vehicle: "none",
  });

  // useEffect(() => {
  //   const today = new Date();
  //   const tomorrow = new Date(today);
  //   tomorrow.setDate(tomorrow.getDate() + 1);

  //   setSearchData((prev) => ({
  //     ...prev,
  //     departureDate: today.toISOString().split("T")[0],
  //     returnDate: tomorrow.toISOString().split("T")[0],
  //   }));

  //   api.get("/ferries").then((res) => setFerries(res.data));
  // }, []);

  useEffect(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  setSearchData(prev => ({
    ...prev,
    departureDate: today.toISOString().split("T")[0],
    returnDate: tomorrow.toISOString().split("T")[0],
  }));

  const fetchFerries = async () => {
    try {
      const res = await api.get("/ferries");
      setFerries(res.data);
    } catch (err) {
      console.error("Error fetching ferries:", err);
      alert("Cannot fetch ferries. Please check if backend is running.");
    }
  };

  fetchFerries();
}, []);


  const handleSearch = (e) => {
    e.preventDefault();

    const matchingFerry = ferries.find(
      (ferry) => ferry.route === `${searchData.from} → ${searchData.to}`
    );

    if (matchingFerry) {
      navigate(`/book/${matchingFerry.id}`);
    } else {
      alert("No ferry available for the selected route");
    }
  };

  return (
    <div className="home-page">
      {/* HERO SECTION WITH YOUR M2M FERRIES IMAGE */}
      <section className="hero" style={{ backgroundImage: url('/assets/ferry.avif'),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative'
      }}>
        
        {/* TEXT OVER IMAGE */}
        <div className="hero-overlay">
          <h1 className="hero-title">Leave the road behind with</h1>
          <h2 className="hero-brand">Payfikar Travels</h2>
          <p className="hero-subtext">Premium Maritime Travel Between Mumbai & Mandwa</p>
          <Link to="/book" className="hero-btn">BOOK NOW</Link>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <div className="booking-widget">
        <div className="widget-container">
          <div className="trip-type">
            <label className={tripType === "one-way" ? "active" : ""}>
              <input
                type="radio"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={(e) => setTripType(e.target.value)}
              />
              One Way
            </label>

            <label className={tripType === "round-trip" ? "active" : ""}>
              <input
                type="radio"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={(e) => setTripType(e.target.value)}
              />
              Round Trip
            </label>
          </div>

          <form onSubmit={handleSearch}>
            <div className="form-row">
              <select
                value={searchData.from}
                onChange={(e) =>
                  setSearchData({ ...searchData, from: e.target.value })
                }
              >
                <option value="Mumbai">Mumbai (Ferry Wharf)</option>
                <option value="Mandwa">Mandwa Terminal</option>
                <option value="Alibaug">Alibaug Jetty</option>
              </select>

              <select
                value={searchData.to}
                onChange={(e) =>
                  setSearchData({ ...searchData, to: e.target.value })
                }
              >
                <option value="Mandwa">Mandwa Terminal</option>
                <option value="Alibaug">Alibaug Jetty</option>
                <option value="Mumbai">Mumbai (Ferry Wharf)</option>
              </select>

              <input
                type="date"
                value={searchData.departureDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    departureDate: e.target.value,
                  })
                }
              />

              {tripType === "round-trip" && (
                <input
                  type="date"
                  value={searchData.returnDate}
                  min={searchData.departureDate}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      returnDate: e.target.value,
                    })
                  }
                />
              )}

              <select
                value={searchData.passengers}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    passengers: parseInt(e.target.value),
                  })
                }
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>

              <select
                value={searchData.vehicle}
                onChange={(e) =>
                  setSearchData({ ...searchData, vehicle: e.target.value })
                }
              >
                <option value="none">No Vehicle</option>
                <option value="bike">Motorcycle/Bike</option>
                <option value="car">Compact Car</option>
                <option value="suv">SUV/Jeep</option>
                <option value="van">Mini Van</option>
              </select>
            </div>

            <button type="submit">SEARCH FERRY</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/main.css";
// import api from "../api/axios";

// const Home = () => {
//   const navigate = useNavigate();
//   const [tripType, setTripType] = useState("one-way");
//   const [ferries, setFerries] = useState([]);
//   const [ports, setPorts] = useState([]); // For unique "from" & "to" ports

//   const [searchData, setSearchData] = useState({
//     from: "",
//     to: "",
//     departureDate: "",
//     returnDate: "",
//     passengers: 1,
//     vehicle: "none",
//   });

//   // Fetch ferries and ports on load
//   useEffect(() => {
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     setSearchData(prev => ({
//       ...prev,
//       departureDate: today.toISOString().split("T")[0],
//       returnDate: tomorrow.toISOString().split("T")[0],
//     }));

//     const fetchFerries = async () => {
//       try {
//         const res = await api.get("/ferries");
//         setFerries(res.data);

//         // Extract unique ports from ferries
//         const fromPorts = [...new Set(res.data.map(f => f.route.split(" → ")[0]))];
//         const toPorts = [...new Set(res.data.map(f => f.route.split(" → ")[1]))];
//         setPorts({ fromPorts, toPorts });

//         // Set default from/to if available
//         setSearchData(prev => ({
//           ...prev,
//           from: fromPorts[0] || "",
//           to: toPorts[0] || "",
//         }));
//       } catch (err) {
//         console.error("Error fetching ferries:", err);
//         alert("Cannot fetch ferries. Please check if backend is running.");
//       }
//     };

//     fetchFerries();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const matchingFerry = ferries.find(
//       (ferry) => ferry.route === `${searchData.from} → ${searchData.to}`
//     );

//     if (matchingFerry) {
//       navigate(`/book/${matchingFerry.id}`);
//     } else {
//       alert("No ferry available for the selected route");
//     }
//   };

//   return (
//     <div className="home-page">
//       {/* HERO SECTION */}
//       <section className="hero" style={{
//         backgroundImage: "url('/assets/ferry.avif')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center',
//         color: 'white',
//         position: 'relative'
//       }}>
//         <div className="hero-overlay">
//           <h1 className="hero-title">Leave the road behind with</h1>
//           <h2 className="hero-brand">M2M Ferries</h2>
//           <p className="hero-subtext">Premium Maritime Travel Between Mumbai & Mandwa</p>
//           <Link to="/book" className="hero-btn">BOOK NOW</Link>
//         </div>
//       </section>

//       {/* BOOKING WIDGET */}
//       <div className="booking-widget">
//         <div className="widget-container">
//           <div className="trip-type">
//             <label className={tripType === "one-way" ? "active" : ""}>
//               <input
//                 type="radio"
//                 value="one-way"
//                 checked={tripType === "one-way"}
//                 onChange={(e) => setTripType(e.target.value)}
//               /> One Way
//             </label>

//             <label className={tripType === "round-trip" ? "active" : ""}>
//               <input
//                 type="radio"
//                 value="round-trip"
//                 checked={tripType === "round-trip"}
//                 onChange={(e) => setTripType(e.target.value)}
//               /> Round Trip
//             </label>
//           </div>

//           <form onSubmit={handleSearch}>
//             <div className="form-row">
//               {/* Dynamic From Dropdown */}
//               <select
//                 value={searchData.from}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, from: e.target.value })
//                 }
//               >
//                 {ports.fromPorts?.map((port, idx) => (
//                   <option key={idx} value={port}>{port}</option>
//                 ))}
//               </select>

//               {/* Dynamic To Dropdown */}
//               <select
//                 value={searchData.to}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, to: e.target.value })
//                 }
//               >
//                 {ports.toPorts?.map((port, idx) => (
//                   <option key={idx} value={port}>{port}</option>
//                 ))}
//               </select>

//               {/* Departure & Return */}
//               <input
//                 type="date"
//                 value={searchData.departureDate}
//                 min={new Date().toISOString().split("T")[0]}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, departureDate: e.target.value })
//                 }
//               />

//               {tripType === "round-trip" && (
//                 <input
//                   type="date"
//                   value={searchData.returnDate}
//                   min={searchData.departureDate}
//                   onChange={(e) =>
//                     setSearchData({ ...searchData, returnDate: e.target.value })
//                   }
//                 />
//               )}

//               {/* Passengers */}
//               <select
//                 value={searchData.passengers}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, passengers: parseInt(e.target.value) })
//                 }
//               >
//                 {[...Array(15)].map((_, i) => (
//                   <option key={i+1} value={i+1}>
//                     {i+1} {i === 0 ? "Passenger" : "Passengers"}
//                   </option>
//                 ))}
//               </select>

//               {/* Vehicle */}
//               <select
//                 value={searchData.vehicle}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, vehicle: e.target.value })
//                 }
//               >
//                 <option value="none">No Vehicle</option>
//                 <option value="bike">Motorcycle/Bike</option>
//                 <option value="car">Compact Car</option>
//                 <option value="suv">SUV/Jeep</option>
//                 <option value="van">Mini Van</option>
//               </select>
//             </div>

//             <button type="submit">SEARCH FERRY</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
