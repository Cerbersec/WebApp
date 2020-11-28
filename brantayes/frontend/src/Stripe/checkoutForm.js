import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Api from "../Api";

export const CheckoutForm = (orderId) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
        console.log("Stripe 23 | token generated!", paymentMethod);
        //send token to backend here
        //token = paymentMethod
        try {
            const { id } = paymentMethod;
            const data = {
                id: id,
                order_id: orderId,
            }
            const response = await Api.pay(data)

            if(response.data.success) {
                alert("payment success")
                window.location.href = window.location.href.split("/")[0] + "/"
            }
        }
        catch(error) {
            alert(error.message)
        }

    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement hidePostalCode={true}/>
      <button>Pay</button>
    </form>
  );
};