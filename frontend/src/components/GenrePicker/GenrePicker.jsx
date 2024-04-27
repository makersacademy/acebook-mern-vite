const GenrePicker = ({ onGenreSelect }) => {
  const genres = [
    { id: 132, name: 'Pop' },
    { id: 116, name: 'Rap/Hiphop' },
    { id: 165, name: 'RnB' },
    { id: 113, name: 'Dance' },
    { id: 173, name: 'Films/Games' },
    { id: 464, name: 'Metal' }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mt-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
          Select a genre
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-12 p-8">
        {genres.map(genre => (
          <button key={genre.id} className={`bg-blue-500 hover:bg-blue-300 text-white font-bold w-40 h-40 
            rounded-lg shadow-md flex items-center justify-center transition duration-300 
            ease-in-out transform hover:scale-105`}
            onClick={() => onGenreSelect(genre.id)}
          >
            <span className="text-xl">{genre.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenrePicker