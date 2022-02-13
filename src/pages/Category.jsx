import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../Components/ListingItem";
import { db } from "../firebase.config";

const Category = () => {
    console.log('yaha par huun');
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    // console.log(params.categoryName);
    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Geting the reference
                const listingRef = collection(db, 'listings')

                // Querying
                const q = query(
                    listingRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // Execute Query
                const querySnap = await getDocs(q);
                let listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })


                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('something is wrong');
            }
        }

        fetchListings();
    }, [params.categoryName])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName}
                </p>
            </header>

            {loading ? (<div> Loading... </div>)
                : listings && listings.length > 0 ? (<>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id}
                                    key={listing.id} />
                            ))}
                        </ul>
                    </main>
                </>)
                    : (<p>No listings to {params.categoryName}</p>)}
        </div>
    );
}

export default Category;