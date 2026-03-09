"use client";
import { useParams } from "next/navigation"
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useRef , useEffect, use } from "react";
const page = () => {
  const { roomid } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
     const myMeeting = async (element:HTMLDivElement) => {
      const appID = 1206353293;
 const serverSecret = "04f3174a7151c6849fc4a17d937ebab9";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid?.toString() || "",  Date.now().toString(), "Niranjan");
 const zp = ZegoUIKitPrebuilt.create(kitToken);
  if (hasJoined.current) return; 
  hasJoined.current = true;

 zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomid,
          },
        ],
        scenario: {
         mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
   });
     }
     useEffect(() => {
      if(!containerRef.current) {
        console.log('container not found')
        return;
      }
        myMeeting(containerRef.current);

      }, [roomid]);

      const hasJoined = useRef(false);
  return (
    <div style={{height:'100vh', width:'100vw'}} ref={containerRef}/>
  )
}

export default page