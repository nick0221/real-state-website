import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Property } from "../data/properties";

interface CompareState {
  selected: Property[];
}

type CompareAction =
  | { type: "TOGGLE"; property: Property }
  | { type: "CLEAR" };

const MAX_COMPARE = 3;

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

interface CompareContextValue {
  selected: Property[];
  toggleProperty: (property: Property) => void;
  clearAll: () => void;
  isSelected: (id: number) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, { selected: [] });

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
