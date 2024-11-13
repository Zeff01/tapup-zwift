import { useState } from "react";

const ExpandableText = ({ children, descriptionLength }) => {
  const fullText = children;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const isFullText = fullText.length <= descriptionLength;
  if (isFullText) {
    return <>{fullText}</>;
  }

  return (
    <>
      {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
      <span onClick={toggleText} className="cursor-pointer font-bold">
        <br />
        {isExpanded ? "Read less" : "Read more"}
      </span>
    </>
  );
};

export default ExpandableText;
