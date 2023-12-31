import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/products';
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import agent from '../../app/api/agent';
import { NotFound } from '../../app/errors/NotFound';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeItem, setBasket } from '../basket/basketSlice';

export const ProductDetails = () => {
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting , setSubmitting] = useState(false);
    const item = basket?.itemDtos.find(i => i.productId === product?.id);


    useEffect(() =>{
        if(item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(error => console.log(error + "here!!!"))
        .finally(() => setLoading(false))
    },[id, item])

    function handleInputChange(event: any){
        if(event.target.value >= 0 ){
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        setSubmitting(true)
        //??
        if(!item || quantity > item.quantity)
        {
            console.log("added")
            console.log("item" , item)
            console.log("quantity" , quantity + "-"+ item?.quantity)
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            console.log("updatedQuantity" , updatedQuantity)
            agent.Basket.addItem(product?.id!, updatedQuantity)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(()=> setSubmitting(false))
        }else{
            console.log("subtracted")
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updatedQuantity)
            .then(() => dispatch(removeItem({productId : product?.id!, quantity: updatedQuantity})))
            .catch(error => console.log(error))
            .finally(()=> setSubmitting(false))
        }
    }

    if(loading) return <LoadingComponent message="Loading item details" />
    if(!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField onChange={handleInputChange} variant="outlined" type="number" label="Quantity in Cart" fullWidth value={quantity} />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                        disabled={item?.quantity === quantity || !item && quantity === 0}
                        loading={submitting}
                        onClick={handleUpdateCart}
                            sx={{height: '55px' }}
                            color="primary"
                            size='large'
                            variant='contained'
                        >
                            {item ? 'Update quantity' : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
