This is a simple React app that serves up a random quote when the page is loaded and when the user clicks "New Quote." The app is front-end only; the quotes are stored as an array of objects, each with two keys -- "quote" and "author."

## Logic

The initial logic implemented in this application returned a quote using Math.random, multiplied by the length of the array. I wanted to ensure that each quote would get returned just as often as any other, though, so the current logic doesn't actually return a random quote; it iterates through the array in a random order.

### Shuffling the Array

The array is shuffled using a for loop in which the iterator value (i) starts at the array length minus one, executes as long as the incrementor is greater than zero, and then decrements the iterator. For each exectuion of the loop, the value of a second variable, j, is set to a random number (using Math.random) multiplied by the iterator plus one. This means that once the new value of an array index has been set, that value can no longer be selected (if the array length were used to generate j, duplicates might arise). The array index corresponding to the iterator value is replaced with the array index corresponding to j, but not before another variable, *holder* is set to the value of array[i]. Finally, the array index corresponding to j is set to the value of *holder*, or the initial value of i.

### Iterating Through the Shuffled Array

The array is first shuffled on page load by passing the top-level **QuoteBox** component's *shuffle* method in **componentDidMount()**. **QuoteBox** has three *state* variables: "quote", "author", and "iterator." The iterator is initialized at 1, returning the second item in the array, because the values of quote and author are set to the [0] index in the same **componentDidMount()** call mentioned above.

The user iterates through the array by clicking the "New Quote" button, which triggers another **QuoteBox** method, *newQuote()*. newQuote sets the state of quote and author to the value of the *quotes* array at the index corresponding to the value of *iterator*. newQuote then increments iterator by setting the iterator to its current value plus one. 

Left to its own devices, this would break once the value of *iterator* was greater than the length of the array, so an if statement checks whether the value of *this.state.iterator* is equal to the length of the *quotes* array minus one, or in practical terms, if the iterator has reached the end of the array. If so, *shuffle()* is called on *quotes*, and the value of *state.iterator* is set to 0. Finally, another if statement checks whether the next quote to be returned -- *quotes[this.state.iterator].quote* -- is strict equal to the current *this.state.quote*. If so, *newQuote()* is called again.

## Thoughts for Improvement

Since building this app, I've been introduced to React hooks, and I can't help but cringe at all the this's running rampant in the code. I don't quite have the heart to change them, though. I did take the step of making the two child components, **Text* and **Author**, function components rather than full class components, as all the state is held in **QuoteBox** and passed down to them. This eliminates the need for superfluous constructor methods and shortens the code a bit.

Perhaps the most obvious potential improvement would be integrating this with a database of some kind, rather than storing the quotes on the front end as an array. I could even envision allowing user-submitted quotes. For the time being, though, this app was and remains a way to practice and demonstrate my basic skills at writing a React app, and keeping it Front-End only served that purpose best.
