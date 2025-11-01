"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  id: string | number;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  chevronClassName?: string;
  defaultOpenIds?: Array<string | number>;
};

export function Accordion({
  items,
  allowMultiple = false,
  className = "space-y-md",
  itemClassName = "bg-neutral-white rounded-2xl overflow-hidden",
  headerClassName = "w-full px-xl py-xl flex items-center justify-between text-left hover:bg-neutral-white/50 transition-colors",
  contentClassName = "px-xl pb-xl",
  chevronClassName = "w-4 h-4 text-neutral-black/60 flex-shrink-0 transition-transform",
  defaultOpenIds = [],
}: AccordionProps) {
  const [openIds, setOpenIds] =
    useState<Array<string | number>>(defaultOpenIds);

  const toggle = useCallback(
    (id: string | number) => {
      setOpenIds((prev) => {
        const isOpen = prev.includes(id);
        if (allowMultiple) {
          return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
        }
        return isOpen ? [] : [id];
      });
    },
    [allowMultiple]
  );

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className={itemClassName}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className={headerClassName}
            >
              <h3 className="text-h6 text-neutral-black pr-lg">{item.title}</h3>
              <ChevronDown
                className={`${chevronClassName} ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {isOpen && (
              <div className={contentClassName}>
                <div className="text-body text-neutral-black/70 leading-relaxed">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
