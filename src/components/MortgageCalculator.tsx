import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, DollarSign, Percent, Home } from "lucide-react";

interface MortgageCalculatorProps {
  price: number;
}

const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  const factor = Math.pow(1 + monthlyRate, numPayments);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export default function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [annualTaxRate, setAnnualTaxRate] = useState(1.2);
  const [expanded, setExpanded] = useState(false);

  const downPayment = useMemo(
    () => (price * downPaymentPercent) / 100,
    [price, downPaymentPercent]
  );

  const loanPrincipal = price - downPayment;

  const principalAndInterest = useMemo(
    () => calculateMonthlyPayment(loanPrincipal, interestRate, loanTerm),
    [loanPrincipal, interestRate, loanTerm]
  );

  const monthlyTax = useMemo(
    () => (price * (annualTaxRate / 100)) / 12,
    [price, annualTaxRate]
  );

  const estimatedInsurance = useMemo(() => {
    // Rough estimate: ~0.5% of property value annually for insurance
    return (price * 0.005) / 12;
  }, [price]);

  const totalMonthly = principalAndInterest + monthlyTax + estimatedInsurance;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-navy-800/50 border border-navy-500/20 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-navy-700/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <Calculator className="w-4.5 h-4.5 text-gold-500" />
          </div>
          <span className="font-display text-base font-bold text-text-primary">
            Mortgage Calculator
          </span>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4 text-text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-navy-500/20 pt-4">
              {/* Monthly Payment Result */}
              <div className="bg-linear-to-br from-gold-500/10 to-gold-600/5 rounded-xl p-4 text-center border border-gold-500/15">
                <div className="text-text-muted text-xs font-medium uppercase tracking-wider mb-1">
                  Estimated Monthly Payment
                </div>
                <div className="font-display text-2xl font-bold gradient-text">
                  {formatCurrency(totalMonthly)}
                </div>
                <div className="text-text-muted text-xs mt-1">
                  {loanTerm}-year fixed-rate mortgage
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label className="text-text-secondary font-medium flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-gold-500/70" />
                    Down Payment
                  </label>
                  <div className="text-text-primary font-semibold">
                    {downPaymentPercent}%
                    <span className="text-text-muted font-normal ml-1">
                      ({formatCurrency(downPayment)})
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer accent-gold-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gold-500/30"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-0.5">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label className="text-text-secondary font-medium flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-gold-500/70" />
                    Interest Rate
                  </label>
                  <span className="text-text-primary font-semibold">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={10}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer accent-gold-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gold-500/30"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-0.5">
                  <span>2%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label className="text-text-secondary font-medium flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-gold-500/70" />
                    Loan Term
                  </label>
                  <span className="text-text-primary font-semibold">
                    {loanTerm} years
                  </span>
                </div>
                <div className="flex gap-2">
                  {[15, 20, 25, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                        loanTerm === term
                          ? "bg-gold-500/15 border-gold-500/40 text-gold-400"
                          : "bg-navy-700/30 border-navy-400/20 text-text-secondary hover:border-navy-300/40 hover:text-text-primary"
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Annual Tax Rate */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <label className="text-text-secondary font-medium">
                    Annual Tax Rate
                  </label>
                  <span className="text-text-primary font-semibold">
                    {annualTaxRate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  value={annualTaxRate}
                  onChange={(e) => setAnnualTaxRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-navy-700 rounded-full appearance-none cursor-pointer accent-gold-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gold-500/30"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-0.5">
                  <span>0.5%</span>
                  <span>2.5%</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-navy-900/50 rounded-xl p-3.5 border border-navy-500/10 space-y-2">
                <div className="text-text-muted text-[10px] font-semibold uppercase tracking-wider mb-1">
                  Monthly Breakdown
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Principal & Interest</span>
                  <span className="text-text-primary font-medium">
                    {formatCurrency(principalAndInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Property Tax</span>
                  <span className="text-text-primary font-medium">
                    {formatCurrency(monthlyTax)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Home Insurance (est.)</span>
                  <span className="text-text-primary font-medium">
                    {formatCurrency(estimatedInsurance)}
                  </span>
                </div>
                <div className="border-t border-navy-500/20 pt-2 flex items-center justify-between text-sm">
                  <span className="text-gold-500 font-semibold">Total</span>
                  <span className="text-gold-500 font-bold">
                    {formatCurrency(totalMonthly)}
                  </span>
                </div>
              </div>

              <p className="text-text-muted text-[10px] leading-relaxed">
                This is an estimate for informational purposes only. Actual
                payments may vary based on credit score, lender terms, insurance
                rates, and applicable taxes. Contact a loan officer for a
                personalized quote.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed summary */}
      {!expanded && (
        <div className="px-5 pb-4">
          <div className="bg-navy-900/50 rounded-xl p-3 border border-navy-500/10">
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-xs">Est. payment / mo</span>
              <span className="text-gold-500 font-bold text-lg font-display">
                {formatCurrency(totalMonthly)}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
