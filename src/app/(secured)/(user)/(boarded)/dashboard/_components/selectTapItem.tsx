"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TapItemprops } from "@/types/types";
import Image from "next/image";

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
const RecentTapsSelect = ({ recentTaps }: RecentTapsSelectProps) => {
  const [selectedTap, setSelectedTap] = useState<string | null>(null);

  const filteredTaps =
    selectedTap && tapsData[selectedTap] ? tapsData[selectedTap] : [];
  return (
    <div className="w-full">
      {/* Shadcn Select */}
      <Select
        value={selectedTap || ""}
        onValueChange={(value) => setSelectedTap(value || null)}
      >
        <SelectTrigger className="w-full h-[4rem] hover:border-green-500 border-2 text-black text-lg bg-green-100">
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Company</SelectLabel>
            {recentTaps.map((item, i) => {
              return (
                <SelectItem
                  value={item.company}
                  key={item.company + i}
                  className="focus:bg-green-500"
                >
                  <div className="flex gap-2 items-center w-full">
                    <Image
                      src={item.companyImage}
                      alt={item.company}
                      width={50}
                      height={50}
                      className="rounded-sm border border-border"
                    />
                    <div>
                      <h2 className="text-left  font-semibold text-base">
                        {item.company}
                      </h2>
                      <p className="text-sm ">{item.position}</p>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="max-w-screen-md mx-auto border border-border rounded-md">
        <div className="space-y-2">
          {filteredTaps.length > 0 ? (
            filteredTaps.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 border-b"
              >
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="rounded-full w-6 h-6"
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
              No results found for the selected company.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTapsSelect;
