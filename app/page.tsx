import { createClient} from '@/app/utils/supabase/server'
import { cookies } from 'next/headers'
import error from "next/error";
import AuthButton from './auth-button';


export default async function Home() {
  const supabase = createClient();
  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <>
      <AuthButton />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>;
    </>
  );
}
