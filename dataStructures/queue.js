module.exports = class Queue {

  constructor() {

    this.queue = [];
    this.size = 0;
  }

  enqueue(element){

    this.queue.push(element);
    this.size++;

  }

  isEmpty(){

    return (this.size === 0);

  }

  dequeue(){

    let x = this.queue[0];

    this.queue.shift();
    this.size--;

    return x;
  }

  front(){

    return this.queue[0];
  }


}
