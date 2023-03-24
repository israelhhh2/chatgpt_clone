"use client";

import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import { signOut, useSession } from "next-auth/react";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* Newchat */}
          <NewChat />

          <div>{/* ModelSelection */}</div>

          {/* Map through the ChatRows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt=""
          className="h-12 w-12 rounded-full mx-auto mb-2  cursor-pointer"
        />
      )}
    </div>
  );
}

export default SideBar;
