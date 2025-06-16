import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
  Call,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import { getStreamToken } from "../utils/api";
import { useUserAuth } from "../hooks/useUserAuth"; // <- Make sure this exists and is typed

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useUserAuth();
  const navigate = useNavigate();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullname,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error initializing call:", error);
        toast.error("Could not connect to video call.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    // Cleanup on unmount
    return () => {
      if (client) client.disconnectUser();
    };
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) {
    return <div className="text-center mt-20">Connecting to the call...</div>;
  }

  return (
    <div className="h-screen w-screen">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Could not join call. Try again later.</p>
        </div>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { authUser } = useUserAuth();
  const { id: callId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      if (callId && authUser?._id) {
        const [id1, id2] = callId.split("-");
        const otherUserId = id1 === authUser._id ? id2 : id1;
        navigate(`/chat/${otherUserId}`);
      } else {
        navigate("/");
      }
    }
  }, [callingState, callId, authUser, navigate]);

  return (
    <StreamTheme>
      <div className="h-full">
        <SpeakerLayout />
        <CallControls />
      </div>
    </StreamTheme>
  );
};

export default CallPage;
