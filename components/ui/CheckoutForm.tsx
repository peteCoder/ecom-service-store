"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import PaymentFlutterWaveButton from "../payments/flutterWaveButton";
import PaystackButton from "../payments/paystackButton";
import useCart from "@/hooks/useCart";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserDetails } from "@/hooks/useUserDetails";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

const CheckoutForm = () => {
  const items = useCart((state) => state.items);
  const user = useUserDetails();

  const userDetailWasAdded: boolean =
    !!user.details.email &&
    !!user.details.firstName &&
    !!user.details.lastName &&
    !!user.details.address &&
    !!user.details.phoneNumber;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPaymentButtons, setShowPaymentButtons] = useState<boolean>(false);
  // Checkout function
  //   const onCheckOut = async () => {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //       {
  //         productIds: items.map((item) => item.id),
  //         paid: false,
  //       }
  //     );
  //     window.location = response.data.url;
  //   };

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.details.email,
      firstName: user.details.firstName,
      lastName: user.details.lastName,
      address: user.details.address,
      phoneNumber: user.details.phoneNumber,
    },
  });

  // Form handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    setTimeout(() => {
      // console.log(values);
      user.setUserDetail(values);
      setShowPaymentButtons(true);
      setIsLoading(false);
    }, 1000);
  }

  const clearUserData = () => {
    user.removeUserDetail();
    form.setValue("email", "");
    form.setValue("firstName", "");
    form.setValue("lastName", "");
    form.setValue("address", "");
    form.setValue("phoneNumber", "");
    setShowPaymentButtons(false);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex item-center justify-between flex-wrap mt-9">
            <h2 className="font-bold text-left text-xl">Contact information</h2>
            <Button
              onClick={clearUserData}
              className="px-2 py-2 text-sm bg-transparent hover:underline text-zinc-600 hover:text-zinc-600"
            >
              Clear
            </Button>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={showPaymentButtons}
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a valid email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={showPaymentButtons}
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={showPaymentButtons}
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={showPaymentButtons}
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a valid phone number. This is how we contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={showPaymentButtons}
                    className="resize-none"
                    placeholder="Enter a valid address."
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!showPaymentButtons && (
            <Button
              className="w-full mt-6 flex items-center justify-center min-h-[48px]"
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span>Check out</span>
              )}
            </Button>
          )}

          {showPaymentButtons ? (
            <>
              <PaymentFlutterWaveButton />
              <PaystackButton />
            </>
          ) : null}
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
