import { Select } from "@geist-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useNetwork, useSwitchNetwork } from "wagmi";
import { toast } from "sonner";
import { CHAINS, ChainId } from "@/src/config/constant";
import { MaterialSymbolsWarningOutlineRounded } from "../Icon";

export function Chains() {
  const { chain: currentChain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError: (err) => {
      toast.error(err.message)
    }
  })
  const chainId = useChainId()
  const account = useAccount()
  const appChains = useMemo(() => {
    const chains = Object.values(CHAINS)
    chains.sort((a, b) => a.name.localeCompare(b.name))
    return chains
  }, [])
  const switchChain = useCallback(async (id: ChainId) => {
    if (!switchNetworkAsync) return
    return switchNetworkAsync(id)
  }, [switchNetworkAsync])
  useEffect(() => {
    if (!currentChain) return
    console.log("currentChain", currentChain)
    console.log("id", currentChain.id)
    const chain = CHAINS[currentChain.id as ChainId]
    console.log("chain", chain)
    if (!chain) {
      toast.error(`Chain ${currentChain.id} not supported`)
    }
  }, [currentChain])

  return <>
    <Select
      type="secondary"
      value={chainId?.toString()}
      onChange={async (e) => {
        if (!account.address) {
          toast.error(`Connect first`)
          return
        }
        await switchChain(Number(e))
      }}
      placeholder="Select a chain"
    >
      {appChains.map(chain => <Select.Option key={chain.chainId} value={chain.chainId.toString()} >
        <div className="flex gap-2 items-center">
          {chain.name}
          {chain.isTestnet && <span className="ml-2 flex items-center"><MaterialSymbolsWarningOutlineRounded className="text-red-500 text-lg" /> TestNet</span>}
        </div>
      </Select.Option>)}
    </Select>
  </>
}