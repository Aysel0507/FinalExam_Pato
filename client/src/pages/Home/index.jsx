import React from 'react'
import { useState } from 'react'
import { useDeleteOneMutation, useGetProductsByNameQuery } from '../../services/ProductsApi'
import styles from './index.module.scss'
import { Row, Col } from 'antd'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { BasketContext } from '../../context/BasketContext'
import {Helmet} from "react-helmet";

const Home = () => {
    const { data: products, refetch } = useGetProductsByNameQuery()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('def')
    const [deleteOne] = useDeleteOneMutation()
    const { favs, setFavs } = useContext(FavoritesContext)
    const {basket,setBasket}=useContext(BasketContext)

    const filteredData = products ? products.data.filter((product) => {
        return product.title.trim().toLowerCase().includes(searchQuery.trim().toLowerCase())
    }) : []


    const sortedData = sortBy ? filteredData.slice().sort((a, b) => {
        if (sortBy === 'asc') {
            return a.price - b.price;
        }
        else {
            return b.price - a.price
        }
    }) : filteredData


    const handleWishlist = (product) => {
        const addToFav = favs.find((x) => x._id == product._id)
        if (!addToFav) {
            setFavs([...favs, product])
            localStorage.setItem('favs', JSON.stringify([...favs, product]))
        }
        else {
            const updatedProduct = favs.filter((x) => x._id != product._id)
            setFavs([...updatedProduct])
            localStorage.setItem('favs', JSON.stringify([...updatedProduct]))
        }
    }




    return (
        <>
         <Helmet>
                <title>Home</title>
            </Helmet>
            <section id={styles.banner}>
                <div className="container">
                    <div className={styles.banner}>
                        <h5>Welcome to</h5>
                        <h2>PATO PLACE</h2>
                        <button>LOOK MENU</button>
                    </div>
                </div>
            </section>

            <section id={styles.welcome}>
                <div className="container">
                    <div className={styles.welcome}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6} xs={24} md={12} lg={12}>
                                <h3>Italian Restaurant</h3>
                                <h1>WELCOME</h1>
                                <p>Donec quis lorem nulla. Nunc eu odio mi. Morbi nec lobortis est. Sed fringilla, nunc sed imperdiet lacinia, nisl ante egestas mi, ac facilisis ligula sem id neque.</p>
                                <a href="#">OUR STORY</a>
                            </Col>


                            <Col className="gutter-row" span={6} xs={24} md={12} lg={12}>
                                <img width={'400px'} src="https://preview.colorlib.com/theme/pato/images/our-story-01.jpg" alt="" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>

            <section style={{marginTop:'50px'}}>
                <div className="container">
                    <h3> Sort by Price and Search By Title</h3>
                    <TextField id="outlined-basic" label="search" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortBy}
                            label="Sort by Price"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <MenuItem value={'def'}>Default</MenuItem>
                            <MenuItem value={'asc'}>Low to High</MenuItem>
                            <MenuItem value={'desc'}>High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>

            <section style={{ marginTop: '150px' }} id={styles.products}>
                <div className="container">

                    <div className={styles.products}>


                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            {sortedData && sortedData.map((product) => {
                                return <Col className="gutter-row" span={6} xs={24} md={12} lg={8} key={product._id}>
                                    <img width={'300px'} src={product.image} alt={product.title} />
                                    <h2>{product.title}</h2>
                                    <p>{product.desciption}</p>
                                    <h4>{product.price}</h4>
                                    <Button danger onClick={async () => {
                                        if (window.confirm("Are you sure delete?")) {
                                            await deleteOne(product._id)
                                            refetch()
                                        }
                                    }}>Delete</Button>
                                    <Button><Link to={`/products/${product._id}`}>Detail</Link></Button>
                                   <Button onClick={()=>{
                                       const duplicateItem=basket.find((x)=>x._id==product._id)
                                       if(duplicateItem){
                                           duplicateItem.count+=1
                                           setBasket([...basket])
                                           localStorage.setItem('basket',JSON.stringify([...basket]))
                                       }
                                       else{
                                           const newBasket={...product}
                                           newBasket.count=1
                                           setBasket([...basket,newBasket])
                                           localStorage.setItem('basket',JSON.stringify([...basket,newBasket]))
                                       }
                                   }}>Basket</Button>
                                    <Button onClick={() => handleWishlist(product)}><FavoriteIcon style={{ color: favs.find((x) => x._id == product._id) ? 'red' : 'inherit' }} /></Button>
                                </Col>
                            })}
                        </Row>
                    </div>
                </div>
            </section>


            <section id={styles.customers}>
                <div className="container">
                    <div className={styles.customers}>
                        <h3>Customers Say</h3>
                        <h1>REVIEW</h1>
                        <img src="https://preview.colorlib.com/theme/pato/images/avatar-05.jpg" alt="" />
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum natus aliquam culpa placeat omnis accusamus? Corrupti eveniet quaerat sed repellendus?</p>
                        <StarIcon style={{ color: 'red' }} />
                        <StarIcon style={{ color: 'red' }} />
                        <StarIcon style={{ color: 'red' }} />
                        <StarIcon style={{ color: 'red' }} />
                        <StarIcon style={{ color: 'red' }} />
                    </div>
                </div>
            </section>


            <section id={styles.blog}>
                <div className="container">
                    <div className={styles.blog}>
                        <div className={styles.headingB}>
                            <h3>Latest News</h3>
                            <h1>THE BLOG</h1>
                        </div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <img width={'300px'} src="https://preview.colorlib.com/theme/pato/images/blog-01.jpg" alt="" />
                                <h2>BEST PLACES FOR WINE</h2>
                                <p>Phasellus lorem enim, luctus ut velit eget, con-vallis egestas eros.</p>
                                <a href="#">CONTINUE READING </a>
                            </Col>

                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <img width={'300px'} src="https://preview.colorlib.com/theme/pato/images/blog-02.jpg" alt="" />
                                <h2>EGGS AND CHEESE</h2>
                                <p>Duis elementum, risus sit amet lobortis nunc justo condimentum ligula, vitae feugiat</p>
                                <a href="#">CONTINUE READING </a>
                            </Col>

                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <img width={'300px'} src="https://preview.colorlib.com/theme/pato/images/blog-03.jpg" alt="" />
                                <h2>STYLE THE WEDDING PARTY</h2>
                                <p>Sed ornare ligula eget tortor tempor, quis porta tellus dictum.</p>
                                <a href="#">CONTINUE READING </a>
                            </Col>

                        </Row>
                    </div>
                </div>
            </section>

            <section style={{ marginTop: '150px' }} id={styles.sign}>
                <div className="container">
                    <div className={styles.sign}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <h3>SPECIALS SIGN UP</h3>
                            </Col>

                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                            </Col>

                            <Col className="gutter-row" span={6} xs={24} md={12} lg={8}>
                                <button>Sign-Up</button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home