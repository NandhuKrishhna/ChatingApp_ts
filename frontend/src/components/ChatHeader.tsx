import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setSelectedUser } from "../redux/slices/chatSlice";
import { X } from "lucide-react";

const ChatHeader = () => {
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state:RootState)=> state.auth.onlineUsers);
    const selectedUser = useSelector((state:RootState)=> state.chat.selectedUser);

    return (
        <div className="p-2.5 border-b border-base-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="avatar">
                <div className="size-10 rounded-full relative">
                  <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.name} />
                </div>
              </div>
    
              {/* User info */}
              <div>
                <h3 className="font-medium">{selectedUser?.name}</h3>
                <p className="text-sm text-base-content/70">
                  {onlineUsers.includes(selectedUser!._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
    
            {/* Close button */}
            <button onClick={() => dispatch(setSelectedUser(null))}>
              <X />
            </button>
          </div>
        </div>
      );
}

export default ChatHeader
