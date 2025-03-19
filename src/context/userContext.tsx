import { createContext, useContext, useEffect,useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContext>(null!);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Hole den aktuellen Benutzer
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Abonniere Auth-Änderungen
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
