import { useState } from 'react';

interface NavbarProps {
  appName: string;
}

const Navbar: React.FC<NavbarProps> = ({ appName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // mock data
  const user = {
    name: 'John Doe',
    photoUrl: 'https://via.placeholder.com/40'
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    console.log('Signup clicked');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-3 px-6">
      <div className="container mx-auto rounded-full bg-white shadow-sm border border-gray-100 py-2 px-6">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-primary-dark">{appName}</div>
          
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img 
                    src={user.photoUrl} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-gray-900 rounded-lg mx-1">
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-gray-900 rounded-lg mx-1">
                      Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-gray-900 rounded-lg mx-1"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <button 
                  onClick={handleLogin}
                  className="bg-primary hover:bg-primary-dark text-gray-800 px-6 py-2 rounded-full transition-all duration-300"
                >
                  Login
                </button>
                <button 
                  onClick={handleSignup}
                  className="bg-white border border-primary text-gray-800 hover:bg-primary-light px-6 py-2 rounded-full transition-all duration-300"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;