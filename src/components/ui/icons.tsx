import * as React from "react"

export const Instagram = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(
  ({ className, ...props }, ref) => (
    <svg 
      ref={ref}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
)
Instagram.displayName = "Instagram"

export const Youtube = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(
  ({ className, ...props }, ref) => (
    <svg 
      ref={ref}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="M2.5 7.1C2.6 6.5 3 6 3.6 5.9 5.3 5.5 12 5.5 12 5.5s6.7 0 8.4.4c.6.1 1 .6 1.1 1.2.4 2.1.4 4.6.4 4.6s0 2.5-.4 4.6c-.1.6-.5 1.1-1.1 1.2-1.7.4-8.4.4-8.4.4s-6.7 0-8.4-.4c-.6-.1-1-.6-1.1-1.2-.4-2.1-.4-4.6-.4-4.6s0-2.5.4-4.6z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  )
)
Youtube.displayName = "Youtube"
