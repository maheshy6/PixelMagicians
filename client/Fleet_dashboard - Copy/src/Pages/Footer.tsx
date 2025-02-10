import { 
    FacebookIcon, 
    TwitterIcon, 
    LinkedinIcon, 
    InstagramIcon 
  } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1c2434] text-white py-8">
      <div className="container mx-auto flex justify-between">
        {/* Left Section */}
        <div>
          <h3 className="font-bold mb-4">DriverHub</h3>
          <p className="text-sm text-gray-300">
            Your trusted platform for driver management and registration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Documentation</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-3">Connect With Us</h4>
          <div className="flex space-x-4">
            <FacebookIcon className="text-white hover:text-gray-300" />
            <TwitterIcon className="text-white hover:text-gray-300" />
            <LinkedinIcon className="text-white hover:text-gray-300" />
            <InstagramIcon className="text-white hover:text-gray-300" />
          </div>
          <p className="mt-4 text-xs text-gray-400">© 2025 DriverHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer