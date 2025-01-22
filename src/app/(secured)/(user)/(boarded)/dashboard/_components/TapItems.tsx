import { TapItemprops } from "@/types/types";
import Image from "next/image";

const getTapContextText = (tap: TapItemprops): string => {
  const now = new Date();
  const tapDate = new Date(tap.date);

  // Check if the tap is today
  const isToday = tapDate.toDateString() === now.toDateString();

  // Check if the tap is this week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the first day of the week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight

  const isThisWeek = tapDate >= startOfWeek;

  // Check if the tap is this month
  const isThisMonth =
    tapDate.getMonth() === now.getMonth() &&
    tapDate.getFullYear() === now.getFullYear();

  // Return the appropriate context message
  if (isToday && tap.todayCount! > 0) {
    return `+${tap.todayCount || 0} today`;
  } else if (
    isThisWeek &&
    (!tap.todayCount || tap.todayCount === 0) &&
    tap.weekCount! > 0
  ) {
    return `+${tap.weekCount || 0} this week`;
  } else if (isThisMonth && tap.monthCount! > 0) {
    return `+${tap.monthCount || 0} this month`;
  } else {
    return `Last tapped on ${tapDate.toLocaleDateString()}`;
  }
};
const TapItem: React.FC<TapItemprops> = (props) => {

  const { company, position, companyImage, total } = props;

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex gap-3">
        <Image
          src={companyImage}
          alt={company}
          width={50}
          height={50}
          className="rounded-sm border border-border md:h-[4rem] md:w-[4rem] lg:h-[3rem] lg:w-[3rem] "
        />
        <div>
          <h3 className="font-bold md:text-lg lg:text-sm xl:text-lg">{company}</h3>
          <p className="text-muted-foreground text-sm md:text-base lg:text-xs xl:text-sm">
            {position}
          </p>
        </div>
      </div>
      <div className="text-green-500 text-sm md:text-base text-right">
        <span className="lg:text-sm text-base xl:text-base">{getTapContextText(props)}</span>
        <p className="text-muted-foreground text-right lg:text-xs xl:text-base">{total} total</p>
      </div>
    </div>
  );
};

export default TapItem;
