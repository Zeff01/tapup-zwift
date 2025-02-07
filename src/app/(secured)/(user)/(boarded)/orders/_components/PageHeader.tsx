import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 pt-0 pb-4 px-4 md:p-4 w-full shadow-sm ">
      <IoArrowBack
        className="w-10 h-10 cursor-pointer border p-2 rounded-md hover:bg-muted-foreground"
        size={30}
        onClick={() => router.back()}
      />
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default PageHeader;
