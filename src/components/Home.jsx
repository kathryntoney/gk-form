import { Typography } from '@mui/material'
import GKCarousel from './Carousel'
import './styles.css'

export default function Home() {

    return (
        <>
            <GKCarousel />
            <div className='num-served'>
                <img className='num-img' src="https://images.squarespace-cdn.com/content/v1/59ef9a244c0dbf3814d94d38/9bfe7e22-5b0d-447c-9cde-ae761eee47c5/website+counter.png?format=2500w" alt="" />
                <Typography sx={{
                    color: '#ee6d4e',
                    fontWeight: 'bold',
                    border: '4px solid #ee6d4e',
                    paddingLeft: 3,
                    paddingRight: 3,
                    m: 1,
                    fontFamily: ['Roboto Mono', 'monospace'].join(','),
                    textAlign: 'center'
                }} variant='h5'>FOOD SERVICE WORKERS SERVED</Typography>
            </div>
        </>
    )
}