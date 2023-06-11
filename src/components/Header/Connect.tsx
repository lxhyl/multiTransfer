import { Button } from "@geist-ui/core";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Power } from "@geist-ui/icons"
import { toast } from "sonner";


export function Connect() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onError: (err) => {
      toast.error(err.message)
    }
  })
  const { disconnect } = useDisconnect()
  if (!isConnected) {
    return <Button type="secondary" onClick={() => {
      connect()
    }}>Connect</Button>
  }
  return <Button icon={<Power />} type="secondary" scale={0.9} onClick={() => disconnect()}>
    {address?.slice(0, 6)}...{address?.slice(-4)}
  </Button>
}