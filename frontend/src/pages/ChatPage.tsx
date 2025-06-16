import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStreamToken } from "../utils/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import toast from "react-hot-toast";
import { StreamChat, Channel as ChannelType } from "stream-chat";
import { ArrowLeft } from "lucide-react";
// import CallBtn from "../components/CallBtn";
// import ChatLoader from "../components/ChatLoader";

const ChatPage = () => {
  const { id } = useParams();
  const STREAM_API_KEY = 'v59mpffgtjux';
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState<{ token: string } | null>(null);

  const authUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  useEffect(() => {
    const fetchToken = async () => {
      if (!authUser) return;

      try {
        const token = await getStreamToken();
        setTokenData(token);
      } catch (err) {
        console.error("Failed to fetch stream token", err);
      }
    };

    fetchToken();
  }, [authUser]);
  useEffect(() => {
    const initChat = async () => {

      if (!authUser || !tokenData?.token || !id) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser.id,
            name: authUser.name, // or `authUser.name` if that's what you use
          },
          tokenData.token
        );

        const channelId = [authUser.id, id].sort().join("-");
        const newChannel = client.channel("messaging", channelId, {
          members: [authUser.id, id],
        });

        await newChannel.watch();

        setChatClient(client);
        setChannel(newChannel);
      } catch (error) {
        console.error("Chat init error", error);
        toast.error("Error initializing chat");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, [authUser, tokenData, id]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `📞 Join the video call: ${callUrl}`,
      });
      toast.success("Video call link sent");
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-base-300 shadow">
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
      </div>

      {chatClient && channel && (
        <Chat client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            <div className="w-full relative">
              {/* <CallBtn handleVideoCall={handleVideoCall} /> */}
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      )}
    </div>
  );
};

export default ChatPage;
