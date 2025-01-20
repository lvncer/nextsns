"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RocketIcon from "@mui/icons-material/Rocket";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

const Topbar: React.FC = () => {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      try {
        logoutUser();
        router.replace("/");
      } catch (error) {
        alert("ログアウトに失敗しました。もう一度お試しください。");
        router.refresh();
      }
    }
  };

  return (
    <div className="bg-gray-800 h-16 w-full flex items-center sticky top-0 z-20 backdrop-blur border-b border-gray-300">
      <SidebarTrigger className="ml-5" />

      <div className="text-gray-200 flex-1 flex items-center justify-start space-x-4 ml-5 xl:ml-60">
        <Link href="/home" className="ml-2 text-2xl">
          Next SNS
        </Link>
      </div>

      {/* 右側のアイコンとログアウトボタン */}
      <div className="flex-1 flex items-center justify-end space-x-4 mr-5 xl:mr-80">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="user-icon">
              {user.profilePicture ? (
                <RocketIcon className="text-gray-200" />
              ) : (
                <PersonIcon className="text-gray-200" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: "/profile",
                    query: user.username ? { username: user.username } : {},
                  }}
                >
                  <PersonOutlineIcon className="-ml-1 mr-1"/>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogoutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={{ pathname: "/login" }} className="flex items-center">
            <LoginIcon className="mr-2 text-gray-100" />
            <div className="text-gray-100 mb-0.5">Login</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
