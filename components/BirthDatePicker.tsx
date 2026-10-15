"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type BirthDatePickerProps = {
  ariaLabelledBy: string;
  value: string;
  onChange: (value: string) => void;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month: month - 1, day };
}

function toIsoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BirthDatePicker({
  ariaLabelledBy,
  value,
  onChange,
}: BirthDatePickerProps) {
  const initialDate = parseDate(value);
  const todayRef = useRef(new Date());
  const valueId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    initialDate?.month ?? todayRef.current.getMonth(),
  );
  const [viewYear, setViewYear] = useState(
    initialDate?.year ?? todayRef.current.getFullYear(),
  );
  const [yearText, setYearText] = useState(String(viewYear));
  const [position, setPosition] = useState<CSSProperties>({});

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(336, window.innerWidth - 24);
    const estimatedHeight = panelRef.current?.offsetHeight ?? 336;
    const left = Math.max(
      12,
      Math.min(rect.left, window.innerWidth - width - 12),
    );
    const below = rect.bottom + 8;
    const top =
      below + estimatedHeight <= window.innerHeight - 12
        ? below
        : Math.max(12, rect.top - estimatedHeight - 8);
    setPosition({ left, top, width });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    const focusFrame = window.requestAnimationFrame(() => {
      updatePosition();
      const selected = panelRef.current?.querySelector<HTMLButtonElement>(
        ".calendar-day.selected",
      );
      (selected ?? panelRef.current)?.focus();
    });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [open, updatePosition]);

  const today = todayRef.current;
  const selectedDate = parseDate(value);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingDays = new Date(viewYear, viewMonth, 1).getDay();
  const displayValue = selectedDate
    ? `${months[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
    : "Choose a date";

  function commitYear(rawYear: string) {
    const numericYear = Number(rawYear);
    const nextYear = Math.min(
      today.getFullYear(),
      Math.max(1900, Number.isFinite(numericYear) ? Math.round(numericYear) : viewYear),
    );
    setViewYear(nextYear);
    setYearText(String(nextYear));
    if (nextYear === today.getFullYear() && viewMonth > today.getMonth()) {
      setViewMonth(today.getMonth());
    }
  }

  function chooseDay(day: number) {
    onChange(toIsoDate(viewYear, viewMonth, day));
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={value ? "date-picker-trigger has-value" : "date-picker-trigger"}
        aria-labelledby={`${ariaLabelledBy} ${valueId}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span id={valueId}>{displayValue}</span>
        <CalendarDays aria-hidden size={19} />
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={panelRef}
              className="date-picker-popover"
              style={position}
              role="dialog"
              aria-label="Choose date of birth"
              tabIndex={-1}
            >
              <div className="date-picker-toolbar">
                <label className="calendar-month-control">
                  <span>Month</span>
                  <span className="calendar-month-select">
                    <select
                      aria-label="Calendar month"
                      value={viewMonth}
                      onChange={(event) =>
                        setViewMonth(Number(event.target.value))
                      }
                    >
                      {months.map((month, index) => (
                        <option
                          key={month}
                          value={index}
                          disabled={
                            viewYear === today.getFullYear() &&
                            index > today.getMonth()
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden size={16} />
                  </span>
                </label>
                <label className="calendar-year-control">
                  <span>Year</span>
                  <input
                    aria-label="Calendar year"
                    type="number"
                    inputMode="numeric"
                    min={1900}
                    max={today.getFullYear()}
                    value={yearText}
                    onChange={(event) => {
                      const next = event.target.value;
                      setYearText(next);
                      if (/^\d{4}$/.test(next)) commitYear(next);
                    }}
                    onBlur={(event) => commitYear(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        commitYear(event.currentTarget.value);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="calendar-weekdays" aria-hidden="true">
                {weekdays.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>
              <div className="calendar-grid">
                {Array.from({ length: 42 }, (_, index) => {
                  const day = index - leadingDays + 1;
                  if (day < 1 || day > daysInMonth) {
                    return (
                      <span
                        className="calendar-day empty"
                        key={`empty-${index}`}
                      />
                    );
                  }
                  const isFuture =
                    viewYear > today.getFullYear() ||
                    (viewYear === today.getFullYear() &&
                      (viewMonth > today.getMonth() ||
                        (viewMonth === today.getMonth() && day > today.getDate())));
                  const selected =
                    selectedDate?.year === viewYear &&
                    selectedDate.month === viewMonth &&
                    selectedDate.day === day;
                  const isToday =
                    viewYear === today.getFullYear() &&
                    viewMonth === today.getMonth() &&
                    day === today.getDate();
                  const className = [
                    "calendar-day",
                    selected ? "selected" : "",
                    isToday ? "today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <button
                      type="button"
                      key={`day-${day}`}
                      className={className}
                      aria-label={`${months[viewMonth]} ${day}, ${viewYear}`}
                      aria-pressed={selected}
                      disabled={isFuture}
                      onClick={() => chooseDay(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="calendar-hint">Type a year to jump there instantly.</p>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
