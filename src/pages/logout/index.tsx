import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function AuthCallback() {
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    useEffect(()=>{
        if(!router.isReady) return;

        removeCookie('token');
        window.location.href = '/';
    }, [router.isReady, router.query, removeCookie]);
    
    return (<></>);
  }
  