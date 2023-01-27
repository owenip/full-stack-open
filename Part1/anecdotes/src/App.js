import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const maxVotedAnecdoteIndex = votes.indexOf(Math.max(...votes));

  function handleVoting() {
    const currentVotes = [...votes];
    currentVotes[selected]++;
    setVotes(currentVotes);
  }

  function handleNextAnecdote() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  return (
    <div>
      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button text={'Vote'} handleClick={handleVoting} />
      <Button text={'next anecdote'} handleClick={handleNextAnecdote} />
      <Anecdote title={'Anecdote with most votes'} anecdote={anecdotes[maxVotedAnecdoteIndex]} vote={votes[maxVotedAnecdoteIndex]} />
    </div>
  )
}

const Anecdote = ({ title, anecdote, vote }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>Has {vote}</p>
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export default App