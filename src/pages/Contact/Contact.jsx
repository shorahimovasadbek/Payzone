import React from 'react'
import style from './Contact.module.scss'
import { Container, Grid, Box, Card } from '@mui/material'
import Phone from '../../Components/assets/images/Phone.png'
import Email from '../../Components/assets/images/email.png'
import Location from '../../Components/assets/images/Location.png'

export default function Contact() {
    return (
        <div className={style.wrapper}>
            <Container>
                <h1 className={style.wrapper_h1}>Bog'lanish</h1>
                <Grid container spacing={2} textAlign={'center'}>
                    <Grid item xs={12} md={4} className={style.wrapper_Grid}>
                        <Card className={style.wrapper_Grid_child}>
                            <img src={Phone} alt="Phone" />
                            <h2>Phone</h2>
                            <a href="tel:+998999000202">+998 99 900 02 02</a>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} className={style.wrapper_Grid}>
                        <Card className={style.wrapper_Grid_child}>
                            <img src={Email} alt="Email" />
                            <h2>Email</h2>
                            <a href="#">payzone.uz@gmail.com</a>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} className={style.wrapper_Grid}>
                        <Card className={style.wrapper_Grid_child}>
                            <img src={Location} alt="Location" />
                            <h2>Office</h2>
                            <a href="#">Tashkent Oqilota 21</a>
                        </Card>
                    </Grid>
                </Grid>

                <Card style={{padding: '50px 0', backgroundColor: 'transparent'}}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11979.645999298258!2d69.2758336!3d41.35427729999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1728468675884!5m2!1sru!2s" style={{ borderRadius: '20px' }} width="100%" height={450} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Card>
            </Container>
        </div>
    )
}
