"use client";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  badge?: string;
  description: string;
  className?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  badge,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`bg-neutral-white border-2 border-neutral-black/10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-lg group hover:border-brand-primary/40 relative overflow-hidden ${className}`}
    >
      {/* Top accent bar - appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Badge (optional) */}
      {badge && (
        <div className="absolute top-md right-md">
          <span className="inline-block bg-brand-secondary text-neutral-black text-caption font-bold px-sm py-xs rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Icon - centered and prominent */}
      <div className="flex justify-center mb-md">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
          <Icon className="w-8 h-8 text-brand-primary" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-body font-bold text-neutral-black text-center mb-sm leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-neutral-black/70 text-center leading-relaxed line-clamp-3">
        {description}
      </p>
    </div>
  );
}
