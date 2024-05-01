const Difficulty = ({ onDifficultySelect }) => {
    const difficulties = [
      { id: 1, name: 'Casual Mode' },
      { id: 2, name: 'Expert Mode' },
     
    ]
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-title-color">
            Select a difficulty level
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-12 p-8">
          {difficulties.map(difficulty => (
            <button key={difficulty.id} className={`bg-box-color hover:bg-hover-color hover:text-hover-text-color text-text-color font-bold w-40 h-40 
              rounded-lg shadow-md flex items-center justify-center transition duration-300 
              ease-in-out transform hover:scale-105`}
              onClick={() => onDifficultySelect(difficulty.id)}
            >
              <span className="text-xl">{difficulty.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  export default Difficulty