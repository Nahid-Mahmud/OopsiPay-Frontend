import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { useEffect, useState, memo } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";

function NavConditionalButton() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = document.cookie.split(";").some((item) => item.trim().startsWith("user="));
    setIsUserLoggedIn(isLoggedIn);
  }, []); // Only run once on mount

  const { data: userInfo } = useUserInfoQuery(undefined, {
    skip: !isUserLoggedIn, // Only fetch when user is logged in
  });

  const userRole = userInfo?.data?.role;

  const navigationRoute = userRole === "USER" ? "/admin" : userRole === "AGENT" ? "/agent" : "/user";

  if (isUserLoggedIn === null) {
    // Loading state while checking login status
    return (
      <Button variant="secondary" className="font-dm-sans font-medium cursor-pointer" disabled>
        Loading...
      </Button>
    );
  }

  if (isUserLoggedIn && userInfo?.data && userInfo.data.role) {
    // User is logged in - show user info or dashboard link
    return (
      <Link to={navigationRoute} className="cursor-pointer">
        <Button variant="secondary" className="font-dm-sans font-medium cursor-pointer">
          Dashboard
        </Button>
      </Link>
    );
  }

  // User is not logged in - show login button
  return (
    <Link to="/login" className="cursor-pointer">
      <Button variant="secondary" className="font-dm-sans font-medium cursor-pointer">
        Get Started
      </Button>
    </Link>
  );
}

export default memo(NavConditionalButton);
