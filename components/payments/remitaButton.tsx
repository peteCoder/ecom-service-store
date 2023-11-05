import React from "react";
import Button from "../Button";
import RemitaImage from './icons/remita_logo_white.png'
import Image from "next/image";

const PaymentRemitaButton = () => {
  return (
    <Button
      className="w-full mt-6 bg-[#c74923] relative flex justify-center items-center"
      onClick={() => {}}
    >
      <Image height={30} src={RemitaImage} alt="remita" />
    </Button>
  );
};

export default PaymentRemitaButton;
