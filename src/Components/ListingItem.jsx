import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcom from '../assets/svg/bathtubIcon.svg';
import { Link } from 'react-router-dom';



const ListingItem = ({ listing, id, onDelete }) => {
    return (
        <li>
            <Link to={`/category/${listing.type}/${id}`}
                className='categoryListingLink'>
                <img src={listing.imageUrls[0]} alt="someimage"
                    className='categoryListingImg' />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">{listing.name}</p>
                    <p className="categoryListingPrice">
                        &#8377;{listing.offer ? listing.discountedPrice : listing.regularPrice}
                        {listing.type === 'rent' && ' / Month'}
                    </p>

                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt='bed' />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms} bed-room(s)
                        </p>
                        <img src={bathtubIcom} alt='susu' />
                        <p className="categoryListingInfoText">
                            {listing.bathrooms} bath-room(s)
                        </p>
                    </div>
                </div>
            </Link>

            {onDelete && (
                <DeleteIcon className='removeIcon' fill='red' onClick={() => onDelete(listing.id, listing.name)} />
            )}
        </li>
    );
}

export default ListingItem;