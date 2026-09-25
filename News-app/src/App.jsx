import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Ticker from './components/Ticker.jsx'
import Home from './pages/Home.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Blog from './pages/Blog.jsx'          
import Contact from './pages/Contact.jsx'    
import NotFound from './pages/NotFound.jsx'
import About from './components/About.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Ticker />  
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/*" element={<ArticleDetail />} />
          <Route path="/blog" element={<Blog />} />         
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}