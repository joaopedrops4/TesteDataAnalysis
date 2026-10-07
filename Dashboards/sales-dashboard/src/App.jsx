import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Percent, Download } from 'lucide-react';

// Dados simulados com categorias traduzidas para português
const salesByYear = [
  { year: '2013', sales: 140 },
  { year: '2014', sales: 209 },
  { year: '2015', sales: 240 },
  { year: '2016', sales: 288 },
  { year: '2017', sales: 194 },
];

const topCategories = [
  { name: 'Mercearia', sales: 343 },
  { name: 'Bebidas', sales: 216 },
  { name: 'Hortifruti', sales: 122 },
  { name: 'Limpeza', sales: 97 },
  { name: 'Lacticínios', sales: 64 },
  { name: 'Aves', sales: 34 },
  { name: 'Carnes', sales: 31 },
  { name: 'Cuidados Pessoais', sales: 24 },
  { name: 'Padaria', sales: 21 },
  { name: 'Frios', sales: 18 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      
      {/* Cabeçalho sem o menu Admin */}
      <header className="flex justify-between items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Visão Geral de Vendas</h1>
          <p className="text-slate-500">• Favorita Stores • Operações no Equador • Resumo de Desempenho 2013 - 2017</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-slate-700 font-medium transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </button>
      </header>

      {/* KPIs Traduzidos */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total de Vendas</p>
            <p className="text-2xl font-bold text-slate-800">$1.07 B</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Margem Bruta</p>
            <p className="text-2xl font-bold text-slate-800">35.00%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-violet-100 text-violet-600 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Vendas em Promoção</p>
            <p className="text-2xl font-bold text-slate-800">$7.81 M</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Share Promocional</p>
            <p className="text-2xl font-bold text-slate-800">0.73%</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Gráfico 1: Vendas por Ano */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-6 text-slate-800">Total de Vendas por Ano (Milhões)</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByYear} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `$${value}M`}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  formatter={(value) => [`$${value} Milhões`, 'Vendas']}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Categorias */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold mb-6 text-slate-800">Principais Categorias (Milhões)</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCategories} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `$${value}M`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  width={100}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  formatter={(value) => [`$${value} Milhões`, 'Vendas']}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 4, 4, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}