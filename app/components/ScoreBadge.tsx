import { cn } from "~/lib/utils";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  // Determine badge color and label based on score
  const getBadgeStyles = () => {
    if (score > 70) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        borderColor: "border-green-200",
        label: "Strong"
      };
    } else if (score > 49) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
        label: "Good Start"
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        borderColor: "border-red-200",
        label: "Needs Work"
      };
    }
  };

  const { bgColor, textColor, borderColor, label } = getBadgeStyles();

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border",
        bgColor,
        textColor,
        borderColor
      )}
    >
      {label}
    </div>
  );
};

export default ScoreBadge;