import { config } from '../stitches.config'

type PencilWithColorProps = {
  color?: string;
  width?: number;
  height?: number
}

export function PencilWithColorIcon({color, height, width}: PencilWithColorProps): JSX.Element {
  return (
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 20.25H8.68934C8.78783 20.25 8.88536 20.2306 8.97635 20.1929C9.06735 20.1552 9.15003 20.1 9.21967 20.0303L18 11.25L12.75 6.00001L3.96967 14.7803C3.90003 14.85 3.84478 14.9327 3.80709 15.0237C3.80379 15.0316 3.80063 15.0396 3.79761 15.0477C3.76615 15.1317 3.75 15.2208 3.75 15.3107V19.5C3.75 19.6989 3.82902 19.8897 3.96967 20.0303C4.11032 20.171 4.30109 20.25 4.5 20.25Z" fill="#FFD234"/>
<path d="M15.2197 3.53034L12.75 6.00001L18 11.25L20.4697 8.78034C20.6103 8.63969 20.6893 8.44892 20.6893 8.25001C20.6893 8.0511 20.6103 7.86033 20.4697 7.71968L16.2803 3.53034C16.1397 3.38969 15.9489 3.31067 15.75 3.31067C15.5511 3.31067 15.3603 3.38969 15.2197 3.53034Z" fill="#FFD234"/>
<path d="M8.68934 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V15.3107C3.75 15.2122 3.7694 15.1147 3.80709 15.0237C3.84478 14.9327 3.90003 14.85 3.96967 14.7803L15.2197 3.53034C15.3603 3.38969 15.5511 3.31067 15.75 3.31067C15.9489 3.31067 16.1397 3.38969 16.2803 3.53034L20.4697 7.71968C20.6103 7.86033 20.6893 8.0511 20.6893 8.25001C20.6893 8.44892 20.6103 8.63969 20.4697 8.78034L9.21967 20.0303C9.15003 20.1 9.06735 20.1552 8.97635 20.1929C8.88536 20.2306 8.78783 20.25 8.68934 20.25Z" stroke="#0A0806" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.75 6L18 11.25" stroke="#0A0806" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.95223 20.2021L3.79785 15.0477" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}
