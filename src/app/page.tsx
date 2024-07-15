import Navbar from "@/components/home/navbar";
import { Card, CardContent } from "@/components/ui/card";
import getIdeas from "../actions/getIdeas";
import IdeaDisplay from "@/components/home/ideaDisplay";
import db from "@/db";


export default async function Home() {

   
  return (
    <>
      <Navbar />
    </>
  );
}


