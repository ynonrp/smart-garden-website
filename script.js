//broker connection configuration
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'ws://broker.emqx.io:8083/mqtt'
const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

//Status connection
console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)
client.on('connect', () => {
  console.log('Connected to MQTT broker!')
  console.log(clientId)
})
client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('reconnect', () => {
  console.log('Reconnecting...')
})

//Subscribe & display topic
const topic_humidity = 'halo123/home/humidity';
const topic_temperature = 'halo123/home/temperature';
const Humidity = document.getElementById('humidity');
const Temperature = document.getElementById('temperature');

client.subscribe([topic_humidity, topic_temperature]);

client.on('message', function (topic, message) { // message is Buffer
    
  if(topic === topic_humidity){
    console.log('Humidty = ', message.toString());
    Humidity.innerHTML = message.toString();
  }
  else if(topic === topic_temperature){
    console.log('Temperature = ', message.toString());
    Temperature.innerHTML = message.toString(); 
  }
});