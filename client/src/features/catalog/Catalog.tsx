import { Product } from '../../app/models/products'
import { Button } from '@mui/material';
import { ProductList } from './ProductList';
import { useState, useEffect } from 'react';


export const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5126/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    //   const addProduct = () => {
    //     setProducts(prevState => [...prevState, {
    //       id: prevState.length + 101,
    //       name: "product " + (prevState.length + 1),
    //       price: (prevState.length * 100 + 100),
    //       brand: "some brand",
    //       description: "some description",
    //       pictureUrl: "http://picsum.photos/200"
    //     }])
    //   }

    return (
        <>
            <ProductList products={products} />
            {/* <Button variant='contained' onClick={addProduct}>Add</Button> */}
            <Button variant='contained' >Add</Button>
        </>
    )
}
