import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

interface ForecastChartProps {
  data?: Array<{
    day: string;
    predicted: number;
    actual: number | null;
  }>;
}

const defaultData = [
  { day: 'Day 1', predicted: 45, actual: 42 },
  { day: 'Day 2', predicted: 52, actual: 48 },
  { day: 'Day 3', predicted: 48, actual: 51 },
  { day: 'Day 4', predicted: 61, actual: 58 },
  { day: 'Day 5', predicted: 55, actual: 52 },
  { day: 'Day 6', predicted: 67, actual: 65 },
  { day: 'Day 7', predicted: 59, actual: null },
];

export function ForecastChart({ data = defaultData }: ForecastChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="hsl(221, 83%, 53%)" 
          strokeWidth={2}
          name="Predicted Demand"
          dot={{ fill: 'hsl(221, 83%, 53%)' }}
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="hsl(142, 76%, 36%)" 
          strokeWidth={2}
          name="Actual Demand"
          dot={{ fill: 'hsl(142, 76%, 36%)' }}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
