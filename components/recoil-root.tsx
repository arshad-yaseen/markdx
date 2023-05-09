"use client"

import { RecoilRoot } from "recoil"

type Props = {
  children: React.ReactNode
}

function Recoil({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default Recoil
