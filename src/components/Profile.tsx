import React, { useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Camera, Loader2, Save, Shield, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Profile update validation schema
const profileUpdateValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default function Profile() {
  const { data: userInfo, isLoading: isLoadingUserInfo, isError } = useUserInfoQuery();
  const [updateUserFn, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof profileUpdateValidationSchema>>({
    resolver: zodResolver(profileUpdateValidationSchema),
    defaultValues: {
      firstName: userInfo?.data?.firstName || "",
      lastName: userInfo?.data?.lastName || "",
      phone: userInfo?.data?.phone || "",
      address: userInfo?.data?.address || "",
    },
  });

  // Update form when userInfo loads
  useEffect(() => {
    if (userInfo?.data) {
      form.reset({
        firstName: userInfo.data.firstName,
        lastName: userInfo.data.lastName,
        phone: userInfo.data.phone || "",
        address: userInfo.data.address || "",
      });
    }
  }, [userInfo, form]);

  const userData = userInfo?.data;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formdata = new FormData();

    if (file && userData) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }

      formdata.append("file", file);

      if (userData.profilePicture) {
        formdata.append("deleteImages[]", userData.profilePicture);
      }

      try {
        const res = await updateUserFn({ data: formdata, id: userData._id }).unwrap();
        if (res.success) {
          toast.success("Profile picture updated successfully!");
        }
      } catch (error) {
        toast.error("Failed to upload image");
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof profileUpdateValidationSchema>) => {
    if (!userData) {
      toast.error("User data not available");
      return;
    }

    const formData = new FormData();
    const reformedData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
    };

    formData.append("data", JSON.stringify(reformedData));

    try {
      const res = await updateUserFn({ data: formData, id: userData._id }).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Skeleton component for profile overview
  const ProfileOverviewSkeleton = () => (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar skeleton */}
          <div className="relative group">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="absolute bottom-2 right-2">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>

          {/* Name and role skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-6 w-20 mx-auto rounded-full" />
          </div>

          {/* Stats section skeleton */}
          <div className="w-full pt-4 border-t space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Skeleton component for profile form
  const ProfileFormSkeleton = () => (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-96 mt-2" />
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Name fields skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Email field skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-md" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Phone and address fields skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>

        {/* Image upload info skeleton */}
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </div>

        {/* Save button skeleton */}
        <div className="flex justify-end pt-6 border-t">
          <Skeleton className="h-12 w-36 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );

  // Show loading skeleton while user info is being fetched
  if (isLoadingUserInfo) {
    return (
      <div className="bg-gradient-to-br from-background via-card/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ProfileOverviewSkeleton />
            </div>
            <div className="lg:col-span-2">
              <ProfileFormSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error fetching user data
  if (isError || !userData) {
    return (
      <div className="bg-gradient-to-br from-background via-card/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-destructive">Error Loading Profile</h2>
              <p className="text-muted-foreground">
                We couldn't load your profile information. Please try refreshing the page.
              </p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline" className="min-w-[120px]">
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-background via-card/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                      <AvatarImage src={userData?.profilePicture || undefined} className="object-cover" />
                      <AvatarFallback className="text-2xl font-serif bg-gradient-to-br from-primary/20 to-accent/20">
                        {isUpdating ? (
                          <Loader2 className="h-8 w-8 animate-spin" />
                        ) : (
                          getInitials(userData?.firstName || "U", userData?.lastName || "U")
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profile-image"
                      className={`absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-3 cursor-pointer hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${
                        isUpdating ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                    </label>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdating}
                      className="hidden"
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-serif font-bold">
                      {userData?.firstName} {userData?.lastName}
                    </h2>
                    <Badge variant="secondary" className="text-sm font-medium">
                      <Shield className="h-3 w-3 mr-1" />
                      {userData?.role}
                    </Badge>
                  </div>

                  <div className="w-full pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Member Since
                      </span>
                      <span className="font-medium">
                        {userData?.createdAt &&
                          new Date(userData.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">
                        {userData?.updatedAt &&
                          new Date(userData.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-serif flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  Personal Information
                </CardTitle>
                <CardDescription className="text-base">
                  Update your personal details. Your email address cannot be changed for security reasons.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 relative">
                {/* Loading overlay for form when updating */}
                {isUpdating && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                    <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-lg">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-sm font-medium">Updating profile...</span>
                    </div>
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">This is your first name.</FormDescription>
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
                                placeholder="Enter your last name"
                                className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">This is your last name.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-3">
                      <FormLabel htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </FormLabel>
                      <Input
                        id="email"
                        value={userData?.email || ""}
                        disabled
                        className="h-12 bg-muted/50 cursor-not-allowed opacity-75"
                      />
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Email address cannot be changed for security reasons
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">This is your phone number.</FormDescription>
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
                              <Input
                                placeholder="Enter your address"
                                className="h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                disabled={isUpdating}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="sr-only">This is your address.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Image Upload Instructions */}
                    <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                      <div className="flex items-start gap-3">
                        <Camera className="h-5 w-5 text-accent mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Profile Picture</p>
                          <p className="text-sm text-muted-foreground">
                            Click the camera icon on your avatar to upload a new profile picture. Maximum file size:
                            5MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6 border-t">
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        size="lg"
                        className="min-w-[140px] h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isUpdating ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
