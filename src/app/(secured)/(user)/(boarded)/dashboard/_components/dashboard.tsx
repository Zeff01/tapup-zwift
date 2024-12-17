"use client";

import { Button } from "@/components/ui/button";
import { accountItem, ADMIN_ONLY_ROUTE, USER_ROLE_ENUMS } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import RecentTaps from "./recentTaps";
import RecentBillingHistory from "./recentBillingHistory";
import { BillingHistoryItem, TapItemprops } from "@/types/types";
import RecentTapsSelect from "./selectTapItem";

const recentTaps: TapItemprops[] = [
  {
    date: "2024-12-13T03:23:00Z",
    todayCount: 0,
    weekCount: 10,
    monthCount: 0,
    total: 10,
    companyImage: "/assets/company1.png",
    company: "AC",
    position: "Chief Technology Officer",
  },
  {
    date: "2024-12-17T10:00:00Z",
    todayCount: 5,
    weekCount: 10,
    monthCount: 20,
    total: 128,
    companyImage: "/assets/company2.png",
    company: "Tesla",
    position: "Head of Engineering",
  },
  {
    date: "2024-12-17T10:00:00Z",
    todayCount: 5,
    weekCount: 10,
    monthCount: 20,
    total: 128,
    companyImage: "/assets/company3.png",
    company: "Unilever",
    position: "Chief Technology Officer",
  },
  {
    date: "2024-12-13T10:00:00Z",
    todayCount: 5,
    weekCount: 10,
    monthCount: 20,
    total: 128,
    companyImage: "/assets/company3.png",
    company: "ACME Corp",
    position: "Chief Technology Officer",
  },
  {
    date: "2024-12-12T10:00:00Z",
    todayCount: 2,
    weekCount: 10,
    monthCount: 20,
    total: 128,
    companyImage: "/assets/company3.png",
    company: "ACME Corporatio",
    position: "Chief Technology Officer",
  },
  {
    date: "2024-12-14T10:00:00Z",
    todayCount: 5,
    weekCount: 10,
    monthCount: 20,
    total: 128,
    companyImage: "/assets/company3.png",
    company: "ACME",
    position: "Chief Technology Officer",
  },
];

const billingHistory: BillingHistoryItem[] = [
  //   {
  //     id: 1,
  //     quantity: 1,
  //     name: "Black Card",
  //     price: "₱1000",
  //     image: "/assets/cards/card1.png",
  //   },
  //   {
  //     id: 2,
  //     quantity: 1,
  //     name: "Custom Card",
  //     price: "₱1000",
  //     image: "/assets/cards/card1.png",
  //   },
  //   {
  //     id: 3,
  //     quantity: 1,
  //     name: "Yellow Card",
  //     price: "₱1000",
  //     image: "/assets/cards/card1.png",
  //   },
  //   {
  //     id: 4,
  //     quantity: 1,
  //     name: "Special Card",
  //     price: "₱1000",
  //     image: "/assets/cards/card1.png",
  //   },
  //   {
  //     id: 5,
  //     quantity: 1,
  //     name: "Limited Card",
  //     price: "₱1000",
  //     image: "/assets/cards/card1.png",
  //   },
];

const Dashboard = () => {
  const { user } = useUserContext();
  const [activeItemIndex, setActiveIndex] = useState(0);
  const [showAllTaps, setShowAllTaps] = useState(false);

  const handleChangeItemIndex = (index: number) => {
    setActiveIndex(index);
  };

  const handleShowMore = () => {
    setShowAllTaps(true);
  };

  return (
    <div className="h-full">
      {user?.role === USER_ROLE_ENUMS.ADMIN && (
        <Link href={ADMIN_ONLY_ROUTE}>
          <Button variant="outline" className="absolute top-0 left-0">
            Admin Dashboard
          </Button>
        </Link>
      )}
      <div className="px-4 flex flex-col min-h-full md:px-16 py-8">
        <h1 className="text-2xl md:text-4xl font-semibold lg:block hidden">
          My Account
        </h1>
        <div className="flex justify-around gap-2 mt-5 w-full max-w-[320px] bg-muted items-center py-3 px-4 rounded-md">
          {accountItem.map((item, index) => {
            const Icon = item.icon;
            return (
              <h5
                className={`flex gap-2 items-center px-2 py-1 rounded-md text-xs md:text-sm cursor-pointer ${
                  activeItemIndex === index ? "bg-muted-foreground" : ""
                }`}
                key={item.title}
                onClick={() => handleChangeItemIndex(index)}
              >
                <Icon size={20} />
                {item.title}
              </h5>
            );
          })}
        </div>
        {activeItemIndex === 0 && (
          <div>
            <div className="mt-10">
              <h3 className="text-muted-foreground font-semibold md:text-lg text-sm">
                Profile
              </h3>
              <div className="flex items-center justify-center mt-10">
                <div className="max-w-screen-md w-full p-10  border border-muted flex flex-col items-center justify-center rounded-md">
                  <Image
                    src={user?.profilePictureUrl!}
                    className="rounded-full h-[6rem] md:h-[8rem] md:w-[8rem] w-[6rem]"
                    alt="profileImg"
                    width={120}
                    height={120}
                  />
                  <h2 className="text-lg font-semibold mt-4">
                    {`${user?.firstName} ${user?.lastName} `}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-muted-foreground font-semibold md:text-lg text-sm">
                Membership
              </h3>
              <div className="flex items-center justify-center mt-10">
                <div className="max-w-screen-md w-full p-10  border border-muted flex items-center justify-center gap-3 rounded-md">
                  <Image
                    src="/assets/websiteLogo.png"
                    className="rounded-full  md:w-[5rem] md:h-[5rem] w-[3rem] h-[3rem]"
                    alt="membershipImg"
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">Standard</h2>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-10">
              <h3 className="text-muted-foreground font-semibold md:text-lg text-sm">
                {recentTaps.length ? "Recent Taps" : ""}
              </h3>
              <RecentTaps
                recentTaps={showAllTaps ? recentTaps : recentTaps.slice(0, 3)}
              />
              {!showAllTaps && recentTaps.length > 3 && (
                <div className="w-full flex items-center justify-center">
                  <Button
                    className="max-w-screen-md w-full mx-auto bg-buttonColor mt-2 hover:bg-green-600 text-primary text-sm"
                    onClick={handleShowMore}
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeItemIndex === 1 && (
          <div className="w-full mt-10">
            {recentTaps.length !== 0 ? (
              <h3 className="mb-10 text-muted-foreground font-semibold md:text-lg text-sm">
                Taps
              </h3>
            ) : (
              ""
            )}
            <div className="max-w-screen-md w-full mx-auto overflow-y-auto h-[300px]">
              <RecentTaps recentTaps={recentTaps}
              />
            </div>

            <div className="w-full mt-4">
              <h3 className="text-muted-foreground font-semibold mb-2">
                Select a card to view who tapped it
              </h3>

              <div className="max-h-[350px] max-w-screen-md mx-auto overflow-y-auto border border-border rounded-md">
                {/* Each card */}
                <RecentTapsSelect recentTaps={recentTaps}
                 />
                {/* Example list */}

              </div>
            </div>
          </div>
        )}

        {activeItemIndex === 2 && (
          <RecentBillingHistory recentBilling={billingHistory} />
        )}
        {activeItemIndex === 0 && billingHistory.length > 0 && (
          <RecentBillingHistory recentBilling={billingHistory} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
