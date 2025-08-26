import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { IUser, TRole } from "@/types/user.types";

import { Loader2 } from "lucide-react";
import { Navigate } from "react-router";

export default function withAuth(Component: React.ComponentType, requiredRoles?: TRole[]) {
  return function AuthWrapper() {
    const { data: userData, isLoading } = useUserInfoQuery();
    const user: IUser = userData?.data ?? ({} as IUser);

    if (isLoading) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 size={20} className="animate-spin" />
        </div>
      );
    }

    if (!user.email) {
      return <Navigate to="/login" />;
    }

    if (
      !isLoading &&
      requiredRoles &&
      requiredRoles.length > 0 &&
      (!user.role || !requiredRoles.includes(user.role as TRole))
    ) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
}
