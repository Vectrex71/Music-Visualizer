import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-primary", className)}
    {...props}
  >
    <path
      d="M15.5 4.5L8.5 11.5L12 11.5L12 12.5L8.5 12.5L15.5 19.5L12 19.5L12 21.5L20.5 21.5L20.5 19.5L17.5 19.5L10.5 12.5L14 12.5L14 11.5L10.5 11.5L17.5 4.5L20.5 4.5L20.5 2.5L12 2.5L12 4.5L15.5 4.5Z"
      fill="currentColor"
    />
    <path
      d="M8.5 19.5L3.5 19.5L3.5 21.5L12 21.5L12 19.5L8.5 19.5Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
     <path
      d="M15.5 4.5L12 4.5L12 2.5L3.5 2.5L3.5 4.5L8.5 4.5L15.5 4.5Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);

export default Logo;
