function fizzBuzzGenerator(max) {
  // Tu código acá:
  let counter = 1;
  if(max ? counter <= max : true){
    if(counter % 3 === 0 && counter % 5 === 0) return 'Fizz Buzz'
    else if(counter % 3 === 0) return 'Fizz'
    else if(counter % 5 === 0) return 'Buzz'
    else yield counter
    counter ++
  }
}

module.exports = fizzBuzzGenerator;
