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

export const imageLoadingState = atom<boolean>({
    key: "imageLoadingState",
    default: false
})

export const videoLoadingState = atom<boolean>({
    key:"videoLoadingState",
    default: false
})

export const loadingState = atom<boolean>({
    key: "loadingState",
    default: false
})


export const previewImageState = atom<string | ArrayBuffer | null>({
    key: "previewImageState",
    default: ""
})

export const previewVideoState = atom<string | ArrayBuffer | null>({
    key: "previewVideoState",
    default: ""
})

export const imageProgressBarState = atom<number>({
    key: "imageProgressBarStatus",
    default: 0
})

export const videoProgressBarState = atom<number>({
    key: "videoProgressBarStatus",
    default: 0
})