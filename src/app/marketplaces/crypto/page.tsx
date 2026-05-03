"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";

// Mock data for Bitcoin performance
const data = [
  { date: "Jan", price: 42000 },
  { date: "Feb", price: 48000 },
  { date: "Mar", price: 61000 },
  { date: "Apr", price: 66000 },
  { date: "May", price: 62000 },
  { date: "Jun", price: 71000 },
];

const halalTokens = [
  { symbol: "BTC", name: "Bitcoin", price: "$71,230.50", change: "+4.2%", approvedBy: "Sharia Board UAE" },
  { symbol: "ETH", name: "Ethereum", price: "$3,840.20", change: "+1.8%", approvedBy: "Sharia Board UAE" },
  { symbol: "SOL", name: "Solana", price: "$145.80", change: "-0.5%", approvedBy: "Amanah Partners" },
  { symbol: "LINK", name: "Chainlink", price: "$18.30", change: "+5.4%", approvedBy: "Amanah Partners" },
];

export default function CryptoMarketplace() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">Marketplace Crypto</h1>
          <p className="text-muted-foreground">Suivez les actifs cryptos certifiés Halal en temps réel.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Rechercher un token..." 
              className="w-full bg-background border border-input rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button>Vérifier un projet</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 border-border/50 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>Performance Globale du Marché (Halal Index)</CardTitle>
            <CardDescription>Évolution sur les 6 derniers mois</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b381" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00b381" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="price" stroke="#00b381" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>Critères de Validation Halal</CardTitle>
            <CardDescription>Nos conditions strictes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm text-muted-foreground mt-4">
              <li className="flex items-start"><ShieldCheck className="h-5 w-5 mr-3 text-primary shrink-0"/> Aucun mécanisme de staking avec rendement garanti basé sur le prêt (Riba).</li>
              <li className="flex items-start"><ShieldCheck className="h-5 w-5 mr-3 text-primary shrink-0"/> Le token donne lieu à une véritable utilité réseau et non de pure spéculation (Gharar).</li>
              <li className="flex items-start"><ShieldCheck className="h-5 w-5 mr-3 text-primary shrink-0"/> Absence de liens avec des industries illicites (jeux d'argent, alcool).</li>
            </ul>
            <div className="mt-8">
              <Button variant="outline" className="w-full">Lire la méthodologie</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle>Sélection de Tokens Halal</CardTitle>
          <CardDescription>Projets vérifiés et validés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg rounded-bl-lg">Asset</th>
                  <th className="px-6 py-3">Prix</th>
                  <th className="px-6 py-3">24h Change</th>
                  <th className="px-6 py-3">Validation Sharia</th>
                  <th className="px-6 py-3 rounded-tr-lg rounded-br-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {halalTokens.map((token) => (
                  <tr key={token.symbol} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{token.symbol[0]}</div>
                      <div>
                        {token.name} <span className="text-muted-foreground ml-1 text-xs">{token.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{token.price}</td>
                    <td className={`px-6 py-4 font-medium ${token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {token.change}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md border border-primary/20">{token.approvedBy}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
                        Détails <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
