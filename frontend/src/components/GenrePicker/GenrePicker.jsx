const GenrePicker = ({onGenreSelect}) =>{
    const genres = [
        {id: 132, name: 'Pop'},
        {id: 116, name: 'Rap/Hiphop'},
        {id: 165, name: 'RnB'},
        {id: 113, name: 'Dance'},
        {id: 173, name: 'Films/Games'},
        {id: 464, name: 'Metal'}
    ]

    // const handleGenrePicker = (genreID) =>{
    //     onGenreSelect(genreID)
    // }

return (
    <>
        <div>
            <h2> Select a genre </h2>
        </div>
        <div> {genres.map(genre => (
            <button key={genre.id} className="genreButton" onClick={()=>onGenreSelect(genre.id)}>{genre.name}</button>))}
        </div>
    </>
)
}

export default GenrePicker