import { Button, Divider, Input } from "@geist-ui/core"
import { ChangeEvent, useCallback, useState } from "react"
import { Address, useAccount, useChainId, useContractWrite, useWalletClient } from "wagmi"
import { Delete } from '@geist-ui/icons'
import { Contract, Interface, isAddress } from "ethers"
import { MaterialSymbolsAddCircleOutlineRounded } from "../Icon"
import { toast } from "sonner"
import ABI_MULTICALL from "@/abis/multicall.json"
import ABI_ERC20 from "@/abis/erc20.json"
import { CHAINS, ChainId } from "@/src/config/constant"


interface Row {
  id: number,
  token: Address,
  to: Address,
  amount: string
}

interface Call {
  target: Address,
  callData: string
}

export function Main() {
  const [rows, setRows] = useState<Row[]>([{ id: Date.now(), token: "0x", to: "0x", amount: "1" }])

  const [loading, setLoading] = useState<boolean>(false)
  const { address: myAddress } = useAccount()
  const chainId = useChainId()

  const multiCallContract = useContractWrite({
    address: CHAINS[chainId as ChainId].multicall,
    abi: ABI_MULTICALL,
    functionName: "aggregate"
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: number, key: "token" | "to" | "amount") => {
    const { value } = event.target as HTMLInputElement
    const rowClone = rows.map(row => ({ ...row }))
    const sourceRow = rowClone.find(row => row.id === id)
    if (!sourceRow) return
    if (key === "amount") {
      sourceRow["amount"] = value
    } else {
      sourceRow[key] = value as Address
    }
    setRows(rowClone)
  }
  const addRow = () => {
    setRows([...rows, { id: Date.now(), token: "0x", to: "0x", amount: "" }]);
  }
  const removeRow = (id: number) => {
    const newRows = rows.filter(row => row.id !== id)
    if (newRows.length === 0) {
      setRows([{ id: Date.now(), token: "0x", to: "0x", amount: "" }])
    } else {
      setRows(newRows)
    }
  }

  const onConfirm = useCallback(() => {
    if (!myAddress) {
      toast.error("Please connect your wallet")
      return
    }
    if (!chainId || !CHAINS[chainId as ChainId]) {
      toast.error("Chain not supported")
      return
    }
    if (rows.length === 0) {
      toast.error("Please add at least one row")
      return
    }

    const calldataList: Call[] = []
    const erc20Interface = new Interface(ABI_ERC20)
    for (let i = 0; i < rows.length; i++) {
      const { token, to, amount } = rows[i]
      if (!isAddress(token)) {
        toast.error(`Invalid token address at row ${i + 1}`)
        return
      }
      if (!isAddress(to)) {
        toast.error(`Invalid to address at row ${i + 1}`)
        return
      }
      if (Number(amount) <= 0) {
        toast.error(`Invalid amount at row ${i + 1}`)
        return
      }
      // transferFrom
      const tokenCallData = erc20Interface.encodeFunctionData("transferFrom", [myAddress, to, amount])
      calldataList.push({ target: token, callData: tokenCallData })
    }
    console.log("calldataList", calldataList)
    if (calldataList.length !== rows.length) {
      toast.error("Something went wrong")
      return
    }
    setLoading(true)
    multiCallContract.writeAsync({ args: [calldataList] }).then((result) => {
      toast.success(`${result.hash} submitted`)
    })
      .catch((err) => {
        console.log(err)
        toast.error(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [myAddress, rows, chainId, multiCallContract])
  return <div className="w-full flex flex-col items-center mt-20">
    <div className="">
      <div className="grid grid-cols-10 gap-4 font-bold">
        <div className="col-span-4" >Token</div>
        <div className="col-span-4" >To</div>
        <div className="col-span-2" >Amount</div>
      </div>
      {
        rows.map((row, index) => <div key={row.id} className="grid grid-cols-10 gap-4 items-center mb-2">
          <div className="col-span-4" >
            <Input type="default" width="100%" value={row.token}
              onChange={(e) => handleChange(e, row.id, "token")}
            />
          </div>
          <div className=" col-span-4" >
            <Input type="default" width="100%" value={row.to} onChange={(e) => handleChange(e, row.id, "to")} />
          </div>
          <div className="col-span-1"><Input type="default" width="100%" value={row.amount} onChange={(e) => handleChange(e, row.id, "amount")} /></div>
          <div className="col-span-1 cursor-pointer"><Delete color="gray" size={18} onClick={() => removeRow(row.id)} /></div>
        </div>)
      }
      <div className="grid grid-cols-10 gap-4 items-center my-4">
        <div className="col-span-9"> <Divider /></div>
        <div className="col-span-1">
          <MaterialSymbolsAddCircleOutlineRounded className=" text-xl cursor-pointer" onClick={addRow} />
        </div>
      </div>
      <div className="">
        <div>
          <Button type="secondary" onClick={onConfirm} loading={loading}>Confirm</Button>
        </div>
      </div>
    </div>
  </div >
}