import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Blog from './pages/Blog.jsx'          
import Contact from './pages/Contact.jsx'    
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* "*" captures Guardian ids, which contain slashes */}
          <Route path="/article/*" element={<ArticleDetail />} />
          <Route path="/blog" element={<Blog />} />         {/* ← add this line */}
          <Route path="/contact" element={<Contact />} />   {/* ← add this line */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}