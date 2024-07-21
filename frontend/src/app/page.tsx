import Image from "next/image";
import HeaderComponent from "../components/HeaderComponent";
import SelectionMenuComponent from "@/components/SelectionMenuComponent";
import IntineraryComponent from "@/components/ItineraryComponent";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-8">
      <HeaderComponent />
      <SelectionMenuComponent />
    </main>
  );
}
