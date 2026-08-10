import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "../../config/config";
import { 
  MessageSquare, 
  ArrowLeft, 
  Mail, 
  User, 
  Calendar, 
  Trash2,
  Inbox
} from "lucide-react";
import { toast } from "sonner";

export default function AdminMessagesPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/message`);
      const data = res.data.data || res.data;
      const messageList = Array.isArray(data) ? data : [];
      setMessages(messageList);
      
      // Default to selecting the first message if available and none selected
      if (messageList.length > 0 && !selectedMessage) {
        setSelectedMessage(messageList[0]);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      toast.error("Failed to load messages from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await axios.delete(`${API_URL}/message/${id}`);
      toast.success("Message deleted successfully!");
      
      const updatedMessages = messages.filter((msg) => (msg._id || msg.id) !== id);
      setMessages(updatedMessages);

      if (selectedMessage && (selectedMessage._id || selectedMessage.id) === id) {
        setSelectedMessage(updatedMessages.length > 0 ? updatedMessages[0] : null);
      }
    } catch (err: any) {
      console.error("Error deleting message:", err);
      toast.error(err.response?.data?.message || "Failed to delete message.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Client Messages</h1>
          <p className="text-slate-400 text-xs mt-0.5">API Endpoint: <code>http://localhost:8005/api/v1/message</code></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Message List / Emails */}
        <div className="md:col-span-5 bg-slate-800/60 border border-slate-700/80 rounded-3xl p-4 backdrop-blur-xl h-[600px] flex flex-col">
          <div className="px-3 py-2 border-b border-slate-700/80 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Inbox size={15} /> Inbox ({messages.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pt-3 pr-1">
            {loading ? (
              <p className="text-center text-slate-400 text-xs py-8">Loading messages...</p>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <MessageSquare className="mx-auto text-slate-600" size={28} />
                <p className="text-slate-400 text-xs">No messages found.</p>
              </div>
            ) : (
              messages.map((msg) => {
                const msgId = msg._id || msg.id;
                const isSelected = selectedMessage && (selectedMessage._id || selectedMessage.id) === msgId;
                
                return (
                  <div
                    key={msgId}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-blue-600/15 border-blue-500/50 text-white shadow-lg shadow-blue-600/10"
                        : "bg-slate-900/50 border-slate-700/60 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div className="min-w-0 space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white truncate">{msg.name || "Unknown"}</p>
                        <span className="text-[10px] text-slate-400">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-blue-400 truncate">{msg.email}</p>
                      <p className="text-[11px] text-slate-400 truncate font-semibold">Subject: {msg.subject || "No Subject"}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDelete(msgId, e)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                      title="Delete Message"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="md:col-span-7 bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl h-[600px] flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6 overflow-y-auto pr-2">
              <div className="flex items-start justify-between border-b border-slate-700/80 pb-5">
                <div>
                  <h2 className="text-lg font-extrabold text-white">{selectedMessage.subject || "No Subject"}</h2>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Calendar size={13} /> {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage._id || selectedMessage.id)}
                  className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/50 border border-slate-700/60 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Sender Name</p>
                    <p className="text-xs font-bold text-white">{selectedMessage.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Email Address</p>
                    <a href={`mailto:${selectedMessage.email}`} className="text-xs font-bold text-blue-400 hover:underline">
                      {selectedMessage.email || "N/A"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Content:</p>
                <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap min-h-[160px]">
                  {selectedMessage.message || "No content provided."}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-slate-500">
              <MessageSquare size={36} className="text-slate-600" />
              <p className="text-xs font-semibold">Select an email from the list to view full details.</p>
            </div>
          )}

          {selectedMessage && (
            <div className="pt-4 border-t border-slate-700/80 flex justify-end">
              <a 
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || ""}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <Mail size={15} /> Reply via Email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}