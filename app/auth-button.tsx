'use client';
import { useState, useEffect } from "react";
import { createClient } from "./utils/supabase/clients";
import { useRouter } from "next/navigation";


export default function AuthButton() {
    const supabase = createClient();
    const router = useRouter();
   

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setSession(null);  // Clear session state on sign out
        router.refresh();
    };

    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: 'http://localhost:3000/auth/callback'
                }
            });
            if (error) {
                console.error('Error during sign in:', error);
            } else {
                console.log('Sign in successful');
                router.refresh();
            }
        } catch (error) {
            console.error('Unexpected error during sign in:', error);
        }
    };

    const [session, setSession] = useState(null);

    return session ? (
        <button onClick={handleSignOut}>Logout</button>
    ) : (
        <button onClick={handleSignIn}>Login</button>
    );
}
