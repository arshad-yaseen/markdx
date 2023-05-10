"use client"

import { RecoilRoot as Recoil } from "recoil"

type Props = {
  children: React.ReactNode
}

function RecoilRoot({ children }: Props) {
  return <Recoil>{children}</Recoil>
}

export default RecoilRoot
