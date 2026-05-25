import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Property } from "../data/properties";
import { properties } from "../data/properties";

interface CompareState {
  selected: Property[];
}

type CompareAction =
  | { type: "TOGGLE"; property: Property }
  | { type: "CLEAR" };

const MAX_COMPARE = 3;
const STORAGE_KEY = "prestige-estates-compare";

function compareReducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case "TOGGLE": {
      const exists = state.selected.find((p) => p.id === action.property.id);
      if (exists) {
        return {
          selected: state.selected.filter((p) => p.id !== action.property.id),
        };
      }
      if (state.selected.length >= MAX_COMPARE) {
        return state;
      }
      return { selected: [...state.selected, action.property] };
    }
    case "CLEAR":
      return { selected: [] };
    default:
      return state;
  }
}

function loadFromStorage(): CompareState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selected: [] };

    const ids: number[] = JSON.parse(raw);
    if (!Array.isArray(ids)) return { selected: [] };

    // Look up each saved ID — silently drops any that no longer exist in the data
    const selected = ids
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined)
      .slice(0, MAX_COMPARE);

    return { selected };
  } catch {
    return { selected: [] };
  }
}

function persistToStorage(state: CompareState) {
  try {
    const ids = state.selected.map((p) => p.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

interface CompareContextValue {
  selected: Property[];
  toggleProperty: (property: Property) => void;
  clearAll: () => void;
  isSelected: (id: number) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, null, loadFromStorage);

  // Sync to localStorage whenever selection changes
  useEffect(() => {
    persistToStorage(state);
  }, [state]);

  const toggleProperty = (property: Property) => {
    dispatch({ type: "TOGGLE", property });
  };

  const clearAll = () => dispatch({ type: "CLEAR" });

  const isSelected = (id: number) =>
    state.selected.some((p) => p.id === id);

  const isFull = state.selected.length >= MAX_COMPARE;

  return (
    <CompareContext.Provider
      value={{
        selected: state.selected,
        toggleProperty,
        clearAll,
        isSelected,
        isFull,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
