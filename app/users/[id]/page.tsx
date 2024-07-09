"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Users } from "@/src/lib/firebase/store/users.type";
import FieldwithLogo from "@/components/FieldwithLogo";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import CodibilityLogo from "@/components/CodibilityLogo";
import { getUserDataByUserCode } from "@/src/lib/firebase/store/users.action";
import BounceLoader from "react-spinners/BounceLoader";
// Assume that you have different components for each template:
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Navbar from "@/components/ui/Navbar";
import LoadingLogo from "@/components/LoadingLogo";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [userData, setUserData] = useState<Users | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDataByUserCode(id);
      if (data) {
        setUserData(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingLogo />;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  const renderTemplate = () => {
    switch (userData.chosenTemplate) {
      case "template1":
        return <Template1 {...userData} />;
      case "template2":
        return <Template2 {...userData} />;
      case "template3":
        return <Template3 {...userData} />;
      case "template4":
        return <Template4 {...userData} />;
      case "template5":
        return <Template5 {...userData} />;
      default:
        return <div>No template selected.</div>;
    }
  };

  return <div>{renderTemplate()}</div>;
};

export default UserPage;
