import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  showCartDlg,
  deleteCartItem,
  updateCartItemQnt
} from "../../Redux/Actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const CartRow = props => {
  let { item } = props;

  const minVal = parseInt(item.size.split('-')[0]);
  const maxVal = parseInt(item.size.split('-')[1]);

  if(typeof(item.selectedSize) === 'undefined')
  {
    item.selectedSize = minVal;
  }

  return (
    <TableRow>
      <TableCell>
        <Link to={`/details/${item.product_id}`}>
          <div
            onClick={() => {
              props.dispatch(showCartDlg(false));
            }}
          >
            {item.name}
          </div>
        </Link>
      </TableCell>
          <TableCell>
            <img src={item.image_url}
            alt=""
            height={35}
            ></img>
          </TableCell>
      <TableCell style={{ padding: 12 }}>{"€ " + item.retail_price}</TableCell>
      <TableCell>
        <TextField
          type="number"
          InputProps={{ inputProps: { min: minVal, max: maxVal } }}
          style={{ width: 40 }}
          value={item.selectedSize}
          onChangeCommited={e => {
            let size = parseInt(e.target.value, 10);
            props.dispatch(
              //change shoe size
            );
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          style={{ width: 40 }}
          value={item.quantity}
          onChange={e => {
            let quantity = parseInt(e.target.value, 10);
            if (quantity < 0) return;
            props.dispatch(
              updateCartItemQnt({
                id: item.product_id,
                quantity
              })
            );
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          onClick={() => {
            props.dispatch(deleteCartItem(item.product_id));
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
