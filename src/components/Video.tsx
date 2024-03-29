import ReactPlayer from "react-player";
// import { next, useCurrentLesson } from "../store/slices/player";
// import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";
import { useStore, useCurrentLesson } from "../zustand-store";

export function Video() {
  // const { currentLesson } = useCurrentLesson()

  // const dispatch = useAppDispatch()

  // const isLoading = useAppSelector(state => state.player.isLoading)

  const { isLoading, next } = useStore(store => {
    return {
      isLoading: store.isLoading,
      next: store.next
    }
  })
  const { currentLesson } = useCurrentLesson()

  return (
    <div className="flex-1">
      <div className='w-full bg-zinc-950 aspect-video'>
        {isLoading 
          ?<div className="flex h-full items-center justify-center">
            <Loader className="h-6 w-6 text-zinc-400 animate-spin" />
          </div>
          :<ReactPlayer
            width="100%"
            height="100%"
            controls
            playing
            url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
            // onEnded={() => dispatch(next())}
            onEnded={() => next()}
          />
        }
        
      </div>
    </div>
  )
}