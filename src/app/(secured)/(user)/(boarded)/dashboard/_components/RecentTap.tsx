import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TapItem from "./TapItems";
import { TapItemprops } from "@/types/types";

type RecentTapProps = {
  recentTaps: TapItemprops[];
};

const RecentTaps = ({ recentTaps }: RecentTapProps) => {
  const route = useRouter();
  return (
    <div className="w-full ">
      {recentTaps.length === 0 ? (
        <div className="max-w-screen-md w-full mx-auto rounded-md ">
          <div className="flex items-center justify-center mt-10">
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
            className="w-full bg-buttonColor mt-2 hover:bg-green-600 text-primary text-sm"
            onClick={() => route.push("/cards")}
          >
            Activate a Card
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div className="rounded border border-border max-w-screen-md w-full mx-auto">
            {recentTaps.map((item, index) => (
              <TapItem key={index} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTaps;
