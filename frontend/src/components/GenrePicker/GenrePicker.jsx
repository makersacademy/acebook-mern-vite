const GenrePicker = ({onGenreSelect}) =>{
    const genres = [
        {id: 132, name: 'Pop'},
        {id: 116, name: 'Rap/Hiphop'},
        {id: 165, name: 'RnB'},
        {id: 113, name: 'Dance'},
        {id: 173, name: 'Films/Games'},
        {id: 464, name: 'Metal'}
    ]

return (
    <>
        <div>
            <h2> Select a genre </h2>
        </div>
        <div> {genres.map(genre => (
            <button key={genre.id} className={`btn overflow-hidden relative
            w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase
            before:block before:absolute before:h-full before:w-full
            before:left-0 before:top-0 before:-translate-y-full hover:bg-blue-300`} onClick={()=>onGenreSelect(genre.id)}>{genre.name}</button>))}
        </div>
    </>
)
}

export default GenrePicker