import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const style = {
  width: "24px",
  height: "24px",
  cursor: "pointer",
};
const ProfileSocials = () => {
  return (
    <section className="flex gap-3 w-[15rem]  pt-5 pl-5">
      <RiFacebookFill style={style} />
      <FaLinkedinIn style={style} />
      <FiInstagram style={style} />
    </section>
  );
};

export default ProfileSocials;
