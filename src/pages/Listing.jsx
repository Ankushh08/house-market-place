// import { async } from '@firebase/util';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import shareIcon from '../assets/svg/shareIcon.svg'
import Spinner from '../Components/Spinner';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    console.log(shareLinkCopied); 
    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth()
    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        }

        fetchListing();
    }, [params.listingId, navigate])

    if (loading) {
        return <Spinner />
    }

    console.log(listing.imageUrls);
    listing.imageUrls.forEach((url, index) => {
        console.log(listing.imageUrls[index], ' - - - ', url);
    })
    return (
        <main>

            <Swiper slidesPerView={1} pagination={{ clickable: true }}>
                {listing.imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{ background: `url(${listing.imageUrls[index]}) center no-repeat`, 
                                backgroundSize: 'cover'
                            }} className='swiperSlideDiv'></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareLinkCopied(true);
                setTimeout(() => {
                    setShareLinkCopied(false);
                    toast.success('link coppied');
                }, 500);
            }}>
                <img src={shareIcon} alt="share icon" />
            </div>

            <div className="listingDetails">
                <p className='listingName'>
                    {listing.name} - {' '} &#8377;
                    {listing.offer ? listing.discountedPrice : listing.regularPrice}
                </p>
                <p className="listingLocation">
                    {listing.location}
                </p>
                <p className='listingType'> For {listing.type}</p>
                {listing.offer && <p className='discountPrice'>&#8377;{listing.regularPrice - listing.discountedPrice}</p>}
                <ul className='listingDetailsList'>
                    <li>
                        {listing.bedrooms > 1
                            ? `${listing.bedrooms} Bedrooms`
                            : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1
                            ? `${listing.bathrooms} Bathrooms`
                            : '1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>

                <p className="listingLocationTitle">Location</p>
                {/* MAP */}

                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className='primaryButton'
                    >
                        Contact Landlord
                    </Link>
                )}
            </div>
        </main>
    );
}

export default Listing;