import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formSchema = z
    .object({
      name: z.string().min(3, "Must be 3 characters long"),
      email: z.string().email(),
      password: z.string().min(8, "Password must be 8 characters long"),
      confirmpassword: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Passwords do not match.",
      path: ["confirmpassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values) {
    setError("");
    try {
      const { name, email, password } = values;
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/signup`,
        { name, email, password }
      );
      navigate("/login");
      // Optionally show a success toast here
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Sign up failed"
      );
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5 ">
          Create Your Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center mb-2">{error}</div>
            )}
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
              <p>Already have an Account?</p>
              <Link className="text-blue-600 hover:underline" to="/login">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;