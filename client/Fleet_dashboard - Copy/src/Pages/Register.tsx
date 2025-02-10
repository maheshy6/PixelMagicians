import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const registrationSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    // In your form schema
    dateOfBirth: z
      .string()
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Invalid date format (DD-MM-YYYY required)",
      })
      .refine(
        (val) => {
          const date = new Date(val);
          return date < new Date();
        },
        {
          message: "Date must be in the past",
        }
      )
      .refine(
        (val) => {
          const dobDate = new Date(val);
          const today = new Date();
          const minDobDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
          );
          return dobDate <= minDobDate;
        },
        {
          message: "You must be at least 18 years old",
        }
      ),
    contactNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    emailAddress: z.string().email("Invalid email address"),
    profilePhoto: z.instanceof(File).optional(),

    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),

    driverLicenseNumber: z.string().min(6, "License number is required"),
    licenseExpiry: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    }, "License must be valid"),
    assignedVehicle: z.string().optional(),

    emergencyContactName: z
      .string()
      .min(2, "Emergency contact name is required"),
    emergencyContactNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid contact number"),
    emergencyContactRelationship: z.string().min(2, "Relationship is required"),

    employeeId: z.string().optional(),
    dateOfJoining: z.string().optional(),
    shiftTiming: z.string().optional(),

    currentAddress: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),

    drivingExperience: z.string().optional(),
    preferredRoutes: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

const DriverRegistration: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      contactNumber: "",
      emailAddress: "",
      username: "",
      password: "",
      confirmPassword: "",
      driverLicenseNumber: "",
      licenseExpiry: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      emergencyContactRelationship: "",
      currentAddress: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    const submissionData = {
      ...data,
      profilePhoto: profilePhoto as File | undefined,
    };
    console.log("Registration Data:", submissionData);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };
  {/*post request */}
  const [data, getData] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "_id": "678ba11ddf924b196e4cb445",
      "username": "Shivam",
      "email": "shivam@gmail.com",
      "password": "$argon2id$v=19$m=65536,t=3,p=4$u24BVSP6UkruwjrkA+8k3g$owzQZPPpce47j44A18d2vmf4DRP1DBwjTur34m4EGk6",
      "__v": 3
    });

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://traffic-relief-dashboard.onrender.com/api/users", requestOptions)
      .then((response) => response.json())
      .then((result) => getData(result))
      .catch((error) => console.error(error));
  }, []);

  // Example usage
  console.log(data);
  
  // Example usage
 // console.log(createUser("shiva", "shiv@gmail.com", "shiva"));
console.log(data)
  return (
    <>

    <div className="max-w-4xl mx-auto p-6">

      <Card>
        <CardHeader>
          <CardTitle>Driver Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
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
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </FormControl>
                </FormItem>
              </div>

              {/* Account Credentials */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Vehicle & License Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="driverLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver's License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="License Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignedVehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Vehicle (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle Details" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Emergency Contact */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyContactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergencyContactRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Employment Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Employee ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfJoining"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Joining</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shiftTiming"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift Timing</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="night">Night</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="currentAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Current Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Street Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Additional sections similarly structured */}

              <Button type="submit" className="w-full">
                Submit Registration
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default DriverRegistration;
