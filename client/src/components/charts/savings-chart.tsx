import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', savings: 1.2 },
  { month: 'Feb', savings: 1.5 },
  { month: 'Mar', savings: 1.8 },
  { month: 'Apr', savings: 2.1 },
  { month: 'May', savings: 2.4 },
  { month: 'Jun', savings: 2.8 },
];

export function SavingsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Bar dataKey="savings" fill="hsl(142, 76%, 36%)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
