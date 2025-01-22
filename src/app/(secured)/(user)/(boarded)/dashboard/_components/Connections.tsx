import Image from "next/image";
import React from "react";

interface connectionType {
  image: string;
  name: string;
  companyName: string;
}
const activeConnections: connectionType[] = [
  {
     image: "/assets/profileImage.png",
      name: "Gordon Gekko",
      companyName: "Gekko & Co"
  },
  {
     image: "/assets/profileImage.png",
      name: "Tony Stark",
      companyName: "Stark Industries"
  },
  {
     image: "/assets/profileImage.png",
      name: "Miles Dyson",
      companyName: "Cyberdyne System"
  }
];

const mutedConnections:connectionType[] = [
  {
    image: "/assets/profileImage.png",
    name: "Gordon Gekko",
    companyName: "Gekko & Co",
  },
  {
    image: "/assets/profileImage.png",
    name: "Tony Stark",
    companyName: "Stark Industries",
  },

];

const blockConnections:connectionType[] = [
  {
    image: "/assets/profileImage.png",
    name: "Gordon Gekko",
    companyName: "Gekko & Co",
  },
  {
    image: "/assets/profileImage.png",
    name: "Tony Stark",
    companyName: "Stark Industries",
  },

];

const Connections = () => {
  return (
    <ul className="flex gap-4 flex-wrap flex-1">
      {Array.isArray(activeConnections) && activeConnections.length > 0 ? (
        <li className="max-w-[300px] w-full flex flex-col border rounded-sm">
          <div>
            <h2 className="lg:text-lg p-4 border-b text-base font-semibold text-center">
              <span className="text-checkColor pr-2">
                {activeConnections.length}
              </span>
              Active Connections
            </h2>
            <ul>
              {activeConnections.map((item, index) => (
                <li key={index} className="p-2">
                  <div className="px-2 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="rounded-full w-6 h-6"
                    />
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {item.companyName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ) : (
        ""
      )}
     {Array.isArray(mutedConnections) && mutedConnections.length > 0 ? (
        <li className="max-w-[300px] w-full flex flex-col border rounded-sm">
          <div>
            <h2 className="lg:text-lg p-4 border-b text-base font-semibold text-center">
              <span className="text-[#EAB308] pr-2">
                {mutedConnections.length}
              </span>
              Muted Connections
            </h2>
            <ul>
              {mutedConnections.map((item, index) => (
                <li key={index} className="p-2">
                  <div className="px-2 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="rounded-full w-6 h-6"
                    />
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {item.companyName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ) : (
        ""
          )}
          {Array.isArray(blockConnections) && blockConnections.length > 0 ? (
        <li className="max-w-[300px] w-full flex flex-col border rounded-sm">
          <div>
            <h2 className="lg:text-lg p-4 border-b text-base font-semibold text-center">
              <span className="text-[#F87171] pr-2">
                {blockConnections.length}
              </span>
              Blocked Connections
            </h2>
            <ul>
              {blockConnections.map((item, index) => (
                <li key={index} className="p-2">
                  <div className="px-2 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="rounded-full w-6 h-6"
                    />
                    <div>
                      <h5 className="font-semibold">{item.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {item.companyName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Connections;
