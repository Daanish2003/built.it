"use client"
import { atom } from "recoil";

export const authState = atom({
    key: 'authState',
    default: { loggedIn: false},
})