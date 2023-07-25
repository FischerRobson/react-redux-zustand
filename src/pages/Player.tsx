import { ChevronDown, MessageCircle } from 'lucide-react'

export function Player() {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Fundamentos do Redux</h1>
            <span className="text-sm text-zinc-400">Modulo Redux</span>
          </div>

          <button className="flex items-center justify-center gap-2 bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-r-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">video</div>

          <aside className="w-80 border-l border-zinc-800 bg-zinc-900 h-[600px]">
            <div>
              <button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                  1
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <strong>Desvendando o Redux</strong>
                  <span className="text-sm text-zinc-400">12 aulas</span>
                </div>

                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400" />
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
