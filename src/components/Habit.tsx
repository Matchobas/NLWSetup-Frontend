import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";

interface HabitProps {
  amount: number;
  completed: number;
}

export function Habit({ completed, amount}: HabitProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger className='w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg' />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Sexta-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">10/02</span>

          <ProgressBar progress={completedPercentage} />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}