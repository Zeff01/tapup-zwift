import React from "react";

interface TrackedSocialLinkProps {
  href: string;
  cardId?: string;
  ownerId?: string;
  linkType: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  title?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TrackedSocialLink: React.FC<TrackedSocialLinkProps> = ({
  href,
  cardId,
  ownerId,
  linkType,
  children,
  ...props
}) => {
  const handleClick = async () => {
    // Track the click if we have the necessary data
    if (cardId && ownerId) {
      try {
        await fetch('/api/analytics/track-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardId,
            ownerId,
            linkType,
            destination: href
          }),
        });
      } catch (error) {
        console.error('Failed to track link click:', error);
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};