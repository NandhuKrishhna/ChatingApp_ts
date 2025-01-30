import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import  Sidebar  from '../components/SideBar';

const Home = () => {
  const selectedUser = useSelector((state:RootState)=> state.chat.selectedUser)
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
