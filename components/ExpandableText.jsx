import { useState } from "react";

const ExpandableText = ({ children, descriptionLength }) => {
  const fullText = children;

  // Set the initial state of the text to be collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // This function is called when the read more/less button is clicked
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <span className="">
      {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
      <span
        onClick={toggleText}
        className="cursor-pointer text-xs font-semibold"
      >
        {isExpanded ? "Read less" : "Read more"}
      </span>
    </span>
  );
};

export default ExpandableText;
