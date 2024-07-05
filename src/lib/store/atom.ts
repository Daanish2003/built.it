"use client"
import { atom } from "recoil";

export const openState = atom<boolean>({
    key: 'openState',
    default: false
})

export const statusMessageState = atom<string>({
    key: "statusMessageState",
    default: ""
})

