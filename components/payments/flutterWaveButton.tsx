import React from "react";
import Button from "../Button";
import FlutterImage from "./icons/flutterwave.svg";
import Image from "next/image";
import useCart from "@/hooks/useCart";

import axios from "axios";
import { useUserDetails } from "@/hooks/useUserDetails";

const PaymentFlutterWaveButton = () => {
  const items = useCart((state) => state.items);
  const userData = useUserDetails();

  // Total Price
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // Checkout function
  const onCheckOut = async (hasPaid: boolean) => {
    // Send all the required data for the various
    // field for flutterwave payment integration
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/flutterwave`,
      {
        productIds: items.map((item) => item.id),
        amount: totalPrice,
        hasPaid,
        redirectUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cart`,
        customer: {
          email: userData.details.email,
          phoneNumber: userData.details.phoneNumber,
          address: userData.details.address,
          name: `${userData.details.firstName} ${userData.details.lastName}`,
        },
      }
    );

    const data = response.data;

    if (response.status === 200) {
      location.href = data.url;
    }
  };

  // 4578060000497519

  // 5399237045380504

  return (
    <Button
      className="w-full mt-6 bg-[#ff9b00] relative flex justify-center items-center"
      onClick={() => {
        onCheckOut(false);
      }}
    >
      <Image height={30} src={FlutterImage} alt="flutterwave" />
    </Button>
  );
};

export default PaymentFlutterWaveButton;
