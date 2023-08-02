import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import * as Collapsible from '@radix-ui/react-collapsible'
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { play } from "../store/slices/player";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const lessons = useAppSelector(state => state.player.course.modules[moduleIndex].lessons)
  const { currentModuleIndex, currentLessonIndex } = useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player
    return { currentModuleIndex, currentLessonIndex }
  })

  const dispatch = useDispatch()

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-sm text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform duration-300" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="flex flex-col relative gap-4 p-6">
          {lessons.map((lesson, index) => {
            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                duration={lesson.duration}
                isActive={moduleIndex === currentModuleIndex && currentLessonIndex === index}
                onPlay={() => dispatch(play({ moduleIndex, lessonIndex: index }))}
              /> 
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}