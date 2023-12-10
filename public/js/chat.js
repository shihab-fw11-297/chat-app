let socket = io();


socket.on('connection', () => {
    console.log("A new user just connected")
});

socket.on('disconnect', () => {
    console.log("A new user just dis-connected");
});

socket.on('newMessage', function (message) {
    console.log(message)
    let li = document.createElement(`li`);
    li.innerText = `${message.from} : ${message.text}`
    document.querySelector('body').append(li);
});

socket.on('newLocationMessage', function (message) {
    console.log(`newLocationMessage`,message)
    let li = document.createElement(`li`);
    let a = document.createElement(`a`);
    a.setAttribute('target','_blank')
    a.setAttribute('href',message.url);
    a.innerText = a
    document.querySelector('body').append(a);
});

document.querySelector('#submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
  
    socket.emit("createMessage", {
      from:"User",
      text: document.querySelector('input[name="message"]').value
    }, function() {
     
    })
  })    


  document.querySelector('#send-location').addEventListener('click', function(e) {
    e.preventDefault();

    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.')
    }
  
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }, function() {
      alert('Unable to fetch location.')
    })
  });