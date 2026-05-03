"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Search, Info, TrendingUp, Building2 } from "lucide-react";

// Mock data for S&P 500 Halal Index 
const stockData = [
  { date: "Oct", value: 100 },
  { date: "Nov", value: 104 },
  { date: "Dec", value: 108 },
  { date: "Jan", value: 102 },
  { date: "Feb", value: 110 },
  { date: "Mar", value: 118 },
];

const halalStocks = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", price: "$192.53", status: "Compliant" },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology", price: "$420.55", status: "Compliant" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", price: "$157.20", status: "Compliant" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer", price: "$165.78", status: "Compliant" },
];

export default function StocksMarketplace() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Bourse & Actions Halal</h1>
          <p className="text-muted-foreground">Filtrez le marché pour des investissements purs. Intégré avec Interactive Trader.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher une action..." 
              className="w-full bg-background border border-input rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button className="bg-[#1a365d] text-white hover:bg-[#1a365d]/90 border-transparent shadow-md">
             Connexion Interactive Trader
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <Card className="lg:col-span-3 border-border/50 bg-card/60 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Indice Boursier Halal</CardTitle>
              <CardDescription>Performance comparative des sociétés sans dette excessive</CardDescription>
            </div>
            <TrendingUp className="text-primary h-6 w-6" />
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4db389" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4db389" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="value" stroke="#4db389" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">Filtre Financier</CardTitle>
            <CardDescription>Règles AAOIFI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                <div className="font-semibold text-sm mb-1 text-foreground">Dette Exigeable</div>
                <div className="text-xs text-muted-foreground flex justify-between"><span>&lt; 30% des capitaux</span> <Info className="h-3 w-3"/></div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                <div className="font-semibold text-sm mb-1 text-foreground">Revenus Impurs</div>
                <div className="text-xs text-muted-foreground flex justify-between"><span>&lt; 5% des revenus</span> <Info className="h-3 w-3"/></div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                <div className="font-semibold text-sm mb-1 text-foreground">Liquidités & Créances</div>
                <div className="text-xs text-muted-foreground flex justify-between"><span>&lt; 33% des actifs</span> <Info className="h-3 w-3"/></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>Actions Américaines & Européennes (Compliant)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {halalStocks.map((stock) => (
              <div key={stock.symbol} className="border border-border/50 bg-background/50 p-4 rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{stock.symbol}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{stock.name}</p>
                  </div>
                  <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-semibold text-foreground">{stock.price}</span>
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-md border border-green-500/20">{stock.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline">Afficher tout le screener</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
