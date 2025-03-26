"use client";

import { useState } from "react";
import Image from "next/image";
import { TapItemprops } from "@/types/types";
import TapItem from "./TapItems";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RecentTapsSelectProps = {
  recentTaps: TapItemprops[];
};

interface tapsDataProps {
  name: string;
  company: string;
  time: string;
  image: string;
}
const tapsData: { [key: string]: tapsDataProps[] } = {
  Tesla: [
    {
      name: "Elon Musk",
      company: "Tesla",
      time: "5 min ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "JB Straubel",
      company: "GMA",
      time: "1 hr ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Franz von Holzhausen",
      company: "Tesla",
      time: "3 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Gwynne Shotwell",
      company: "ABs",
      time: "6 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Martin Eberhard",
      company: "Unilver",
      time: "12 hrs ago",
      image: "/assets/profileImage.png",
    },
  ],
  "ACME Corp": [
    {
      name: "John Doe",
      company: "ACME Corp",
      time: "2 min ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Jane Smith",
      company: "ACME Corp",
      time: "30 min ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Bob Johnson",
      company: "ACME Corp",
      time: "4 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Alice Williams",
      company: "ACME Corp",
      time: "7 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Charlie Brown",
      company: "ACME Corp",
      time: "10 hrs ago",
      image: "/assets/profileImage.png",
    },
  ],
  "Globex Corporation": [
    {
      name: "Hank Scorpio",
      company: "Globex Corporation",
      time: "10 min ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Anna Price",
      company: "Globex Corporation",
      time: "1 hr ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Gregory House",
      company: "Globex Corporation",
      time: "3 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Wilson Fisk",
      company: "Globex Corporation",
      time: "5 hrs ago",
      image: "/assets/profileImage.png",
    },
    {
      name: "Jessica Jones",
      company: "Globex Corporation",
      time: "8 hrs ago",
      image: "/assets/profileImage.png",
    },
  ],
};

const DesktopTapsSelect = ({ recentTaps }: RecentTapsSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTap, setSelectedTap] = useState<string | null>(null);
  const route = useRouter();

  // Filter companies based on search term
  const filteredCompanies = recentTaps.filter((item) =>
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get taps for the selected company
  const filteredTaps =
    selectedTap && tapsData[selectedTap] ? tapsData[selectedTap] : [];

  return (
    <div className="w-full ">
      {recentTaps.length > 0 ? (
        <div className="border border-gray-300 rounded-md px-2">
          <div className="grid grid-cols-2">
            {/* Left Column: Selector */}
            <div className="border-r relative pr-2 py-2 max-w-[350px] w-full">
              {/* Search Bar */}
              <input
                type="text"
                placeholder={`Search card`}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:px-6 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {!searchTerm && (
                <Search className="absolute top-5 left-2 text-muted-foreground w-5 h-5" />
              )}

              {/* List of Companies */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {filteredCompanies.length > 0 &&
                  filteredCompanies.map((item, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-md cursor-pointer border ${
                        selectedTap === item.company
                          ? "border-green-500 bg-green-100 dark:bg-green-800"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedTap(item.company)}
                    >
                      <TapItem {...item} />
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Column: Selected Taps */}
            <div className="space-y-2">
              {filteredTaps.length > 0 ? (
                filteredTaps.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border-b"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full w-8 h-8"
                      />
                      <div>
                        <h5 className="font-semibold">{item.name}</h5>
                        <p className="text-sm text-gray-500">{item.company}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {selectedTap
                    ? "No taps found for this company."
                    : "Select a company to view taps."}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[450px] w-full rounded-md ">
          <div className="flex items-center justify-center">
            <div className="max-w-screen-md w-full p-10 border border-muted flex flex-col items-center justify-center rounded-md">
              <div className="w-[150px] h-[100px] border-2 rounded-sm bg-green-100 border-dashed border-green-400 flex items-center justify-center">
                <p className="font-semibold text-green-700">¯\_(ツ)_/¯</p>
              </div>
              <h2 className="text-lg font-semibold mt-4">
                No active cards found
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                It looks like you have not activated a card yet
              </p>
            </div>
          </div>
          <Button
            className="w-full bg-buttonColor mt-2 hover:bg-green-600 text-primary-foreground text-sm font-medium"
            onClick={() => route.push("/cards")}
          >
            Activate a Card
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopTapsSelect;
