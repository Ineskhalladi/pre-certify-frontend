import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-[#f7f7f2] min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-[#3e5c3a] text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">PreCertify</div>
        <ul className="flex gap-4">
          <li className="hover:underline">Home</li>
          <li className="hover:underline">Names</li>
          <li className="hover:underline">Secteurs</li>
          <li className="hover:underline">Informations et actualités</li>
          <li className="hover:underline">Contact</li>
        </ul>
      </nav>
      
      {/* Contact Section */}
      <div className="text-center my-10">
        <h1 className="text-4xl font-bold text-[#3e5c3a]">Contact Us</h1>
        <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet...</p>
      </div>
      
      {/* Form & Newsletter */}
      <div className="flex justify-center gap-10 p-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
          <input type="text" placeholder="Phone" className="w-full p-2 mb-4 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
          <textarea placeholder="Message" className="w-full p-2 border rounded" rows="4"></textarea>
          <button className="w-full mt-4 bg-[#3e5c3a] text-white py-2 rounded">Submit Button</button>
        </div>
        <div className="bg-[#3e5c3a] text-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold">Our Newsletter</h2>
          <p className="text-sm mt-2">Lorem ipsum dolor sit amet...</p>
          <input type="email" placeholder="Email" className="w-full p-2 my-4 border rounded text-black" />
          <button className="w-full bg-yellow-500 py-2 rounded">Submit Button</button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#3e5c3a] text-white p-6 text-center">
        <p>Copyright © 2025 PreCertify. Tous les droits réservés.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
