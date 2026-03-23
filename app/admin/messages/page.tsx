"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MessageSquare, Mail, Phone, Calendar, Trash2, CheckCircle, Loader2 } from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const snap = await getDocs(collection(db, "messages"));
      const msgs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by newest first
      setMessages(msgs.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setLoading(false);
  }

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "messages", id), { status: "Read" });
      setMessages(messages.map(m => m.id === id ? { ...m, status: "Read" } : m));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(messages.filter(m => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-emerald-600" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Contact Messages</h1>
          <p className="text-gray-500 mt-2">View and manage inquiries sent through the contact form.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold text-sm border border-emerald-100 flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          {messages.length} Total
        </div>
      </div>

      <div className="space-y-6">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No messages yet</h3>
            <p className="text-gray-500">When customers contact you, their messages will appear here.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const date = msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : "Unknown Date";
            const unread = msg.status === "Unread";

            return (
              <div key={msg.id} className={`bg-white rounded-2xl border ${unread ? 'border-emerald-200 shadow-md ring-1 ring-emerald-50' : 'border-gray-100 shadow-sm'} p-6 transition-all`}>
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {msg.name}
                        {unread && <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider">NEW</span>}
                      </h3>
                      <span className="text-xs text-gray-400 font-medium flex items-center bg-gray-50 px-2 py-1 rounded-md border">
                        <Calendar className="h-3 w-3 mr-1" />
                        {date}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium mb-4">
                      {msg.email && (
                        <a href={`mailto:${msg.email}`} className="flex items-center hover:text-emerald-600 transition-colors">
                          <Mail className="h-4 w-4 mr-1.5 opacity-70" />
                          {msg.email}
                        </a>
                      )}
                      {msg.phone && (
                        <a href={`tel:${msg.phone}`} className="flex items-center hover:text-emerald-600 transition-colors">
                          <Phone className="h-4 w-4 mr-1.5 opacity-70" />
                          {msg.phone}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                    {unread && (
                      <button onClick={() => markAsRead(msg.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => deleteMessage(msg.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200 rounded-lg transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="mt-4 bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{msg.subject || "No Subject"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</span>
                    <p className="text-sm text-slate-600 mt-0.5 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
