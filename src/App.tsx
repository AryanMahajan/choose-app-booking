import './App.css'
import Navbar from './components/Navbar'
import MainBookingTabs from './components/BookingPage'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      <Navbar appName="ChooseApp" />
      <MainBookingTabs />
    </div>
  )
}

export default App