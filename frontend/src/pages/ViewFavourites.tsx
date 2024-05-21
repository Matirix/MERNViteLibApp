import Spinner from '../Spinner';
import { useFetchFavourites } from '../utils/LibHooks';
import BookCard from '../components/BookCard';

const ViewFavourites = () => {
    const { favourites, loading, error } = useFetchFavourites(); // Fetch favourites for the current user

    if (loading) {
        return <div><Spinner/></div>; // Display loading state
    }

    if (error) {
        return <>{error}</>; // Display error message
    }

    return (
        <div className='p-6'>
            <h1 className='text-xl mb-5'>{`Favourites: ${favourites.length}`}</h1>
            <div className="flex items-start justify-start flex-wrap gap-4">
                {favourites.map((book) => (
                    <BookCard title={book.title} imageUri={book.imageUri} olid={book.olid} author={book.details.authors}/>
                ))}
            </div>
        </div>
    );
};

export default ViewFavourites;
