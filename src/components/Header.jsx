import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
//import Button from '../Button/Button'
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    // Implémenter la logique de recherche
    console.log('Searching for:', searchQuery)
  }
    return (
        <div>
            Header
        </div>
    );
}

export default Header;
