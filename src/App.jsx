import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/navbar'
import Home from './pages/home'
import Screening from './pages/screening'
import Result from './pages/result'
import Education from './pages/education'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/screening/result" element={<Result />} />
          <Route path="/education" element={<Education />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "64px 24px", textAlign: "center" }}>
                <h1>404</h1>
                <p>Halaman yang kamu cari tidak ditemukan.</p>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
