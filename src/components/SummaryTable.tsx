import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../utils/axios";
import { Habit } from "./Habit";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S'
];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountsOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface SummaryData {
  id: string;
  date: string;
  completed: number;
  amount: number;
}

export function SummaryTable() {
  const [summary, setSummary] = useState<SummaryData[]>([]);

  useEffect(() => {
    api.get('/summary').then(response => {
      setSummary(response.data)
    });
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => {
          return (
            <div key={`${weekDay}-${index}`} className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'>
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map((date) => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, "day");
          });
          return (
            <Habit 
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountsOfDaysToFill > 0 && Array.from({ length: amountsOfDaysToFill }).map((_, i) => {
          return <div key={i} className='w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'></div>
        })}
      </div>
    </div>
  )
}