import { createContext, useEffect, useState } from "react";
import type { CreatorResponse } from "../../api/get-all-posts";
import { getDataCreatorByToken } from "../../api/get-creator-data-by-token";
import { getAuthenticated } from "../../api/get-authenticated";

interface AdminContextType {
  creatorId: string | undefined;
  username: string | undefined;
  imageProfileUrl: string | undefined;
  authenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean) => void
  setCreatorId: (value: string) => void
  setUsername: (value: string) => void
  setImageProfileUrl: (value: string | undefined) => void
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [creatorId, setCreatorId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [imageProfileUrl, setImageProfileUrl] = useState<
    string | undefined
  >(undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIsAuthenticated = async () => {
      const isAuthenticated = await getAuthenticated();
      if (isAuthenticated) {
        setAuthenticated(true);
        const data = await getDataCreatorByToken<CreatorResponse>();
        if (data) {
          const { imageProfileUrl, username, id } = data;
          setCreatorId(id);
          setUsername(username);
          setImageProfileUrl(imageProfileUrl);
        }
      }
      setLoading(false);
    };
    fetchIsAuthenticated();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        creatorId,
        username,
        imageProfileUrl,
        authenticated,
        loading,
        setAuthenticated,
        setCreatorId,
        setUsername,
        setImageProfileUrl
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
