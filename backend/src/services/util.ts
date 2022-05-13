import {Response} from 'express'

export const badRequest = (res: Response, err: String) => {
    res.status(400).json([
        err
    ])
}

export const internalServerErro = (res: Response, err: Error) => {
    res.status(500).json({
        err: err.message
    })
}