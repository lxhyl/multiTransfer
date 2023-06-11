import { useRouter } from "next/router";

export function Logo() {
  const route = useRouter()
  return <div className="flex items-center text-2xl cursor-pointer" onClick={() => route.push("/")}>
    <div className="ml-1 font-medium text-2xl cursor-pointer">Multi-transfer</div>
  </div>
}
