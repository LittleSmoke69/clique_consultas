'use client';

import React from 'react';
import { LucideIcon, TrendingUp, Star } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: string;
  change?: string;
  icon?: LucideIcon;
}

interface PerformanceCardProps {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  metrics: PerformanceMetric[];
  progressLabel?: string;
  progressValue?: number;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  icon: Icon,
  iconColor,
  metrics,
  progressLabel,
  progressValue,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-t-4 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all group hover:border-[#2B59FF]/30" style={{ borderTopColor: iconColor }}>
      <div className="flex items-center gap-3 mb-5 lg:mb-6">
        <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${iconColor}15` }}>
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <h3 className="text-base lg:text-lg font-bold text-slate-900">{title}</h3>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
            {metric.label && (
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">{metric.label}</p>
            )}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {metric.icon && <metric.icon className="w-4 h-4 text-amber-500" />}
                <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
              </div>
              {metric.change && (
                <span 
                  className="text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                  style={{ 
                    color: iconColor, 
                    backgroundColor: `${iconColor}15` 
                  }}
                >
                  {metric.change.startsWith('+') ? (
                    <>
                      <TrendingUp className="w-3 h-3" />
                      {metric.change}
                    </>
                  ) : (
                    metric.change
                  )}
                </span>
              )}
            </div>
          </div>
        ))}

        {progressLabel && progressValue !== undefined && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{progressLabel}</span>
              <span className="text-sm font-bold text-emerald-600">{progressValue}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all shadow-sm"
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

