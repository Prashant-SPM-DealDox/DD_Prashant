import React from "react";
import { baseUrl } from "../../config";
import Stripe from "react-stripe-checkout";

function Stripes() {
  const handleToken = async (totalAmount, token) => {
    try {
      const response = await fetch(`${baseUrl}/api/stripe/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id,
          amount: totalAmount,
        }),
      });

      // If you want to do something with the response data
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
    //   console.log(error);
    }
  };

  const tokenHandler = (token) => {
    handleToken(100, token);
  };

  return (
    <div>
      <Stripe
        stripeKey="pk_test_51NUmoXSEorLp1KWgY42Sv9RxmKihYKxUdtQtaaVcpYiFNsPKG55TFFzt1cCBG22o8jQIvSX7sg0OEvDJ8EC7ADoQ00JQeLRZ3s"
        token={tokenHandler}
      />
    </div>
  );
}

export default Stripes;
