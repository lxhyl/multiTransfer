import { Connect } from "./Header/Connect";
import { Logo } from "./Header/Logo";
import { Main } from "./Main";
import { Chains } from "./Header/Chains";

export function Layout() {
  return <>
    <header className="w-full py-2 flex items-center justify-center border-none md:border-b border-slate-200">
      <div className="max-w-5xl w-full flex justify-between px-2 md:px-4">
        <Logo />
        <div className="flex md:items-center gap-2">
          <div className="hidden md:block">
            <Chains />
          </div>
          <Connect />
        </div>
      </div>
    </header>
    <div className="w-full py-2 flex items-center justify-center">
      <div className="max-w-5xl w-full flex justify-between px-4">
        <Main />
      </div>
    </div>
  </>
}