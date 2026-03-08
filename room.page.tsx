"use client";   
import styles from "./page.module.css";
import{ useRef, useState } from "react";
import{useRouter} from "next/navigation";
export default function Home() {
const roomId = useRef<HTMLInputElement>(null);
const router = useRouter();
  return (

    <div className={styles.main}>
      <input type="text" className={styles.input} placeholder="Enter meeting id" ref={roomId} />
      <button className={styles.button} type="submit" onClick={()=> router.push( `/room/${roomId.current?.value}`)}>Join</button> 
    </div>
    
  );
}
