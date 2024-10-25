import { Container } from '@mui/material'
import Games from 'Components/UI/Games/Games'
import React from 'react'
import style from './GamesPages.module.scss'

export default function GamesPages() {
  return (
    <div className={style.wrapper}>
      <Container>
        <Games />
      </Container>
    </div>
  )
}
