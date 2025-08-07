import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar appName="ChooseApp" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to ChooseApp</h1>
        <p className="text-gray-700">This is the main content area of your application.</p>
      </div>
    </div>
  )
}

export default App
