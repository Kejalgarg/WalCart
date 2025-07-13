import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', accuracy: 88 },
  { month: 'Feb', accuracy: 91 },
  { month: 'Mar', accuracy: 89 },
  { month: 'Apr', accuracy: 93 },
  { month: 'May', accuracy: 92 },
  { month: 'Jun', accuracy: 94 },
];

export function AccuracyChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[85, 100]} />
        <Line 
          type="monotone" 
          dataKey="accuracy" 
          stroke="hsl(221, 83%, 53%)" 
          strokeWidth={2}
          dot={{ fill: 'hsl(221, 83%, 53%)' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
