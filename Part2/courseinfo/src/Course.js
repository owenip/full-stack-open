const Course = ({ header, parts }) => {
    return (
        <div>
            <Header header={header} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
}

const Header = ({ header }) => {
    return (
        <div>
            <h1>{header}</h1>
        </div>
    );
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    );
}

const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    );
}

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
    return (
        <div>
            <h3>Total of {total} exercises</h3>
        </div>
    );
}

export default Course;