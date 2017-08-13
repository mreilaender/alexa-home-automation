var aws = require('aws-sdk');
var Alexa = require('alexa-sdk');

var config = {};
config.IOT_ENDPOINT_URL             = 'a20uc8psr7thav.iot.eu-west-1.amazonaws.com'
config.IOT_REGION                   = 'eu-west'


var device = new aws.IotData({endpoint: config.IOT_ENDPOINT_URL})

exports.handle = (event, context, callback) => {
    console.log( 'Request: ' + event )
    var alexa = Alexa.handler(event, context, callback)
      alexa.registerHandlers(handlers)
      alexa.execute()
};

var handlers = {
  'WakeTheMonsterIntent': function () {
    var params = {
        topic: '/alexaRequest',
        payload: '1',
        qos: 0
    }
    device.publish(params, (err, data) => {
      var responseSpeechlet
      if(err) {
          responseSpeechlet = 'Something went wront writting to the MQTT'
          console.log(err, err.stack);
      } else {
          responseSpeechlet = 'Monster has been woken up'
          console.log(data)
      }
      this.emit(':tell', responseSpeechlet)
    })
  },
  'Unhandled': function () {
    this.emit(':tell', 'No handler for received intent');
  }
}