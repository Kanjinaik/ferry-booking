import React, { useState } from 'react';
import '../styles/main.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a ferry ticket?",
      answer: "You can book tickets online through our website or mobile app. Simply select your route, date, time, and number of passengers/vehicles, then proceed to payment. You'll receive a confirmation email with your booking details."
    },
    {
      question: "What are the operating hours?",
      answer: "Our ferries operate from 6:00 AM to 8:00 PM daily. First departure is at 6:00 AM and last departure is at 7:00 PM. Please check our schedule page for specific timings for each route."
    },
    {
      question: "Can I bring my vehicle?",
      answer: "Yes, we accommodate vehicles including cars, bikes, scooters, and small trucks. Vehicle booking is required in advance and additional charges apply based on vehicle type and size."
    },
    {
      question: "What identification is required?",
      answer: "All passengers must carry valid photo identification (Aadhar card, Passport, Driving License, or Voter ID). For vehicle travel, vehicle registration documents are also required."
    },
    {
      question: "Are there any age restrictions?",
      answer: "Children under 3 years travel free when accompanied by an adult. Children aged 3-12 years get concession rates. Senior citizens (60+) are eligible for special discounts with valid ID proof."
    },
    {
      question: "What happens if my ferry is delayed or cancelled?",
      answer: "In case of delays due to weather or technical issues, we'll notify you via SMS/email. If cancelled, you can reschedule to another time or get a full refund. Weather-related cancellations are non-refundable but can be rescheduled."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Bookings can be cancelled up to 2 hours before departure for a partial refund (deducting service charges). Modifications to date/time are subject to availability and may incur additional charges."
    },
    {
      question: "Are food and beverages available?",
      answer: "Yes, we have onboard cafeterias serving snacks, beverages, and light meals. Passengers can also carry their own food. Alcoholic beverages are not permitted onboard."
    },
    {
      question: "Is there parking available at the ports?",
      answer: "Yes, both Mumbai and Mandwa/Alibaug ports have designated parking areas. Parking charges apply and spaces are available on first-come-first-served basis. Advance booking for parking is recommended during peak hours."
    },
    {
      question: "What safety measures are in place?",
      answer: "We follow strict safety protocols including life jackets for all passengers, trained crew members, emergency equipment, and regular safety drills. All vessels are equipped with modern navigation and communication systems."
    },
    {
      question: "Can I travel with pets?",
      answer: "Small pets (under 10kg) are allowed in carriers. Larger pets require special arrangements and additional fees. Service animals for disabled passengers travel free with proper documentation."
    },
    {
      question: "Are there facilities for disabled passengers?",
      answer: "Yes, we provide wheelchair accessibility, special assistance, and designated seating areas. Please inform us at the time of booking for any special requirements."
    }
  ];

  const quickLinks = [
    { title: "Booking Policy", icon: "fa-ticket-alt" },
    { title: "Refund Policy", icon: "fa-undo" },
    { title: "Baggage Policy", icon: "fa-suitcase" },
    { title: "Travel Guidelines", icon: "fa-info-circle" },
    { title: "Safety Information", icon: "fa-shield-alt" },
    { title: "Contact Support", icon: "fa-headset" }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/payfikar4.png?v=20260418b')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '400px'
      }}>
        <div className="hero-content">
          <h1 className="hero-title">Frequently Asked Questions</h1>
          <p className="hero-subtitle">Find answers to common questions about our ferry services</p>
        </div>
      </section>

      {/* Search FAQ */}
      <section className="faq-search py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="search-box bg-white p-4 rounded shadow">
                <h3 className="text-center mb-4">Search Our Help Center</h3>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for answers..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="faq-categories py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Quick Help Links</h2>
          
          <div className="row">
            {quickLinks.map((link, index) => (
              <div key={index} className="col-md-4 col-lg-2 mb-3">
                <div className="category-card text-center p-3 bg-white rounded shadow">
                  <div className="category-icon mb-2">
                    <i className={`fas ${link.icon} fa-2x text-primary`}></i>
                  </div>
                  <h6>{link.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="main-faq py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="section-title text-center mb-5">Frequently Asked Questions</h2>
              
              <div className="faq-accordion">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item mb-3">
                    <div 
                      className="faq-question bg-white p-4 rounded shadow cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{faq.question}</h5>
                        <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'} text-primary`}></i>
                      </div>
                    </div>
                    
                    {openIndex === index && (
                      <div className="faq-answer bg-light p-4 rounded mt-2">
                        <p className="mb-0">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="help-section bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title mb-4">Still Need Help?</h2>
              <p className="lead mb-4">Our customer support team is ready to assist you with any questions or concerns.</p>
              
              <div className="help-options">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="help-card bg-white p-4 rounded shadow">
                      <i className="fas fa-phone fa-2x text-primary mb-3"></i>
                      <h5>Call Us</h5>
                      <p className="text-muted">+91 22 1234 5678</p>
                      <small>24/7 Customer Support</small>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <div className="help-card bg-white p-4 rounded shadow">
                      <i className="fas fa-envelope fa-2x text-primary mb-3"></i>
                      <h5>Email Us</h5>
                      <p className="text-muted">support@payfikartravels.com</p>
                      <small>Response within 24 hours</small>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <div className="help-card bg-white p-4 rounded shadow">
                      <i className="fas fa-comments fa-2x text-primary mb-3"></i>
                      <h5>Live Chat</h5>
                      <p className="text-muted">Available Online</p>
                      <small>Mon-Sun: 8AM-8PM</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="emergency-info py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="emergency-card bg-danger bg-opacity-10 p-5 rounded">
                <div className="text-center">
                  <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                  <h3 className="text-danger mb-3">Emergency Contact</h3>
                  <p className="lead">For immediate assistance during your journey:</p>
                  <div className="emergency-contacts mt-4">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <h5>Port Authority</h5>
                        <p className="mb-0">+91 22 9876 5432</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h5>Medical Emergency</h5>
                        <p className="mb-0">+91 22 108</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h5>Coast Guard</h5>
                        <p className="mb-0">1718</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
