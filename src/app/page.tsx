import Navbar from "@/components/home/navbar";
import { Card, CardContent } from "@/components/ui/card";
import getIdeas from "./actions/getIdeas";
import IdeaDisplay from "@/components/home/ideaDisplay";
import db from "@/db";
import { oauthAccount, session, user } from "@/db/schema";

export default async function Home() {
  db.delete(user)
   db.delete(oauthAccount)
   db.delete(session)
  const data = await getIdeas();
   
  return (
    <>
      <Navbar />
      <IdeaDisplay ideas={data} />      
    </>
  );
}


