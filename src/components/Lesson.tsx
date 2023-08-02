import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
  title: string;
  duration: string;
  onPlay: () => void;
  isActive?: boolean;
}

export function Lesson({ title, duration, onPlay, isActive = false }: LessonProps) {
  return (
    <button
      className='flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-500 enabled:hover:text-zinc-100'
      data-active={isActive}
      disabled={isActive}
      onClick={onPlay}
    >
      {isActive ? (
        <PlayCircle className='h-4 w-4 text-emerald-400' />
      ) : (
        <Video className='h-4 w-4 text-zinc-400' />
      )}
      <span>{title}</span>
      <span className='ml-auto font-mono text-sm text-zinc-500'>{duration}</span>
    </button>
  )
}