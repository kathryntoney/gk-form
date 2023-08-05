import { Paper } from '@mui/material'

function Item({ item }) {
    return (
        <Paper className='carousel'>
            <a href={item.link} ><img className='carousel-img' src={item.img} alt={item.title} /></a>
        </Paper>
    )
}

export default Item