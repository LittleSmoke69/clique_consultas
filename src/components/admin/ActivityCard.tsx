'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Activity {
  type: string;
  description: string;
  time: string;
}

interface ActivityCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  activities: Activity[];
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  icon: Icon,
  iconColor = '#2B59FF',
  activities,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2B59FF]/5 transition-all group hover:border-[#2B59FF]/20">
      <div className="flex items-center gap-3 mb-5 lg:mb-6">
        <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${iconColor}15` }}>
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <h3 className="text-base lg:text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          // Determina a cor do badge baseado no tipo de atividade
          const getActivityColor = (type: string) => {
            if (type.toLowerCase().includes('confirmado') || type.toLowerCase().includes('nova') || type.toLowerCase().includes('concluída')) {
              return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            }
            if (type.toLowerCase().includes('pendência') || type.toLowerCase().includes('falha') || type.toLowerCase().includes('cancel')) {
              return 'bg-red-50 text-red-600 border-red-100';
            }
            if (type.toLowerCase().includes('atualização') || type.toLowerCase().includes('reagendamento')) {
              return 'bg-blue-50 text-blue-600 border-blue-100';
            }
            return 'bg-slate-50 text-slate-600 border-slate-100';
          };

          return (
            <div 
              key={index} 
              className="border border-slate-100 rounded-xl p-3 hover:shadow-md transition-all hover:border-[#2B59FF]/30 bg-slate-50/50 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-xs font-bold px-2 py-1 rounded-lg mb-2 border ${getActivityColor(activity.type)}`}>
                    {activity.type}
                  </span>
                  <p className="text-sm font-bold text-slate-700">{activity.description}</p>
                </div>
                <span className="text-xs text-slate-400 font-bold whitespace-nowrap flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

