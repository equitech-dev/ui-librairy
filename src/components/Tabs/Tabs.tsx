"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (tabId: string) => void;
  size?: "sm" | "md";
  className?: string;
  disabled?: boolean;
}

const TabsActiveContext = createContext<string | undefined>(undefined);

/** Onglet actif si le composant est sous `Tabs`, sinon `undefined`. */
export function useOptionalTabsActiveTab(): string | undefined {
  return useContext(TabsActiveContext);
}

function resolveInitial(tabs: TabItem[], defaultValue?: string): string {
  if (!tabs.length) return "";
  if (defaultValue && tabs.some((tab) => tab.id === defaultValue)) return defaultValue;
  return tabs[0].id;
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Tabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  size = "md",
  className = "",
  disabled = false,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(() => resolveInitial(tabs, defaultValue));
  const active = value ?? uncontrolled;

  const setActive = (next: string) => {
    if (disabled) return;
    if (value === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const contextValue = useMemo(() => active, [active]);

  return (
    <TabsActiveContext.Provider value={contextValue}>
      <RadixTabs.Root
        className={cx("ui-tabs", size === "sm" && "ui-tabs--sm", className)}
        value={active}
        onValueChange={setActive}
      >
        <RadixTabs.List className="ui-tab-list" aria-label="Sections">
          {tabs.map((tab) => (
            <RadixTabs.Trigger
              key={tab.id}
              value={tab.id}
              className="ui-tab-button"
              disabled={disabled || tab.disabled}
            >
              {tab.icon ? <span className="ui-tab-icon">{tab.icon}</span> : null}
              <span className="ui-tab-label">{tab.label}</span>
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>

        {tabs.map((tab) => (
          <RadixTabs.Content
            key={tab.id}
            value={tab.id}
            className="ui-tab-content"
            forceMount
            hidden={active !== tab.id}
          >
            {tab.content}
          </RadixTabs.Content>
        ))}
      </RadixTabs.Root>
    </TabsActiveContext.Provider>
  );
}
