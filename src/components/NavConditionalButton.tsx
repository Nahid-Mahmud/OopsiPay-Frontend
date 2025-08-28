import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { useEffect, useState, memo } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

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

  const navigationRoute = userRole === "USER" ? "/user" : userRole === "AGENT" ? "/agent" : "/admin";

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
      <div className="flex items-center justify-center gap-4">
        <Link to={navigationRoute} className="cursor-pointer">
          <Button variant="secondary" className="font-dm-sans font-medium cursor-pointer">
            Dashboard
          </Button>
        </Link>
        <div>
          <ModeToggle />
        </div>
      </div>
    );
  }

  // User is not logged in - show login button
  return (
    <div className="flex items-center justify-center gap-4">
      <Link to="/login" className="cursor-pointer">
        <Button id="navbar-get-started-btn" variant="secondary" className="font-dm-sans font-medium cursor-pointer">
          Get Started
        </Button>
      </Link>
      <div id="navbar-mode-toggle">
        <ModeToggle />
      </div>
    </div>
  );
}

export default memo(NavConditionalButton);
