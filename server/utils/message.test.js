const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate corret message object',() =>{
        
        let from = 'admin';
        let text = 'random message';
        let msg = generateMessage(from, text);

   
        //expect(msg.createdAt).toBeA('number');
        expect(msg).toMatchObject({from,text});

    });
});

describe('generateLocationMessage',() => {
    it('should generate corret location object', () => {
        const from = 'User';
        const latitude = '-21.7785893';
        const longitude = '-43.349696';
        const url = "https://www.google.com/maps?q=-21.7785893,-43.349696";

        let msg = generateLocationMessage(from,latitude,longitude);

        expect(msg.url).toBe(url)
    })
})