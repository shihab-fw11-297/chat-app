let socket = io();


socket.on('connection', () => {
  console.log("A new user just connected")
});

socket.on('disconnect', () => {
  console.log("A new user just dis-connected");
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('LT');
  console.log("newLocationMessage", message);

  const template = document.querySelector('#location-message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);

});

document.querySelector('#submit-btn').addEventListener('click', function (e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: document.querySelector('input[name="message"]').value
  }, function () {

  })
})


document.querySelector('#send-location').addEventListener('click', function (e) {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location.')
  })
});