import Carousel from 'react-material-ui-carousel'
import CarItems from './CarItems'
import pics from '../data/pics.json'

function GKCarousel() {
    return (
        <Carousel className='carousel' >
            {
                pics.map(item => <CarItems key={item.id} item={item} />)
            }
        </Carousel>
    )
}

export default GKCarousel