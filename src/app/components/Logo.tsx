import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
    <svg
      width={50}
      height={50}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-8"
      
    >
      <circle
        cx={40}
        cy={40}
        r={38}
        fill="rgba(75, 140, 80, 1)"
        stroke="#2E5D43"
        strokeWidth={3}
      />
      <path
        d="M24 60 L24 28 L40 50 L56 28 L56 60"
        stroke="white"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect
        x={34}
        y={58}
        width={12}
        height={8}
        fill="#A9D18E"
        stroke="#2E5D43"
        strokeWidth={2}
        rx={2}
        ry={2}
      />
      <line
        x1={34}
        y1={58}
        x2={46}
        y2={58}
        stroke="#2E5D43"
        strokeWidth={2}
      />
    </svg>
    </Link>
  );
}
