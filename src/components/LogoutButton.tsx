import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/baseApi";
import { toast } from "sonner";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    // remove user session form cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    try {
      await logout({}).unwrap();
      dispatch(baseApi.util.resetApiState());
      navigate("/login");
      toast.success("Logout successful!");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }

    // console.log("User logged out");
  };

  return (
    <Button id="logout-button" onClick={handleLogout} variant={"destructive"} className="cursor-pointer">
      Logout
    </Button>
  );
}
