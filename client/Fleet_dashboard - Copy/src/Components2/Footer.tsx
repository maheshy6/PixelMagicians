import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-blue-600 font-semibold mb-2">FleetManagerPro</h3>
            <p className="text-sm text-gray-500">© 2025 FleetManagerPro. All rights reserved.</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Help & Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;