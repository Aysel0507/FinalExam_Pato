import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../../context/BasketContext'
import { FavoritesContext } from '../../context/FavoritesContext'
import styles from './index.module.scss'

const Header = () => {
    const {favs}=useContext(FavoritesContext)
    const {basket}=useContext(BasketContext)
  return (
    <>
    <header>
        <div id={styles.navbar}>
            <div className="container">
                <div className={styles.navbar}>
                    <div className={styles.nav}>
                        <div className={styles.logo}>
                            <img src="https://preview.colorlib.com/theme/pato/images/icons/logo.png" alt="" />
                        </div>
                        <div className={styles.nav}>
                            <ul>
                                <a href="#"><Link to={'/'}>Home</Link></a>
                                <a href="#"><Link to={'add-page'}>Add Page</Link></a>
                                <a href="#"><Link to={'favorites'}>Favorites <sup>{favs.length}</sup></Link></a>
                                <a href="#"><Link to={'basket'}>Basket <sup>{basket.length}</sup></Link></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header