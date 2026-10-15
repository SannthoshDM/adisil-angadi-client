import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const EventCard = () => {
  return (
    <div>
        <Card className='w-[17rem]'>
            <CardMedia 
                className='h-[15rem]'
                image='https://images.pexels.com/photos/13243817/pexels-photo-13243817.jpeg'
            />
            <CardContent>
                <Typography variant='h5' >
                    Adayar Anadha Bhavan
                </Typography>
                <Typography variant='body2' >
                    50% off on your first order
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>Mumbai</p>
                    <p className='text-sm text-blue-500'>March 14, 2026 12:00 AM</p>
                    <p className='text-sm text-red-500'>March 15, 2026 12:00 AM</p>
                </div>
            </CardContent>
            {/* here this delete event is for admin access */}
            {
                false && <CardActions>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
            }
            
        </Card>
    </div>
  );
}

export default EventCard;