import Navbar from "./Navbar"

const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Navbar />

      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />

          <p className="text-sm text-slate-400">Loading product...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
