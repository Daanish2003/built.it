"use client"
import { atom } from "recoil";

export const openState = atom({
    key: 'openState',
    default: false
})

export const ideaState = atom({
    key: "ideaState",
    default: []
})