import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography, Grid } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    
    const {basket} = useStoreContext();
    const subtotal = basket?.itemDtos.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    // const [subtotal, setSubtotal] = useState<number | undefined>(0);
    // const [deliveryFee, setDeliveryFee] = useState<number>(500);

    // useEffect(()=> {
    //     const actualPrice = basket?.itemDtos.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    //      setSubtotal(actualPrice);
    //      if (actualPrice! > 10000) {
    //         setDeliveryFee(0);
    //      }
    //      if (actualPrice! <= 10000) {
    //         setDeliveryFee(500);
    //      }
    // },[basket])
    
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal!)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal! + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}