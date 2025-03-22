import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getCurrent, profilePicture } from "@osdk/foundry.admin/User";
import { platformClient } from "../../../main";
import { User } from "@osdk/foundry.admin";
import { BookMarkedIcon, FocusIcon, ScanSearchIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

function UserMenu() {
  const [user, setUser] = useState<User>();
  const [profilePictureBase64, setProfilePictureBase64] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await getCurrent(platformClient);

      setUser(result);

      const profilePictureBlob = await profilePicture(
        platformClient,
        result.id
      );

      if (!profilePictureBlob) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setProfilePictureBase64(base64data);
      };
      reader.readAsDataURL(await profilePictureBlob.blob());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-sm bg-gray-200 flex items-center justify-center animate-pulse" />
        <div className="text-xs bg-gray-200 h-3 w-10 rounded-sm animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 w-fit">
      {profilePictureBase64 ? (
        <img
          className="h-6 w-6 rounded-sm"
          src={profilePictureBase64}
          alt="Profile"
        />
      ) : (
        <div className="h-6 w-6 rounded-sm bg-gray-200 flex items-center justify-center">
          <p className="text-xs">{user?.givenName?.charAt(0)}</p>
        </div>
      )}
      <p className="text-xs">{user?.givenName}</p>
    </div>
  );
}

export function ApplicationHeader() {
  const { pathname } = useLocation();

  const isLibrary = pathname === "/library";
  const isDiscover = pathname.includes("/discover");
  const isFocus = pathname === "/focus";
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-200">
      <div className="w-1/4">
        <UserMenu />
      </div>
      <div className="w-1/2 flex justify-center gap-6 text-zinc-500">
        <Link
          to="/discover"
          className={cn("flex items-center gap-2 p-2 px-4 rounded-full", {
            "bg-zinc-100 text-black": isDiscover,
          })}
        >
          <ScanSearchIcon className="w-4 h-4" />
          <h1 className="text-xs">Discover Papers</h1>
        </Link>
        <Link
          to="/library"
          className={cn("flex items-center gap-2 p-2 px-4 rounded-full", {
            "bg-zinc-100 text-black": isLibrary,
          })}
        >
          <BookMarkedIcon className="w-4 h-4" />
          <h1 className="text-xs">Your Library</h1>
        </Link>
        <Link
          to="/focus"
          className={cn("flex items-center gap-2 p-2 px-4 rounded-full", {
            "bg-zinc-100 text-black": isFocus,
          })}
        >
          <FocusIcon className="w-4 h-4" />
          <h1 className="text-xs">Focused Research</h1>
        </Link>
      </div>
      <div className="w-1/4" />
    </header>
  );
}
