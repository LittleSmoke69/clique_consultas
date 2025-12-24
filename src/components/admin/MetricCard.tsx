'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  subtitle?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = '#2B59FF',
  change,
  changeType = 'positive',
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all cursor-default group hover:border-[#2B59FF]/20">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${iconColor}15` }}>
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        {change && (
          <span 
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              changeType === 'positive' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-red-50 text-red-600'
            }`}
          >
            {change.startsWith('+') || change.startsWith('-') ? change : change}
          </span>
        )}
      </div>
      <h3 className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
      )}
    </div>
  );
};

