import * as React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import ProductsScreen from './screens/ProductsScreen'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<ProductsScreen/>} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  )
}

export default App