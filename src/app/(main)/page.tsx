import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet, Target, ArrowUpRight, ArrowDownRight, CreditCard, PiggyBank } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export const metadata = {
  title: 'Dashboard'
}

export default function Home() {
  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform bg-chart-1/10 rounded-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">$1,234</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500 font-medium">+20.1%</span>
              <span className="ml-1">vs last month</span>
            </div>
            <Progress value={65} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform bg-chart-2/10 rounded-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <Wallet className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">$2,000</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className="font-medium">38.2% remaining</span>
              <span className="ml-1">of monthly budget</span>
            </div>
            <Progress value={61.8} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform bg-chart-3/10 rounded-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">$5,670</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.3%</span>
              <span className="ml-1">this year</span>
            </div>
            <Progress value={78} className="h-1 mt-3" />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform bg-chart-4/10 rounded-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">24</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">-8.4%</span>
              <span className="ml-1">vs last week</span>
            </div>
            <Progress value={45} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}