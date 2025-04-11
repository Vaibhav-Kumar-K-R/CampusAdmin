import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { semester: "1st", cgpa: 8.9, fill: "#ffffff" },
  { semester: "2nd", cgpa: 9.0, fill: "#ffffff" },
  { semester: "3rd", cgpa: 9.4, fill: "#ffffff" },
  { semester: "4th", cgpa: 9.7, fill: "#ffffff" },
  { semester: "5th", cgpa: 9.8, fill: "#ffffff" },
];

// Calculate the minimum CGPA value dynamically
const minCgpa = Math.min(...chartData.map((data) => data.cgpa));

const chartConfig = {
  cgpa: {
    label: "CGPA",
    color: "#048c7f", // Primary color
  },
};

export function LineChartComponent() {
  return (
    <Card className="border-none shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 h-full">
      <CardHeader>
        <CardTitle className="text-[#048c7f] text-xl font-bold">
          CGPA Progress
        </CardTitle>
        <CardDescription className="text-gray-600">
          Tracking academic performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[minCgpa, 10]} />{" "}
            {/* Dynamic min value, fixed max at 10 */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="cgpa"
                  hideLabel
                />
              }
              className="bg-white"
            />
            <Line
              dataKey="cgpa"
              type="monotone"
              stroke="#048c7f" // Primary color
              strokeWidth={3}
              dot={{ fill: "#048c7f", r: 5 }} // Primary color
              activeDot={{
                r: 7,
                fill: "#048c7f",
                stroke: "white",
                strokeWidth: 2,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-[#048c7f]"
                fontSize={12}
                dataKey="semester"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-[#048c7f]">
          Trending up by 5.2% this semester{" "}
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="leading-none text-gray-500">
          CGPA trend from 1st to 5th semester
        </div>
      </CardFooter>
    </Card>
  );
}
