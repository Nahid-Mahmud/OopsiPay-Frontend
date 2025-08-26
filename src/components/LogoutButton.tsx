import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/baseApi";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    // remove user session form cookie
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // console.log("User logged out");
    await logout({}).unwrap();
    dispatch(baseApi.util.resetApiState());
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variant={"destructive"} className="cursor-pointer">
      Logout
    </Button>
  );
}
