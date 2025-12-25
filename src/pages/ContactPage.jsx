import React, { useState } from 'react';
import { Button } from '../components/Button.jsx';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Get in Touch</h1>
            <p className="text-xl text-slate-600">We'd love to hear from you. Reach out with any questions or just to say hello.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="fullName"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="Jane Doe"
                      aria-label="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="emailAddress" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="emailAddress"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      placeholder="jane@example.com"
                      aria-label="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="messageContent" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea 
                      id="messageContent"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      aria-label="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="secondary" className="w-full py-4 text-lg" aria-label="Send your message">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Studio</h3>
                <address className="text-slate-600 text-lg leading-relaxed not-italic">
                  123 Artisan Way,<br />
                  Creative District,<br />
                  Milan, Italy 20121
                </address>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a href="mailto:hello@elegance.com" className="text-slate-600 text-lg hover:text-indigo-600 transition-colors" aria-label="Email us at hello@elegance.com">hello@elegance.com</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 005.454 5.454l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a href="tel:+390212345678" className="text-slate-600 text-lg hover:text-indigo-600 transition-colors" aria-label="Call us at +39 02 1234 5678">+39 02 1234 5678</a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { label: 'Instagram', text: 'IG' },
                    { label: 'Facebook', text: 'FB' },
                    { label: 'Twitter', text: 'TW' },
                    { label: 'LinkedIn', text: 'LN' }
                  ].map((social) => (
                    <a 
                      key={social.text} 
                      href="#" 
                      className="w-12 h-12 bg-slate-800 text-white rounded-lg flex items-center justify-center font-bold cursor-pointer hover:bg-indigo-600 transition-colors"
                      aria-label={`Follow us on ${social.label}`}
                    >
                      {social.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};