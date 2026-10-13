import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  value: string
  onValueChange: (val: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  labelMap: React.MutableRefObject<Map<string, React.ReactNode>>
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

export function Select({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (val: string) => void
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [val, setVal] = React.useState(controlledValue ?? defaultValue)
  const labelMap = React.useRef(new Map<string, React.ReactNode>())

  const value = controlledValue !== undefined ? controlledValue : val

  const handleValueChange = (newVal: string) => {
    if (controlledValue === undefined) {
      setVal(newVal)
    }
    onValueChange?.(newVal)
    setOpen(false)
  }

  const selectRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen, labelMap }}>
      <div ref={selectRef} className="relative inline-block text-left w-full sm:w-auto">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(SelectContext)
  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen(!ctx?.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 opacity-50 shrink-0 ml-2" />
    </button>
  )
}

export function SelectValue({
  placeholder,
}: {
  placeholder?: string
}) {
  const ctx = React.useContext(SelectContext)
  const label = ctx?.value ? ctx.labelMap.current.get(ctx.value) : null
  return <span>{label ?? ctx?.value ?? placeholder}</span>
}

export function SelectContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ctx = React.useContext(SelectContext)
  if (!ctx?.open) return null

  return (
    <div
      className={cn(
        "absolute right-0 top-full mt-1.5 z-50 min-w-[10rem] w-full rounded-xl border border-border bg-card p-1 text-card-foreground shadow-lg animate-in fade-in-80 zoom-in-95",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SelectItem({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: React.ReactNode
}) {
  const ctx = React.useContext(SelectContext)
  React.useEffect(() => {
    ctx?.labelMap.current.set(value, children)
  }, [value, children, ctx])

  const isSelected = ctx?.value === value

  return (
    <div
      onClick={() => ctx?.onValueChange(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
        isSelected && "font-semibold bg-accent/60 text-primary",
        className
      )}
    >
      <span>{children}</span>
      {isSelected && (
        <span className="absolute right-2.5 flex size-3.5 items-center justify-center text-primary">
          <Check className="size-4 stroke-[2.5]" />
        </span>
      )}
    </div>
  )
}
