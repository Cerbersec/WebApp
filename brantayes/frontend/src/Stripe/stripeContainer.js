//STRIPE TEST KEY SAM: pk_test_51HrjMQAhYVhfBMPgiJOlGVoQVTCtytMCzQmKcwhTNeIAdpHFdHTqDr9I2fxT2VopxfvOZFSg24wl0Ab4CCBlTIi6005qykfakb
//STRIPE TEST KEY SANDER: pk_test_51HsWiuEGWfldFJu67udyAjf2iYKc101tgkLEbRbxwt5pdQbCOWNCWXDwLgMC9xfzP7yCrHsbAu5G4n38Z3Bf3wdL00sNTFagh3
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./checkoutForm";

const PUBLIC_KEY = "pk_test_51HsWiuEGWfldFJu67udyAjf2iYKc101tgkLEbRbxwt5pdQbCOWNCWXDwLgMC9xfzP7yCrHsbAu5G4n38Z3Bf3wdL00sNTFagh3";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = (orderId) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm orderId={orderId}/>
    </Elements>
  );
};

export default Stripe;