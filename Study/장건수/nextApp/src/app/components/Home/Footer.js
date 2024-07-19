import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute mt-20 border-t-2 w-full px-24 py-8 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">데이터</h1>
          <p className="mb-2">Address: 1234 Street Name, City, Country</p>
          <p className="mb-2">Email: info@example.com</p>
          <p className="mb-2">Phone: +123-456-7890</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <a href="#home" className="text-blue-600 hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#about" className="text-blue-600 hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#services" className="text-blue-600 hover:underline">
                Services
              </a>
            </li>
            <li className="mb-2">
              <a href="#contact" className="text-blue-600 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-pink-600 hover:text-pink-800"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-600">
        &copy; 2024 데이터. All rights reserved.
      </div>
    </footer>
  );
}
