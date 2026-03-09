"use client";

import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";

export default function Page() {

  const { roomid } = useParams();

  const meetingRef = useRef<HTMLDivElement | null>(null);
  const hasJoined = useRef(false);
  const zpRef = useRef<any>(null);

  useEffect(() => {

    if (hasJoined.current) return; // prevents duplicate join
    hasJoined.current = true;

    const initMeeting = async () => {

      if (!meetingRef.current) return;

      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");

      const appID = 1206353293;
      const serverSecret = "04f3174a7151c6849fc4a17d937ebab9";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomid as string,
        Date.now().toString(),
        "Niranjan"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zpRef.current = zp;

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}/room/${roomid}`,
          },
        ],
      });
    };

    initMeeting();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };

  }, [roomid]);

  return (
    <div
      ref={meetingRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}