import Navbar from "@/components/home/navbar";
import { Card, CardContent } from "@/components/ui/card";
import getIdeas from "./actions/getIdeas";
import IdeaDisplay from "@/components/home/ideaDisplay";

export default async function Home() {
  const data = await getIdeas();

  return (
    <>
      <Navbar />
      <IdeaDisplay ideas={data} />      
    </>
  );
}


